/**
 * Download Wikimedia portraits for figures missing local images.
 * Run: node scripts/fetch-new-portraits.mjs
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "images", "figures");
mkdirSync(outDir, { recursive: true });

const UA = "HumanitasBot/1.0 (https://ameriking.io; educational timeline portraits)";

const PAGES = {
  imhotep: "Imhotep",
  hippocrates: "Hippocrates",
  cicero: "Cicero",
  augustine: "Augustine_of_Hippo",
  justinian: "Justinian_I",
  charlemagne: "Charlemagne",
  maimonides: "Maimonides",
  "thomas-aquinas": "Thomas_Aquinas",
  "francis-of-assisi": "Francis_of_Assisi",
  "immanuel-kant": "Immanuel_Kant",
  "benjamin-franklin": "Benjamin_Franklin",
  "edward-jenner": "Edward_Jenner",
  "henry-dunant": "Henry_Dunant",
  "george-washington-carver": "George_Washington_Carver",
  "w-e-b-du-bois": "W._E._B._Du_Bois",
  "alexander-fleming": "Alexander_Fleming",
  "norman-borlaug": "Norman_Borlaug",
  mary: "Mary,_mother_of_Jesus",
  abraham: "Abraham",
  noah: "Noah",
  isaiah: "Isaiah",
  elijah: "Elijah",
  jeremiah: "Jeremiah",
  "john-the-baptist": "John_the_Baptist",
  deborah: "Deborah",
  joshua: "Joshua",
  daniel: "Daniel_(biblical_figure)",
  zoroaster: "Zoroaster",
  "guru-nanak": "Guru_Nanak",
  gideon: "Gideon",
  "judah-maccabee": "Judas_Maccabeus",
  constantine: "Constantine_the_Great",
  "charles-martel": "Charles_Martel",
  saladin: "Saladin",
  "jan-sobieski": "John_III_Sobieski",
  hiawatha: "Hiawatha",
  sequoyah: "Sequoyah",
  tecumseh: "Tecumseh",
  "sitting-bull": "Sitting_Bull",
  "crazy-horse": "Crazy_Horse",
  "chief-joseph": "Chief_Joseph",
  sacagawea: "Sacagawea",
  "black-elk": "Black_Elk",
  "thomas-jefferson": "Thomas_Jefferson",
  "james-madison": "James_Madison",
  "john-adams": "John_Adams",
  "harriet-beecher-stowe": "Harriet_Beecher_Stowe",
  "clara-barton": "Clara_Barton",
  epictetus: "Epictetus",
  "al-ghazali": "Al-Ghazali",
};

async function wikiSummary(title) {
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title);
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) return null;
  return r.json();
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error("download " + r.status + " " + url);
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(dest, buf);
  return buf.length;
}

function extFrom(url, contentHint) {
  const u = url.split("?")[0].toLowerCase();
  if (u.endsWith(".png")) return ".png";
  if (u.endsWith(".webp")) return ".jpg";
  if (u.endsWith(".svg")) return ".png";
  return ".jpg";
}

const report = {};
const photos = {};

for (const [slug, title] of Object.entries(PAGES)) {
  process.stdout.write(slug + " … ");
  try {
    const sum = await wikiSummary(title);
    const src =
      (sum && sum.originalimage && sum.originalimage.source) ||
      (sum && sum.thumbnail && sum.thumbnail.source) ||
      null;
    if (!src) {
      console.log("NO IMAGE");
      report[slug] = { ok: false, title, error: "no thumbnail" };
      continue;
    }
    // Prefer a reasonably sized commons thumb if original is huge tiff
    let fetchUrl = src;
    if (/\.(tif|tiff)(\?|$)/i.test(src) && sum.thumbnail) fetchUrl = sum.thumbnail.source;
    if (/\/commons\/thumb\//.test(src) === false && sum.thumbnail && sum.thumbnail.source) {
      // keep original if it's a normal jpg/png under ~2MB later
      fetchUrl = src.includes("/wikipedia/commons/") ? src : sum.thumbnail.source;
    }
    const ext = extFrom(fetchUrl);
    const rel = "images/figures/" + slug + ext;
    const dest = join(root, rel);
    const bytes = await download(fetchUrl, dest);
    const caption = "Visual for " + (sum.title || title) + (sum.description ? " — " + sum.description : "");
    photos[slug] = {
      url: rel,
      credit: "Wikipedia / Wikimedia Commons",
      caption: caption.slice(0, 180),
    };
    report[slug] = { ok: true, path: rel, source: fetchUrl, title: sum.title, bytes };
    console.log("ok", bytes);
  } catch (e) {
    console.log("FAIL", e.message);
    report[slug] = { ok: false, title, error: e.message };
  }
}

writeFileSync(join(root, "images", "new-portraits-report.json"), JSON.stringify(report, null, 2));
writeFileSync(join(root, "images", "new-portraits-map.json"), JSON.stringify(photos, null, 2));
const ok = Object.values(report).filter((x) => x.ok).length;
const fail = Object.values(report).filter((x) => !x.ok).length;
console.log("done ok", ok, "fail", fail);
