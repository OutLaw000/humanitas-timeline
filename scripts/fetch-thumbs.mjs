import { writeFileSync, mkdirSync } from "fs";
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function thumbFor(title) {
  const api =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=800&wbptterms=description&titles=" +
    encodeURIComponent(title.replace(/ /g, "_"));
  const r = await fetch(api, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error("api " + r.status);
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  if (!page || page.missing || !page.thumbnail) return null;
  return {
    url: page.thumbnail.source,
    title: page.title,
    desc: (page.terms && page.terms.description && page.terms.description[0]) || "",
  };
}

function extOf(url) {
  const u = url.split("?")[0].toLowerCase();
  if (u.endsWith(".png") || u.endsWith(".svg")) return ".png";
  return ".jpg";
}

const photos = {};
const report = {};

for (const [slug, title] of Object.entries(PAGES)) {
  process.stdout.write(slug + " … ");
  try {
    const info = await thumbFor(title);
    if (!info) {
      console.log("NO THUMB");
      report[slug] = { ok: false, error: "no thumb" };
      await sleep(400);
      continue;
    }
    const ext = extOf(info.url);
    const rel = "images/figures/" + slug + ext;
    const img = await fetch(info.url, { headers: { "User-Agent": UA } });
    if (!img.ok) throw new Error("dl " + img.status);
    const buf = Buffer.from(await img.arrayBuffer());
    writeFileSync(join(root, rel), buf);
    const caption = ("Visual for " + info.title + (info.desc ? " — " + info.desc : "")).slice(0, 180);
    photos[slug] = { url: rel, credit: "Wikipedia / Wikimedia Commons", caption };
    report[slug] = { ok: true, path: rel, source: info.url, bytes: buf.length };
    console.log(buf.length);
  } catch (e) {
    console.log("FAIL", e.message);
    report[slug] = { ok: false, error: e.message };
  }
  await sleep(350);
}

writeFileSync(join(root, "images", "new-portraits-map.json"), JSON.stringify(photos, null, 2));
writeFileSync(join(root, "images", "new-portraits-report.json"), JSON.stringify(report, null, 2));
console.log(
  "ok",
  Object.values(report).filter((x) => x.ok).length,
  "fail",
  Object.values(report).filter((x) => !x.ok).length
);
