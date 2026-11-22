/**
 * POST /api/tts  { "slug": "socrates" }
 *
 * Speaks a curated life with Grok Voice (Ara). The browser never sees XAI_API_KEY.
 * Client may only name a catalog slug — the script is built here.
 */
const store = require("./_lib/store");
const guard = require("./_lib/guard");
const { bySlug } = require("./_lib/figures");

const VOICE = "ara";
const CACHE_TTL = 30 * 86400;
const MAX_CACHE = 800000;
const MAX_CHARS = 1400;
const TTS_LIMITS = { perMinute: 4, perHour: 24, globalPerMinute: 20 };

const mem = new Map();
function memHit(key, limit, windowMs) {
  const now = Date.now();
  const e = mem.get(key);
  if (!e || e.reset < now) {
    mem.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  e.n += 1;
  return e.n <= limit;
}

function sendJson(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

function formatYear(y) {
  if (y == null || Number.isNaN(Number(y))) return "";
  return (y < 0 ? String(Math.abs(y)) + " BCE" : String(y) + " CE");
}

function formatLifespan(f) {
  const b = formatYear(f.birthYear);
  if (!b) return "";
  if (f.deathYear == null) return b + " to the present";
  return b + " to " + formatYear(f.deathYear);
}

function scriptFor(f) {
  const parts = [f.name + "."];
  if (f.epithet) parts.push(f.epithet + ".");
  const life = formatLifespan(f);
  if (life) parts.push("Lived " + life + ".");
  if (f.summary) parts.push(String(f.summary).trim());
  const acc = (f.accomplishments || []).slice(0, 4);
  if (acc.length) parts.push("Accomplishments. " + acc.join(". ") + ".");
  const bio = (f.biography || []).slice(0, 2).join(" ").trim();
  if (bio) parts.push(bio);
  const pr = ((f.philosophy && f.philosophy.corePrinciples) || []).slice(0, 3);
  if (pr.length) parts.push("Principles. " + pr.join(". ") + ".");
  if (f.legacy) parts.push(String(f.legacy).trim());
  return parts.filter(Boolean).join(" [pause] ").slice(0, MAX_CHARS);
}

async function ttsLimit(req) {
  const id = guard.clientKey(req);
  if (!store.configured()) {
    const ok =
      memHit("tts:m:" + id, TTS_LIMITS.perMinute, 60000) &&
      memHit("tts:h:" + id, TTS_LIMITS.perHour, 3600000) &&
      memHit("tts:g", TTS_LIMITS.globalPerMinute, 60000);
    return { ok, id };
  }
  const minute = Math.floor(Date.now() / 60000);
  const hour = Math.floor(Date.now() / 3600000);
  const r = await store.pipeline([
    ["INCR", `rl:tts:m:${id}:${minute}`],
    ["EXPIRE", `rl:tts:m:${id}:${minute}`, 90],
    ["INCR", `rl:tts:h:${id}:${hour}`],
    ["EXPIRE", `rl:tts:h:${id}:${hour}`, 3700],
    ["INCR", `rl:tts:g:${minute}`],
    ["EXPIRE", `rl:tts:g:${minute}`, 90],
  ]);
  const ok =
    Number(r[0]) <= TTS_LIMITS.perMinute &&
    Number(r[2]) <= TTS_LIMITS.perHour &&
    Number(r[4]) <= TTS_LIMITS.globalPerMinute;
  return { ok, id };
}

async function cachedAudio(slug) {
  if (!store.configured()) return null;
  try {
    const raw = await store.cmd("GET", "tts:v1:" + VOICE + ":" + slug);
    return raw ? Buffer.from(String(raw), "base64") : null;
  } catch {
    return null;
  }
}

async function saveAudio(slug, buf) {
  if (!store.configured()) return;
  const b64 = buf.toString("base64");
  if (b64.length > MAX_CACHE) return;
  try {
    await store.cmd("SET", "tts:v1:" + VOICE + ":" + slug, b64, "EX", CACHE_TTL);
  } catch {}
}

async function grokSpeak(text) {
  const key = process.env.XAI_API_KEY || "";
  if (!key) return { error: "no-key" };
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 22000);
  try {
    const r = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice_id: VOICE,
        language: "en",
        speed: 0.92,
        text_normalization: true,
        output_format: { codec: "mp3", sample_rate: 24000, bit_rate: 128000 },
      }),
      signal: ctl.signal,
    });
    if (!r.ok) return { error: "upstream", status: r.status };
    const buf = Buffer.from(await r.arrayBuffer());
    if (!buf.length) return { error: "empty" };
    return { buf };
  } catch (err) {
    return { error: err && err.name === "AbortError" ? "timeout" : "upstream" };
  } finally {
    clearTimeout(t);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "method" });
  }
  const ct = String(req.headers["content-type"] || "");
  if (!/application\/json/i.test(ct)) return sendJson(res, 415, { error: "content-type" });
  if (Number(req.headers["content-length"] || 0) > 400) return sendJson(res, 413, { error: "too-large" });
  const body = await readBody(req);
  if (!body || typeof body !== "object") return sendJson(res, 400, { error: "bad-json" });
  if (!guard.validSlug(body.slug)) return sendJson(res, 400, { error: "unknown-slug" });

  const f = bySlug(body.slug);
  if (!f) return sendJson(res, 400, { error: "unknown-slug" });

  let rl;
  try {
    rl = await ttsLimit(req);
  } catch {
    if (store.configured()) {
      res.setHeader("Retry-After", "30");
      return sendJson(res, 429, { error: "rate-limited" });
    }
    rl = { ok: true };
  }
  if (!rl.ok) {
    res.setHeader("Retry-After", "60");
    return sendJson(res, 429, { error: "rate-limited" });
  }

  if (!process.env.XAI_API_KEY) return sendJson(res, 503, { error: "no-tts" });

  const hit = await cachedAudio(f.slug);
  if (hit) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("X-Voice", VOICE);
    res.setHeader("X-TTS-Cache", "hit");
    return res.end(hit);
  }

  const spoken = scriptFor(f);
  const out = await grokSpeak(spoken);
  if (out.error === "no-key") return sendJson(res, 503, { error: "no-tts" });
  if (out.error) return sendJson(res, 502, { error: "upstream" });

  await saveAudio(f.slug, out.buf);
  res.statusCode = 200;
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("X-Voice", VOICE);
  res.setHeader("X-TTS-Cache", "miss");
  return res.end(out.buf);
};

module.exports.config = { maxDuration: 30 };
