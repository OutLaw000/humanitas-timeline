#!/usr/bin/env node
/** Local stand-in for the Upstash Redis REST API (/pipeline) used by api/_lib/store.js. Dev/test only. */
const http = require("http");
const port = parseInt(process.argv[2] || "4399", 10);
const TOKEN = process.env.MOCK_TOKEN || "mock-token";
const db = new Map(); // key -> {type, v, exp}
const now = () => Date.now();
function get(k) { const e = db.get(k); if (!e) return null; if (e.exp && e.exp < now()) { db.delete(k); return null; } return e; }
function ensure(k, type, mk) { let e = get(k); if (!e) { e = { type, v: mk() }; db.set(k, e); } return e; }
function run(c) {
  const [op, ...a] = c; const o = String(op).toUpperCase();
  switch (o) {
    case "GET": { const e = get(a[0]); return e ? e.v : null; }
    case "SET": { const ex = a.findIndex((x) => String(x).toUpperCase() === "EX"); db.set(a[0], { type: "str", v: String(a[1]), exp: ex > 0 ? now() + Number(a[ex + 1]) * 1000 : 0 }); return "OK"; }
    case "INCR": { const e = ensure(a[0], "str", () => "0"); e.v = String(Number(e.v) + 1); return Number(e.v); }
    case "EXPIRE": { const e = get(a[0]); if (e) e.exp = now() + Number(a[1]) * 1000; return e ? 1 : 0; }
    case "SADD": { const e = ensure(a[0], "set", () => new Set()); let n = 0; for (const m of a.slice(1)) if (!e.v.has(m)) { e.v.add(m); n++; } return n; }
    case "SISMEMBER": { const e = get(a[0]); return e && e.v.has(a[1]) ? 1 : 0; }
    case "SCARD": { const e = get(a[0]); return e ? e.v.size : 0; }
    case "SMEMBERS": { const e = get(a[0]); return e ? [...e.v] : []; }
    case "HSET": { const e = ensure(a[0], "hash", () => new Map()); let n = 0; for (let i = 1; i < a.length; i += 2) { if (!e.v.has(a[i])) n++; e.v.set(a[i], a[i + 1]); } return n; }
    case "HGETALL": { const e = get(a[0]); return e ? [...e.v].flat() : []; }
    case "LPUSH": { const e = ensure(a[0], "list", () => []); for (const m of a.slice(1)) e.v.unshift(String(m)); return e.v.length; }
    case "LREM": { const e = get(a[0]); if (!e) return 0; const b = e.v.length; e.v = e.v.filter((x) => x !== String(a[2])); return b - e.v.length; }
    case "LTRIM": { const e = get(a[0]); if (e) e.v = e.v.slice(Number(a[1]), Number(a[2]) + 1); return "OK"; }
    case "LRANGE": { const e = get(a[0]); return e ? e.v.slice(Number(a[1]), Number(a[2]) + 1) : []; }
    case "PFADD": { const e = ensure(a[0], "hll", () => new Set()); const b = e.v.size; for (const m of a.slice(1)) e.v.add(m); return e.v.size > b ? 1 : 0; }
    case "PFCOUNT": { const e = get(a[0]); return e ? e.v.size : 0; }
    case "DEL": return db.delete(a[0]) ? 1 : 0;
    case "FLUSHALL": db.clear(); return "OK";
    case "KEYS": return [...db.keys()];
    default: throw new Error("unsupported " + o);
  }
}
http.createServer((req, res) => {
  if ((req.headers.authorization || "") !== "Bearer " + TOKEN) { res.statusCode = 401; return res.end('{"error":"unauthorized"}'); }
  let b = ""; req.on("data", (d) => (b += d));
  req.on("end", () => {
    try {
      const cmds = req.url.startsWith("/pipeline") ? JSON.parse(b) : [JSON.parse(b)];
      const out = cmds.map((c) => { try { return { result: run(c) }; } catch (e) { return { error: e.message }; } });
      res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(out));
    } catch { res.statusCode = 400; res.end("{}"); }
  });
}).listen(port, () => console.log("mock upstash on " + port));
