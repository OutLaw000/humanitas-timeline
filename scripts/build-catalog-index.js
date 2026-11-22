#!/usr/bin/env node
/** Writes api/_lib/catalog.json: slug → {q, name, epithet, by, dy} for the 115 (server-side validation list). */
const fs = require("fs"), path = require("path");
global.window = {};
const root = path.join(__dirname, "..");
for (let i = 1; i <= 7; i++) require(path.join(root, "data" + i + ".js"));
require(path.join(root, "data-sources.js"));
const S = window.HUMANITAS_SOURCES;
const out = {};
for (const f of window.HUMANITAS.figures) {
  if (!S[f.slug]) continue;
  out[f.slug] = { q: S[f.slug].q, name: f.name.replace(/\s*\(.*\)\s*/g, "").trim(), epithet: f.epithet || "", by: f.birthYear, dy: f.deathYear == null ? null : f.deathYear };
}
fs.writeFileSync(path.join(root, "api", "_lib", "catalog.json"), JSON.stringify(out));
console.log(Object.keys(out).length, "catalog entries");
