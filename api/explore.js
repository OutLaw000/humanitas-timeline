/**
 * POST /api/explore  { "qid": "Q22686" }  |  { "slug": "socrates" }
 *
 * The browser only names WHO was opened. Everything else — grading, de-duplication, the
 * Community decision, counts — is computed here from Wikidata/Wikipedia/Wikimedia. A client
 * cannot submit a score, a title, or a description.
 */
const store = require("./_lib/store");
const guard = require("./_lib/guard");
const { grade, config } = require("./_lib/grade");
const { fetchFacts } = require("./_lib/wiki");
let catalog = {};
try { catalog = require("./_lib/catalog.json"); } catch (_) {}

const L = config.limits;
const DAY = 86400;

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch { return null; } }
  return null;
}

/** Record an exploration (anonymous, de-duplicated per client per person). */
async function record(meta, clientId) {
  const week = guard.isoWeek(new Date());
  const rkey = JSON.stringify({ q: meta.q, t: meta.t, d: meta.d, by: meta.by, dy: meta.dy, s: meta.s || "", ts: Math.floor(Date.now() / 1000) });
  await store.pipeline([
    ["SET", `p:${meta.q}`, rkey, "EX", 90 * DAY],
    ["LREM", "recent", 0, meta.q],            // keep one entry per person…
    ["LPUSH", "recent", meta.q],              // …most recent first
    ["LTRIM", "recent", 0, L.recentListSize - 1],
    ["SCARD", `wk:${week}:q`],
  ]).then(async (r) => {
    if (r[4] < L.weeklyCandidateCap) {
      await store.pipeline([
        ["SADD", `wk:${week}:q`, meta.q],
        ["EXPIRE", `wk:${week}:q`, 35 * DAY],
        ["PFADD", `wk:${week}:u:${meta.q}`, clientId],   // unique explorers: a HyperLogLog, irreversible
        ["EXPIRE", `wk:${week}:u:${meta.q}`, 35 * DAY],
      ]);
    } else {
      await store.pipeline([["PFADD", `wk:${week}:u:${meta.q}`, clientId]]).catch(() => {});
    }
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(res, 405, { error: "method" }); }
  const ct = String(req.headers["content-type"] || "");
  if (!/application\/json/i.test(ct)) return send(res, 415, { error: "content-type" });
  if (Number(req.headers["content-length"] || 0) > 600) return send(res, 413, { error: "too-large" });
  const body = await readBody(req);
  if (!body || typeof body !== "object") return send(res, 400, { error: "bad-json" });

  let rl;
  try { rl = await guard.rateLimit(req); } catch { rl = { ok: true, id: guard.clientKey(req) }; }
  if (!rl.ok) { res.setHeader("Retry-After", "60"); return send(res, 429, { error: "rate-limited" }); }
  const hasStore = store.configured();

  // ---- A curated figure (one of the 115): only counts the exploration ------------------
  if (body.slug !== undefined) {
    if (!guard.validSlug(body.slug) || !catalog[body.slug]) return send(res, 400, { error: "unknown-slug" });
    const c = catalog[body.slug];
    if (hasStore) {
      try { await record({ q: c.q, t: c.name, d: c.epithet, by: c.by, dy: c.dy, s: body.slug }, rl.id); } catch {}
    }
    return send(res, 200, { ok: true, curated: true, recorded: hasStore });
  }

  // ---- Anyone else: graded server-side -----------------------------------------------
  if (!guard.validQid(body.qid)) return send(res, 400, { error: "bad-qid" });
  const qid = body.qid;

  let result = null;
  let meta = null;
  if (hasStore) {
    try {
      const cached = await store.cmd("GET", `g:${qid}`);
      if (cached) { const j = JSON.parse(cached); result = j.result; meta = j.meta; }
    } catch {}
  }
  if (!result) {
    let allowed = true;
    try { allowed = await guard.gradingBudget(); } catch {}
    if (!allowed) { res.setHeader("Retry-After", "30"); return send(res, 429, { error: "busy" }); }
    let facts;
    try { facts = await fetchFacts(qid, config.components.readershipLongevity.windowMonths); } catch { return send(res, 502, { error: "upstream" }); }
    if (!facts) return send(res, 404, { error: "not-found" });
    result = grade(facts);
    meta = {
      q: qid,
      t: guard.cleanText(facts.title, 90),
      d: guard.cleanText(facts.description, 120),
      by: facts.birthYear,
      dy: facts.deathYear,
    };
    if (hasStore) {
      const ttl = (result.pass ? L.gradeCacheDaysPass : L.gradeCacheDaysFail) * DAY;
      try { await store.cmd("SET", `g:${qid}`, JSON.stringify({ result, meta }), "EX", ttl); } catch {}
    }
  }

  // Blocked entries (non-human, fictional, living low-notability, …) are never listed anywhere.
  if (result.gateReasons.length) {
    return send(res, 200, { score: result.score, threshold: result.threshold, pass: false, community: "blocked", eligible: false, reasons: result.gateReasons });
  }

  let community = result.pass ? (hasStore ? "member" : "pending-store") : "below-threshold";
  if (hasStore) {
    try {
      await record(meta, rl.id);
      if (result.pass) {
        const isMember = await store.cmd("SISMEMBER", "community:ids", qid);
        if (!isMember) {
          if (await guard.additionBudget()) {
            await store.pipeline([
              ["SADD", "community:ids", qid],
              ["HSET", "community", qid, JSON.stringify({ ...meta, sc: result.score, ts: Math.floor(Date.now() / 1000) })],
            ]);
            community = "added";
          } else {
            community = "queued-cap";
          }
        }
      }
    } catch { community = result.pass ? "pending-store" : "below-threshold"; }
  }
  return send(res, 200, {
    score: result.score,
    threshold: result.threshold,
    pass: result.pass,
    community,
    eligible: true,
    breakdown: result.breakdown,
  });
};
