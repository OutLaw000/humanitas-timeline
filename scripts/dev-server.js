#!/usr/bin/env node
/**
 * Local preview server that mimics vercel.json (cleanUrls, /who, /figure/*, /api/*).
 * Usage: node scripts/dev-server.js [port]   (set UPSTASH_REDIS_REST_URL/TOKEN to use a store)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const port = parseInt(process.argv[2] || "4173", 10);
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".webp": "image/webp", ".jpg": "image/jpeg" };
function file(p) { try { const s = fs.statSync(p); return s.isFile() ? p : null; } catch { return null; } }
http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  let p = decodeURIComponent(u.pathname);
  if (p.startsWith("/api/")) {
    const name = p.slice(5).replace(/\/$/, "");
    const f = file(path.join(root, "api", name + ".js"));
    if (!f || name.startsWith("_")) { res.statusCode = 404; return res.end("{}"); }
    // Minimal Vercel-like req/res helpers
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString("utf8");
    try { req.body = raw && /json/.test(req.headers["content-type"] || "") ? JSON.parse(raw) : raw; } catch { req.body = undefined; }
    req.query = Object.fromEntries(u.searchParams);
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(o)); };
    delete require.cache[f];
    try { return await require(f)(req, res); } catch (e) { console.error(e); res.statusCode = 500; return res.end("{}"); }
  }
  let target = null;
  if (/^\/figure\/[a-z0-9-]+$/.test(p) && file(path.join(root, p + ".html"))) target = path.join(root, p + ".html");
  else if (p === "/who" || p.startsWith("/who/")) target = path.join(root, "who.html");
  else if (p === "/") target = path.join(root, "index.html");
  else target = file(path.join(root, p)) || file(path.join(root, p + ".html"));
  if (!target) { res.statusCode = 404; res.setHeader("Content-Type", "text/html"); return res.end(fs.readFileSync(path.join(root, "404.html"))); }
  res.setHeader("Content-Type", MIME[path.extname(target)] || "application/octet-stream");
  res.end(fs.readFileSync(target));
}).listen(port, () => console.log("dev server on http://localhost:" + port));
