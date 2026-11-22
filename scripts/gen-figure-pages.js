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
const CAT = g.window.HUMANITAS.CATEGORY_LABELS || {};
const STATUS = g.window.HUMANITAS.STATUS_LABELS || {};
const Ed = require(path.join(root, "editorial.js"));
const Bio = require(path.join(root, "bio.js"));
let SOURCES = {};
try {
  const gs = { window: {} };
  eval(fs.readFileSync(path.join(root, "data-sources.js"), "utf8").replace(/window\./g, "gs.window."));
  SOURCES = gs.window.HUMANITAS_SOURCES || {};
} catch (_) {}
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
  const lead = String(Ed.trimLead(f.summary || "") || f.epithet || "");
  if (lead.length >= 110) return lead.slice(0, 160);
  return ("Biography of " + f.name + ". " + lead).slice(0, 160);
}

function absUrl(url) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return base + (url.startsWith("/") ? url : "/" + url);
}

function formatYear(y, opts) {
  if (y == null || Number.isNaN(Number(y))) return "";
  opts = opts || {};
  var n = y < 0 ? String(Math.abs(y)) : String(y);
  if (opts.alt != null && !Number.isNaN(Number(opts.alt))) {
    n = n + "/" + (y < 0 ? Math.abs(opts.alt) : opts.alt);
  }
  var body = n + (y < 0 ? " BCE" : " CE");
  return opts.circa ? "c. " + body : body;
}

function formatLifespan(b, d, meta) {
  if (b && typeof b === "object") {
    meta = b;
    d = b.deathYear;
    b = b.birthYear;
  }
  meta = meta || {};
  var circa = meta.datePrecision === "circa";
  var trad = meta.datePrecision === "traditional";
  if (b == null && d == null) return "";
  var bStr = formatYear(b, { circa: circa, alt: meta.birthYearAlt });
  if (d == null) return (trad ? "traditional " : "") + bStr + " – present";
  var span = bStr + " – " + formatYear(d, { circa: circa, alt: meta.deathYearAlt });
  return trad
    ? "traditional " + formatYear(b, { alt: meta.birthYearAlt }) + " – " + formatYear(d, { alt: meta.deathYearAlt })
    : span;
}

function photoHtml(f) {
  const img = f.image;
  if (!img || !img.url) return "";
  const picFn = g.window.HUMANITAS && g.window.HUMANITAS.figurePicture;
  const inner = picFn
    ? picFn(f, "", { alt: f.name, loading: "eager" })
    : `<img src="${esc(img.url)}" alt="${esc(f.name)}" loading="eager" decoding="async" />`;
  const cap = [img.caption || f.name, img.credit].filter(Boolean).join(" · ");
  return `<figure class="fig-hero-photo">${inner}<figcaption>${esc(cap)}</figcaption></figure>`;
}

function wikiUrl(src) {
  if (!src || !src.w) return undefined;
  return (
    "https://en.wikipedia.org/wiki/" +
    encodeURIComponent(src.w).replace(/%2F/g, "/").replace(/%3A/g, ":")
  );
}

function pageFor(f, template) {
  const title = f.name + " — Biography | Humanity’s Atlas";
  const desc = description(f);
  const pageUrl = base + "/figure/" + f.slug;
  const ogImage = absUrl(f.image && f.image.url) || base + "/og/humanitys-atlas.png";
  const ogAlt = f.name + " — Humanity’s Atlas";
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
  html = setTagged(
    html,
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`
  );
  html = setTagged(
    html,
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${esc(ogImage)}" />`
  );
  html = setTagged(
    html,
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${esc(ogAlt)}" />`
  );
  html = setTagged(
    html,
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`
  );
  html = setTagged(
    html,
    /<meta name="twitter:image:alt" content="[^"]*" \/>/,
    `<meta name="twitter:image:alt" content="${esc(ogAlt)}" />`
  );

  const src = SOURCES[f.slug];
  const sameAs = [];
  const wiki = wikiUrl(src);
  if (wiki) sameAs.push(wiki);
  if (src && src.q) sameAs.push("https://www.wikidata.org/wiki/" + src.q);
  const person = {
    "@type": "Person",
    "@id": pageUrl + "#person",
    name: f.name,
    description: Ed.trimLead(f.summary || ""),
    url: pageUrl,
    image: absUrl(f.image && f.image.url),
    birthDate: f.birthYear != null ? String(f.birthYear) : undefined,
    deathDate: f.deathYear != null ? String(f.deathYear) : undefined,
    jobTitle: src && src.o && src.o[0] ? src.o[0] : undefined,
    knowsAbout: f.epithet || undefined,
    isPartOf: { "@id": base + "/#website" },
    mainEntityOfPage: { "@id": pageUrl + "#page" },
    sameAs: sameAs.length ? sameAs : undefined,
  };
  Object.keys(person).forEach((k) => {
    if (person[k] === undefined) delete person[k];
  });
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": pageUrl + "#page",
        url: pageUrl,
        name: title,
        description: desc,
        isPartOf: { "@id": base + "/#website" },
        mainEntity: { "@id": pageUrl + "#person" },
        breadcrumb: { "@id": pageUrl + "#crumbs" },
        inLanguage: "en",
      },
      person,
      {
        "@type": "BreadcrumbList",
        "@id": pageUrl + "#crumbs",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Humanity’s Atlas", item: base + "/" },
          { "@type": "ListItem", position: 2, name: "The 115", item: base + "/#all-lives" },
          { "@type": "ListItem", position: 3, name: f.name, item: pageUrl },
        ],
      },
    ],
  };
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

  const model = Bio.fromCurated(f, {
    CAT,
    STATUS,
    formatLifespan,
    sources: SOURCES,
    figures,
    editorial: Ed,
  });
  model.photo = photoHtml(f);
  model.actions = `<div class="fig-actions">
          <a class="btn btn-primary btn-sm" href="/#figure=${esc(f.slug)}">Open in app</a>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-share">Share</button>
          <a class="btn btn-ghost btn-sm" href="/embed/${esc(f.slug)}" target="_blank">Embed card</a>
        </div>`;
  const bio = Bio.render(model);
  const rootRe = /<div id="fig-root"><p class="section-lead">Loading…<\/p><\/div>/;
  if (!rootRe.test(html)) throw new Error("fig-root placeholder missing");
  html = html.replace(rootRe, `<div id="fig-root" data-static="1">\n${bio}\n    </div>`);
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
