/** Load the curated 115 once per serverless instance. */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const files = [
  "data1.js",
  "data2.js",
  "data3.js",
  "data4.js",
  "data5.js",
  "data6.js",
  "data7.js",
  "data-dates.js",
  "data-enrichment.js",
];

let cache = null;

function all() {
  if (cache) return cache;
  const g = { window: {} };
  const src = files.map((name) => fs.readFileSync(path.join(root, name), "utf8")).join("\n");
  eval(src.replace(/window\./g, "g.window."));
  cache = (g.window.HUMANITAS && g.window.HUMANITAS.figures) || [];
  return cache;
}

function bySlug(slug) {
  return all().find((f) => f.slug === slug) || null;
}

module.exports = { all, bySlug };
