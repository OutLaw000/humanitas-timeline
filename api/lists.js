/**
 * GET /api/lists?kind=recent|week|community   → public, read-only, never CDN-cached
 * (an empty response must not hide a person who was just added).
 */
const store = require("./_lib/store");
const guard = require("./_lib/guard");
const { config } = require("./_lib/grade");
const L = config.limits;

function send(res, code, obj, cache) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cache || "no-store");
  res.end(JSON.stringify(obj));
}
const parse = (s) => { try { return JSON.parse(s); } catch { return null; } };
const pub = (m) => m && { q: m.q, name: m.t, desc: m.d, birth: m.by, death: m.dy, slug: m.s || undefined };

module.exports = async function handler(req, res) {
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return send(res, 405, { error: "method" }, "no-store"); }
  const kind = String((req.query && req.query.kind) || new URL(req.url, "http://x").searchParams.get("kind") || "");
  if (!["recent", "week", "community"].includes(kind)) return send(res, 400, { error: "kind" }, "no-store");
  if (!store.configured()) return send(res, 200, { configured: false, kind, items: [] }, "public, s-maxage=60");

  try {
    if (kind === "recent") {
      const ids = (await store.cmd("LRANGE", "recent", 0, L.recentListSize - 1)) || [];
      if (!ids.length) return send(res, 200, { configured: true, kind, items: [] });
      const rows = await store.pipeline(ids.map((q) => ["GET", `p:${q}`]));
      const items = rows.map((r, i) => { const m = parse(r); return m ? { ...pub(m), ts: m.ts } : null; }).filter(Boolean);
      return send(res, 200, { configured: true, kind, items });
    }
    if (kind === "week") {
      const week = guard.isoWeek(new Date());
      const ids = (await store.cmd("SMEMBERS", `wk:${week}:q`)) || [];
      if (!ids.length) return send(res, 200, { configured: true, kind, week, items: [] });
      const counts = await store.pipeline(ids.map((q) => ["PFCOUNT", `wk:${week}:u:${q}`]));
      const ranked = ids.map((q, i) => ({ q, n: Number(counts[i]) || 0 })).filter((x) => x.n > 0).sort((a, b) => b.n - a.n).slice(0, L.weeklyTop);
      const rows = await store.pipeline(ranked.map((x) => ["GET", `p:${x.q}`]));
      const items = ranked.map((x, i) => { const m = parse(rows[i]); return m ? { ...pub(m), explorers: x.n } : null; }).filter(Boolean);
      return send(res, 200, { configured: true, kind, week, items });
    }
    const all = (await store.cmd("HGETALL", "community")) || [];
    const vals = Array.isArray(all)
      ? all.filter((_, i) => i % 2 === 1)
      : (all && typeof all === "object" ? Object.values(all) : []);
    const items = [];
    for (const v of vals) { const m = parse(v); if (m) items.push({ ...pub(m), score: m.sc }); }
    items.sort((a, b) => (a.birth == null ? 9999 : a.birth) - (b.birth == null ? 9999 : b.birth));
    return send(res, 200, { configured: true, kind, count: items.length, items });
  } catch {
    return send(res, 200, { configured: false, kind, items: [], error: "store-unavailable" }, "no-store");
  }
};
