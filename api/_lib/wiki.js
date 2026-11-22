/**
 * Server-side reads from Wikimedia (Wikidata, English Wikipedia, pageviews).
 * Nothing here is user-supplied except a validated QID.
 */
const UA = { "User-Agent": "HumanitysAtlas/1.0 (https://humanitysatlas.com; grading)", Accept: "application/json" };
const NOT_LANGUAGE = new Set(["commonswiki", "specieswiki", "metawiki", "mediawikiwiki", "wikidatawiki", "foundationwiki", "outreachwiki", "incubatorwiki", "sourceswiki", "strategywiki", "wikimaniawiki", "testwiki", "test2wiki", "nostalgiawiki", "labswiki", "betawikiversity"]);

async function getJson(url, timeoutMs) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs || 8000);
  try {
    const r = await fetch(url, { headers: UA, signal: ctl.signal });
    if (!r.ok) throw new Error("upstream " + r.status);
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

const claimIds = (c, p) =>
  (c[p] || [])
    .filter((s) => s.mainsnak && s.mainsnak.datavalue && s.rank !== "deprecated")
    .map((s) => s.mainsnak.datavalue.value && s.mainsnak.datavalue.value.id)
    .filter(Boolean);

function yearOf(c, p) {
  const v = c[p] && c[p][0] && c[p][0].mainsnak && c[p][0].mainsnak.datavalue && c[p][0].mainsnak.datavalue.value;
  const m = v && v.time && String(v.time).match(/^([+-])(\d+)-/);
  return m ? (m[1] === "-" ? -1 : 1) * parseInt(m[2], 10) : null;
}

function monthStamp(d) {
  return d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, "0") + "0100";
}

async function fetchFacts(qid, windowMonths) {
  const ent = (await getJson(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qid}&props=claims|sitelinks|descriptions|labels&languages=en&format=json`)).entities?.[qid];
  if (!ent || ent.missing != null) return null;
  const claims = ent.claims || {};
  const instanceOf = claimIds(claims, "P31");
  const sitelinks = ent.sitelinks || {};
  const languageEditions = Object.keys(sitelinks).filter((k) => /wiki$/.test(k) && !NOT_LANGUAGE.has(k)).length;
  const enTitle = sitelinks.enwiki && sitelinks.enwiki.title;
  const facts = {
    qid,
    human: instanceOf.includes("Q5"),
    instanceOf,
    living: !(claims.P570 && claims.P570.length),
    hasEnglishWikipedia: !!enTitle,
    languageEditions,
    awards: new Set(claimIds(claims, "P166")).size,
    offices: new Set(claimIds(claims, "P39")).size,
    works: new Set(claimIds(claims, "P800")).size,
    articleBytes: 0,
    monthlyViews: [],
    title: enTitle || (ent.labels && ent.labels.en && ent.labels.en.value) || "",
    description: (ent.descriptions && ent.descriptions.en && ent.descriptions.en.value) || "",
    birthYear: yearOf(claims, "P569"),
    deathYear: yearOf(claims, "P570"),
  };
  if (!facts.human || !enTitle) return facts;

  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - (windowMonths - 1), 1));
  const t = encodeURIComponent(enTitle.replace(/ /g, "_"));
  const [info, pv] = await Promise.allSettled([
    getJson(`https://en.wikipedia.org/w/api.php?action=query&prop=info&format=json&titles=${encodeURIComponent(enTitle)}`),
    getJson(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${t}/monthly/${monthStamp(start)}/${monthStamp(end)}`),
  ]);
  if (info.status === "fulfilled") {
    const page = Object.values(info.value.query?.pages || {})[0];
    facts.articleBytes = (page && page.length) || 0;
  }
  if (pv.status === "fulfilled") facts.monthlyViews = (pv.value.items || []).map((i) => i.views);
  return facts;
}

module.exports = { fetchFacts, getJson };
