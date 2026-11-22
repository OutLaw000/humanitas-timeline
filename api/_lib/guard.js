/**
 * Abuse guards: input sanitising, anonymous client keys, rate limits.
 * No IP, user agent, cookie or account is ever stored. The client key is a salted hash that
 * only lives in short-lived counters (≤ 1 hour) and in HyperLogLogs (which cannot be reversed).
 */
const crypto = require("crypto");
const store = require("./store");
const cfg = require("../../config/grading.config.json");

// Used when RATE_LIMIT_SALT is not set: random per server instance, never persisted.
const INSTANCE_SALT = crypto.randomBytes(16).toString("hex");

function clientKey(req) {
  const fwd = String(req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const day = new Date().toISOString().slice(0, 10);
  const salt = (process.env.RATE_LIMIT_SALT || INSTANCE_SALT) + ":" + day;
  return crypto.createHmac("sha256", salt).update(fwd || "unknown").digest("hex").slice(0, 20);
}

function validQid(q) {
  return typeof q === "string" && /^Q[1-9]\d{0,9}$/.test(q);
}
function validSlug(s) {
  return typeof s === "string" && /^[a-z0-9-]{2,60}$/.test(s);
}

/** Strip tags, control characters and excess length from text that came from upstream. */
function cleanText(s, max) {
  return String(s == null ? "" : s)
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001f\u007f<>`]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max || 160);
}

// Per-instance fallback limiter (when no store is configured).
const mem = new Map();
function memHit(key, limit, windowMs) {
  const now = Date.now();
  const e = mem.get(key);
  if (!e || e.reset < now) {
    mem.set(key, { n: 1, reset: now + windowMs });
    if (mem.size > 5000) for (const [k, v] of mem) if (v.reset < now) mem.delete(k);
    return true;
  }
  e.n += 1;
  return e.n <= limit;
}

/** Returns {ok, reason}. Counts the request in the minute / hour windows. */
async function rateLimit(req) {
  const L = cfg.limits;
  const id = clientKey(req);
  if (!store.configured()) {
    const ok = memHit("m:" + id, L.requestsPerMinutePerClient, 60000) && memHit("h:" + id, L.requestsPerHourPerClient, 3600000) && memHit("g", L.requestsPerMinuteGlobal, 60000);
    return { ok, id, reason: ok ? "" : "rate-limited" };
  }
  const minute = Math.floor(Date.now() / 60000);
  const hour = Math.floor(Date.now() / 3600000);
  const res = await store.pipeline([
    ["INCR", `rl:m:${id}:${minute}`],
    ["EXPIRE", `rl:m:${id}:${minute}`, 90],
    ["INCR", `rl:h:${id}:${hour}`],
    ["EXPIRE", `rl:h:${id}:${hour}`, 3700],
    ["INCR", `rl:g:${minute}`],
    ["EXPIRE", `rl:g:${minute}`, 90],
  ]);
  const ok = res[0] <= L.requestsPerMinutePerClient && res[2] <= L.requestsPerHourPerClient && res[4] <= L.requestsPerMinuteGlobal;
  return { ok, id, reason: ok ? "" : "rate-limited" };
}

/** Global budget for fresh gradings (each one calls Wikimedia). */
async function gradingBudget() {
  const L = cfg.limits;
  if (!store.configured()) return memHit("grade", L.freshGradingsPerMinuteGlobal, 60000);
  const minute = Math.floor(Date.now() / 60000);
  const r = await store.pipeline([["INCR", `rl:grade:${minute}`], ["EXPIRE", `rl:grade:${minute}`, 90]]);
  return r[0] <= L.freshGradingsPerMinuteGlobal;
}

/** Cap on automatic additions to the Community timeline. */
async function additionBudget() {
  const L = cfg.limits;
  const hour = Math.floor(Date.now() / 3600000);
  const day = new Date().toISOString().slice(0, 10);
  const r = await store.pipeline([
    ["INCR", `rl:add:h:${hour}`], ["EXPIRE", `rl:add:h:${hour}`, 3700],
    ["INCR", `rl:add:d:${day}`], ["EXPIRE", `rl:add:d:${day}`, 90000],
    ["SCARD", "community:ids"],
  ]);
  return r[0] <= L.communityAdditionsPerHour && r[2] <= L.communityAdditionsPerDay && r[4] < L.communityMaxMembers;
}

function isoWeek(d) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  const w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7);
  return y + "-W" + String(w).padStart(2, "0");
}

module.exports = { clientKey, validQid, validSlug, cleanText, rateLimit, gradingBudget, additionBudget, isoWeek };
