#!/usr/bin/env node
/**
 * Build data-sources.js: for each of the 115 curated figures, the Wikipedia article,
 * Wikidata item (QID) and a few Wikidata facts (birth/death place, occupations, education).
 * Run: node scripts/build-sources.js   (needs network; output is checked in)
 * Only Wikipedia / Wikidata / Wikiquote are used. Nothing is invented.
 */
const fs = require("fs");
const path = require("path");
global.window = {};
const root = path.join(__dirname, "..");
for (let i = 1; i <= 7; i++) require(path.join(root, "data" + i + ".js"));
const E = require(path.join(root, "editorial.js"));
const figures = window.HUMANITAS.figures;

const TITLE = {
  david: "David", solomon: "Solomon", laozi: "Laozi", confucius: "Confucius", buddha: "Gautama Buddha",
  jesus: "Jesus", mary: "Mary, mother of Jesus", abraham: "Abraham", noah: "Noah", isaiah: "Isaiah",
  elijah: "Elijah", jeremiah: "Jeremiah", "john-the-baptist": "John the Baptist", deborah: "Deborah",
  joshua: "Joshua", daniel: "Daniel (biblical figure)", zoroaster: "Zoroaster", "guru-nanak": "Guru Nanak",
  gideon: "Gideon", "judah-maccabee": "Judah Maccabee", hiawatha: "Hiawatha", moses: "Moses",
  muhammad: "Muhammad", "marcus-aurelius": "Marcus Aurelius", hypatia: "Hypatia", rumi: "Rumi",
  "mother-teresa": "Mother Teresa", "martin-luther-king-jr": "Martin Luther King Jr.", "ibn-sina": "Avicenna",
  "al-khwarizmi": "Al-Khwarizmi", imhotep: "Imhotep", hippocrates: "Hippocrates", cicero: "Cicero",
  augustine: "Augustine of Hippo", justinian: "Justinian I", maimonides: "Maimonides",
  "sitting-bull": "Sitting Bull", "crazy-horse": "Crazy Horse", "chief-joseph": "Chief Joseph",
  "black-elk": "Black Elk", "al-ghazali": "Al-Ghazali", "wangari-maathai": "Wangari Maathai",
  "qin-shi-huang": "Qin Shi Huang", ashoka: "Ashoka", augustus: "Augustus", "cyrus-the-great": "Cyrus the Great",
  "mahatma-gandhi": "Mahatma Gandhi", "marie-curie": "Marie Curie", "alexander-the-great": "Alexander the Great",
  "jan-sobieski": "John III Sobieski", constantine: "Constantine the Great", "charles-martel": "Charles Martel",
  saladin: "Saladin", sacagawea: "Sacagawea", "w-e-b-du-bois": "W. E. B. Du Bois", "paul-the-apostle": "Paul the Apostle",
  "john-adams": "John Adams", "george-washington": "George Washington", "franklin-d-roosevelt": "Franklin D. Roosevelt",
  "susan-b-anthony": "Susan B. Anthony", "tim-berners-lee": "Tim Berners-Lee",
};
// Birth/death places are only shown where Wikidata is not a tradition-only record.
const NO_PLACE = new Set(["mary", "jesus", "john-the-baptist", "david", "solomon", "moses", "abraham", "noah", "isaiah", "elijah", "jeremiah", "deborah", "joshua", "daniel", "gideon", "zoroaster", "laozi", "buddha", "imhotep", "hiawatha", "hammurabi", "confucius", "judah-maccabee"]);

const API = "https://www.wikidata.org/w/api.php";
const UA = { "User-Agent": "HumanitysAtlasBuild/1.0 (https://humanitysatlas.com; build script)" };
async function j(url) {
  for (let i = 0; i < 7; i++) {
    await new Promise((r2) => setTimeout(r2, 250));
    let r;
    try { r = await fetch(url, { headers: UA }); } catch (_) { r = null; }
    if (r && r.ok) return r.json();
    await new Promise((r2) => setTimeout(r2, 1500 * (i + 1)));
  }
  throw new Error("fetch failed " + url);
}
const claimIds = (c, p) => (c[p] || []).filter((x) => x.mainsnak && x.mainsnak.datavalue).map((x) => x.mainsnak.datavalue.value.id).filter(Boolean);

(async () => {
  const out = {};
  const report = [];
  for (const f of figures) {
    const title = TITLE[f.slug] || f.name.replace(/\s*\(.*\)\s*/g, "").trim();
    const w = await j(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageprops|info&ppprop=wikibase_item&redirects=1&format=json&titles=${encodeURIComponent(title)}`
    );
    const page = Object.values(w.query.pages)[0];
    if (!page || page.missing != null || !page.pageprops || !page.pageprops.wikibase_item) {
      report.push(`MISSING ${f.slug} (${title})`);
      continue;
    }
    const q = page.pageprops.wikibase_item;
    const ent = (await j(`${API}?action=wbgetentities&ids=${q}&props=claims|descriptions&languages=en&format=json`)).entities[q];
    const claims = ent.claims || {};
    const ids = [
      ...claimIds(claims, "P19").slice(0, 1),
      ...claimIds(claims, "P20").slice(0, 1),
      ...claimIds(claims, "P106").slice(0, 14),
      ...claimIds(claims, "P69").slice(0, 3),
    ];
    const labels = {};
    if (ids.length) {
      const l = await j(`${API}?action=wbgetentities&ids=${Array.from(new Set(ids)).join("|")}&props=labels&languages=en&format=json`);
      for (const [id, e] of Object.entries(l.entities)) labels[id] = e.labels && e.labels.en && e.labels.en.value;
    }
    const lab = (id) => labels[id] || "";
    const rec = { q, w: page.title.replace(/ /g, "_") };
    // Wikiquote page?
    const wq = await j(`https://en.wikiquote.org/w/api.php?action=query&redirects=1&format=json&titles=${encodeURIComponent(page.title)}`);
    const wqp = Object.values(wq.query.pages)[0];
    if (wqp && wqp.missing == null) rec.wq = wqp.title.replace(/ /g, "_") === rec.w ? true : wqp.title.replace(/ /g, "_");
    if (!NO_PLACE.has(f.slug)) {
      const b = claimIds(claims, "P19")[0], d = claimIds(claims, "P20")[0];
      if (b && lab(b) && !/hospital|medical cent|clinic|infirmary/i.test(lab(b))) rec.b = lab(b);
      if (d && lab(d) && !/hospital|medical cent|clinic|infirmary/i.test(lab(d))) rec.d = lab(d);
    }
    const occ = E.occupationList(claimIds(claims, "P106").map(lab).filter(Boolean), false).slice(0, 3);
    if (occ.length && !NO_PLACE.has(f.slug)) rec.o = occ;
    const ed = claimIds(claims, "P69").map(lab).filter(Boolean).slice(0, 3);
    if (ed.length && !NO_PLACE.has(f.slug)) rec.e = ed;
    out[f.slug] = rec;
    const hum = claimIds(claims, "P31").join(",");
    report.push(`${f.slug.padEnd(24)} ${q.padEnd(11)} ${page.title.padEnd(32)} ${(ent.descriptions.en || {}).value || ""}  [P31:${hum}]`);
  }
  fs.writeFileSync(
    path.join(root, "data-sources.js"),
    "/* Wikipedia / Wikidata / Wikiquote references for the 115. Run scripts/build-sources.js to regenerate. */\n(() => {\n  window.HUMANITAS_SOURCES = " +
      JSON.stringify(out) +
      ";\n})();\n"
  );
  fs.writeFileSync(path.join(root, "..", "who-editorial", "sources-report.txt"), report.join("\n") + "\n");
  console.log(Object.keys(out).length, "figures →", "data-sources.js");
})();
