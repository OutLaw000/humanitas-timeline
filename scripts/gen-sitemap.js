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
const figs = [...g.window.HUMANITAS.figures].sort((a, b) => a.birthYear - b.birthYear);
const today = new Date().toISOString().slice(0, 10);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function patchBlock(html, name, inner) {
  const start = `<!--seo:${name}-->`;
  const end = `<!--/seo:${name}-->`;
  const i = html.indexOf(start);
  const j = html.indexOf(end);
  if (i < 0 || j < 0 || j < i) throw new Error("missing seo markers: " + name);
  return html.slice(0, i + start.length) + "\n" + inner + "\n  " + html.slice(j);
}

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": base + "/#website",
      url: base + "/",
      name: "Humanity’s Atlas",
      alternateName: ["Humanitas", "Humanity Atlas", "Humanitys Atlas"],
      description:
        "A living timeline of 115 lives that redirected humanity. Search any name. Biographies from public Wikipedia and Wikidata.",
      inLanguage: "en",
      publisher: { "@id": base + "/#org" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: base + "/who?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": base + "/#org",
      name: "Humanity’s Atlas",
      url: base + "/",
      logo: base + "/apple-touch-icon.png",
      sameAs: ["https://ameriking.io"],
    },
    {
      "@type": "CollectionPage",
      "@id": base + "/#collection",
      url: base + "/",
      name: "Timeline of " + figs.length + " historical figures",
      description:
        "A living timeline of " + figs.length + " lives that redirected humanity. Search any name.",
      isPartOf: { "@id": base + "/#website" },
      mainEntity: { "@id": base + "/#lives" },
      about: ["historical figures", "biography", "timeline", "world history"],
    },
    {
      "@type": "ItemList",
      "@id": base + "/#lives",
      name: figs.length + " lives of greatness",
      numberOfItems: figs.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: figs.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: base + "/figure/" + f.slug,
        name: f.name,
      })),
    },
  ],
};

const livesHtml = `    <section class="fig-index" id="all-lives">
      <p class="eyebrow">The archive</p>
      <h2 class="section-title">The ${figs.length}</h2>
      <p class="section-lead">Every curated life, oldest first. Open any name for the full biography.</p>
      <ul class="fig-index-list">
${figs
  .map((f) => `        <li><a href="/figure/${esc(f.slug)}">${esc(f.name)}</a></li>`)
  .join("\n")}
      </ul>
    </section>`;

let index = fs.readFileSync(path.join(root, "index.html"), "utf8");
index = patchBlock(
  index,
  "jsonld",
  `  <script type="application/ld+json">\n  ${JSON.stringify(ld)}\n  </script>`
);
index = patchBlock(index, "lives", livesHtml);
fs.writeFileSync(path.join(root, "index.html"), index);

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
const urls = [
  ["/", "weekly", "1.0"],
  ["/classroom", "monthly", "0.6"],
  ["/who", "monthly", "0.6"],
  ["/community", "daily", "0.7"],
];
for (const [loc, freq, pri] of urls) {
  xml += `  <url><loc>${base}${loc}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>\n`;
}
for (const f of figs) {
  xml += `  <url><loc>${base}/figure/${f.slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
}
xml += "</urlset>\n";
fs.writeFileSync(path.join(root, "sitemap.xml"), xml);

fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /logo-preview\nDisallow: /embed\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`
);

const llms = `# Humanity’s Atlas

> A living timeline of ${figs.length} historical figures who redirected humanity — law, faith, science, liberation, and ideas. Search any name. Biographies use public Wikipedia, Wikidata, and Wikiquote only.

Site: ${base}/

## Pages
- Homepage timeline: ${base}/
- Search any name: ${base}/who?q={name}
- Community (auto-graded public lives): ${base}/community
- Classroom pack: ${base}/classroom

## Figures
Each curated life has a static page:

${figs.map((f) => `- ${f.name}: ${base}/figure/${f.slug}`).join("\n")}
`;
fs.writeFileSync(path.join(root, "llms.txt"), llms);

console.log("wrote sitemap, robots, llms.txt, and homepage SEO for", figs.length, "lives");
