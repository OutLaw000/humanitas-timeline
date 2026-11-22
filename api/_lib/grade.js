/**
 * Community grading: facts (from Wikidata / Wikipedia / Wikimedia pageviews) → score.
 * Pure function of the facts and config/grading.config.json. Clients never supply any of it.
 */
const cfg = require("../../config/grading.config.json");

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const round1 = (n) => Math.round(n * 10) / 10;

function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/**
 * facts = {
 *   human:boolean, instanceOf:[qid], living:boolean, hasEnglishWikipedia:boolean,
 *   languageEditions:number, awards:number, offices:number, works:number,
 *   articleBytes:number, monthlyViews:[number]   // oldest → newest, up to windowMonths
 * }
 */
function grade(facts, config) {
  const c = config || cfg;
  const g = c.gates, k = c.components;
  const reasons = [];

  // Gates: blocked outright, never scored.
  if (g.requireHuman && !facts.human) reasons.push("not-human");
  if ((facts.instanceOf || []).some((q) => g.blockedInstanceOf.includes(q))) reasons.push("fictional-or-blocked-class");
  if (g.requireEnglishWikipedia && !facts.hasEnglishWikipedia) reasons.push("no-english-wikipedia");
  const minLang = facts.living ? g.minLanguageEditionsLiving : g.minLanguageEditionsDeceased;
  if ((facts.languageEditions || 0) < minLang) reasons.push(facts.living ? "living-low-notability" : "low-notability");
  const views = (facts.monthlyViews || []).filter((v) => Number.isFinite(v));
  const med = median(views);
  if (views.length && med < g.minMedianMonthlyViews) reasons.push("low-readership");

  // Components.
  const L = k.languageEditions;
  const languages = clamp((facts.languageEditions || 0) * L.pointsPerEdition, 0, L.max);

  const A = k.recordedAchievements;
  const awards = clamp((facts.awards || 0) * A.awards.perItem, 0, A.awards.cap);
  const offices = clamp((facts.offices || 0) * A.offices.perItem, 0, A.offices.cap);
  const works = clamp((facts.works || 0) * A.works.perItem, 0, A.works.cap);
  const achievements = clamp(awards + offices + works, 0, A.max);

  const D = k.articleDepth;
  const depth = clamp(((facts.articleBytes || 0) / D.fullPointsBytes) * D.max, 0, D.max);

  const R = k.readershipLongevity;
  let readership = 0;
  let spiky = false;
  if (views.length) {
    // log scale between 1,000 views/month (0) and the full-points median (max)
    const lo = Math.log10(R.activeMonthViews), hi = Math.log10(R.medianMonthlyViewsForFullPoints);
    const frac = clamp((Math.log10(Math.max(med, 1)) - lo) / (hi - lo), 0, 1);
    readership = frac * R.max;
    const active = views.filter((v) => v >= R.activeMonthViews).length / Math.max(views.length, 1);
    if (active < R.minActiveShare || views.length < Math.round(R.windowMonths * 0.5)) {
      readership = Math.min(readership, R.max * R.shortHistoryCapShare);
    }
    const max = Math.max(...views);
    spiky = med > 0 && max > med * 8;
  }

  const total = round1(languages + achievements + depth + readership);
  const pass = reasons.length === 0 && total >= c.threshold;
  return {
    version: c.version,
    score: total,
    threshold: c.threshold,
    pass,
    gateReasons: reasons,
    breakdown: {
      languageEditions: round1(languages),
      recordedAchievements: round1(achievements),
      articleDepth: round1(depth),
      readershipLongevity: round1(readership),
    },
    signals: {
      languageEditions: facts.languageEditions || 0,
      awards: facts.awards || 0,
      offices: facts.offices || 0,
      works: facts.works || 0,
      articleBytes: facts.articleBytes || 0,
      medianMonthlyViews: Math.round(med),
      monthsOfData: views.length,
      spiky,
    },
  };
}

module.exports = { grade, median, config: cfg };
