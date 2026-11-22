const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const base = "https://humanitysatlas.com";
const dataFiles = [
  "data1.js",
  "data2.js",
  "data3.js",
  "data4.js",
  "data5.js",
  "data6.js",
  "data7.js",
  "data-dates.js",
  "data-enrichment.js",
  "data-images.js",
  "data-images-opt.js",
];

const g = { window: {} };
const src = dataFiles
  .map((name) => fs.readFileSync(path.join(root, name), "utf8"))
  .join("\n");
eval(src.replace(/window\./g, "g.window."));
const figures = g.window.HUMANITAS.figures;
if (!figures || !figures.length) {
  throw new Error("no figures loaded");
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setTagged(html, re, replacement) {
  if (!re.test(html)) {
    throw new Error("pattern not found: " + re);
  }
  return html.replace(re, replacement);
}

function description(f) {
  return String(f.summary || f.epithet || "").slice(0, 160);
}

function absUrl(url) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return base + (url.startsWith("/") ? url : "/" + url);
}

function pageFor(f, template) {
  const title = f.name + " — Humanity’s Atlas";
  const desc = description(f);
  const pageUrl = base + "/figure/" + f.slug;
  let html = template;
  html = setTagged(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setTagged(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(desc)}" />`
  );
  html = setTagged(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(title)}" />`
  );
  html = setTagged(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${esc(desc)}" />`
  );
  html = setTagged(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${esc(pageUrl)}" />`
  );
  html = setTagged(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`
  );
  html = setTagged(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${esc(desc)}" />`
  );
  html = setTagged(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${esc(pageUrl)}" />`
  );

  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: f.name,
    description: f.summary,
    url: pageUrl,
    image: absUrl(f.image && f.image.url),
    birthDate: f.birthYear != null ? String(f.birthYear) : undefined,
    deathDate: f.deathYear != null ? String(f.deathYear) : undefined,
  };
  Object.keys(ld).forEach((k) => {
    if (ld[k] === undefined) delete ld[k];
  });
  const ldBlock =
    '  <script type="application/ld+json">\n' +
    "  " +
    JSON.stringify(ld) +
    "\n" +
    "  </script>\n";
  if (html.includes("</head>")) {
    html = html.replace("</head>", ldBlock + "</head>");
  } else {
    throw new Error("no </head> in figure.html");
  }
  return html;
}

const template = fs.readFileSync(path.join(root, "figure.html"), "utf8");
const outDir = path.join(root, "figure");
fs.mkdirSync(outDir, { recursive: true });
for (const existing of fs.readdirSync(outDir)) {
  if (existing.endsWith(".html")) fs.unlinkSync(path.join(outDir, existing));
}

const slugs = new Set();
for (const f of figures) {
  if (!f.slug || !f.name) throw new Error("figure missing slug or name");
  if (slugs.has(f.slug)) throw new Error("duplicate slug: " + f.slug);
  slugs.add(f.slug);
  fs.writeFileSync(path.join(outDir, f.slug + ".html"), pageFor(f, template));
}

const vercelPath = path.join(root, "vercel.json");
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
const kept = (vercel.rewrites || []).filter(
  (r) => !r.source.startsWith("/figure/")
);
const embedSources = new Set(kept.filter((r) => r.source.startsWith("/embed/")).map((r) => r.source));
for (const f of figures) {
  const source = "/embed/" + f.slug;
  if (!embedSources.has(source)) {
    kept.push({ source, destination: "/embed" });
    embedSources.add(source);
  }
}
vercel.rewrites = kept;
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + "\n");

console.log(
  "wrote " + figures.length + " figure pages and updated vercel.json rewrites (" +
    kept.length +
    ")"
);
