const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const g = { window: {} };
const c =
  fs.readFileSync(path.join(root, "data1.js"), "utf8") +
  fs.readFileSync(path.join(root, "data2.js"), "utf8") +
  fs.readFileSync(path.join(root, "data3.js"), "utf8") +
  fs.readFileSync(path.join(root, "data4.js"), "utf8") +
  fs.readFileSync(path.join(root, "data5.js"), "utf8") +
  fs.readFileSync(path.join(root, "data6.js"), "utf8") +
  fs.readFileSync(path.join(root, "data7.js"), "utf8");
eval(c.replace(/window\./g, "g.window."));
const base = "https://humanitysatlas.com";
const figs = g.window.HUMANITAS.figures;
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
xml += `  <url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>1</priority></url>\n`;
xml += `  <url><loc>${base}/classroom</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
xml += `  <url><loc>${base}/who</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
for (const f of figs) {
  xml += `  <url><loc>${base}/figure/${f.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
}
xml += "</urlset>\n";
fs.writeFileSync(path.join(root, "sitemap.xml"), xml);
fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`
);
console.log("wrote sitemap with", figs.length + 3, "urls");
