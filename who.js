/**
 * /who — a profile for any searched name, under ONE editorial standard
 * (see editorial.js and docs/EDITORIAL.md): greatness-first, neutral, factual.
 *
 * Catalog hit → the curated figure page. Otherwise: Wikipedia + Wikidata + Wikiquote
 * composed by heuristics (no AI, nothing invented) and laid out with the shared
 * bio component (bio.js), the same one the 115 use.
 * Not a person / not found → a clean “not found” result.
 */
(() => {
  const esc =
    window.HumanitasWhoSearch?.esc ||
    ((s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const norm = window.HumanitasWhoSearch?.norm || ((s) => String(s).toLowerCase());
  const cleanQuery = window.HumanitasWhoSearch?.cleanQuery || ((s) => String(s || "").trim().slice(0, 80));
  const pickCatalog = window.HumanitasWhoSearch?.pickCatalog || (() => null);
  const CAT = (window.HUMANITAS && window.HUMANITAS.CATEGORY_LABELS) || {};
  const E = window.HumanitasEditorial;
  const B = window.HumanitasBio;

  const root = document.getElementById("who-root");
  if (!root || !E || !B) return;

  const SKIP_HEAD =
    /^(see also|references|notes|bibliography|external links|further reading|footnotes|citations|sources|works cited|notes and references|general and cited sources|primary sources|secondary sources|citations and footnotes|navboxes|categories|gallery|films|in popular culture|popular culture|ancestry|coats of arms|family tree|titles, styles|honours|decorations|arms|discography|filmography|awards and nominations|awards and honors|honors|accolades|publications|bibliography)$/i;
  const LEGACY_HEAD = /legacy|influence|assessment|aftermath|historiography|commemoration|memory of|impact|honou?rs|recognition|tributes?/i;
  const WORK_HEAD = /^(works|publications|writings|compositions|inventions|filmography|discography|bibliography of|selected works|notable works)/i;
  const VIEW_HEAD = /philosoph|belief|politic(?:al)? views|religious views|thought|ideolog|doctrine|teaching|ethic|religion|faith/i;
  const LIFE_HEAD =
    /early|childhood|youth|family|origin|background|education|career|life|business|music|art|film|television|media|company|companies|presidency|administration|tenure|term|campaign|research|work|invention|writing|science|activism|service|military|rise|formation|training|discovery|ministry|office|leader|senate|governor|founding|innovation|product|philanthrop|later|personal/i;
  const SKIP_OCC_PLACE = /hospital|medical cent|clinic|infirmary/i;

  function queryFromUrl() {
    const params = new URLSearchParams(location.search);
    if (params.get("q")) return cleanQuery(params.get("q"));
    const parts = location.pathname.split("/").filter(Boolean);
    const i = parts.indexOf("who");
    if (i >= 0 && parts[i + 1]) return cleanQuery(decodeURIComponent(parts[i + 1]).replace(/[-_]+/g, " "));
    return "";
  }

  function setMeta(title, description, opts) {
    opts = opts || {};
    document.title = title;
    const desc = String(description || "").slice(0, 160);
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", desc);
    const set = (sel, attr, key, value) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement(sel.startsWith("link") ? "link" : "meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      if (sel.startsWith("link")) el.setAttribute("href", value);
      else el.setAttribute("content", value);
    };
    set('meta[property="og:title"]', "property", "og:title", title);
    set('meta[property="og:description"]', "property", "og:description", desc);
    set('meta[property="og:site_name"]', "property", "og:site_name", "Humanity’s Atlas");
    set('meta[name="twitter:title"]', "name", "twitter:title", title);
    set('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    set('meta[property="og:image"]', "property", "og:image", "https://humanitysatlas.com/og/humanitys-atlas.png");
    set('meta[name="twitter:image"]', "name", "twitter:image", "https://humanitysatlas.com/og/humanitys-atlas.png");
    set('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    set('meta[property="og:image:height"]', "property", "og:image:height", "630");
    set('meta[property="og:image:alt"]', "property", "og:image:alt", "Humanity’s Atlas — DNA strand and wordmark");
    set('meta[name="twitter:description"]', "name", "twitter:description", desc);
    if (location.pathname) {
      set('meta[property="og:url"]', "property", "og:url", "https://humanitysatlas.com" + location.pathname + location.search);
      set('link[rel="canonical"]', "rel", "canonical", "https://humanitysatlas.com" + location.pathname + location.search);
    }
    if (opts.noindex) set('meta[name="robots"]', "name", "robots", "noindex,follow");
  }

  function uniq(list) {
    const seen = new Set();
    const out = [];
    for (const x of list) {
      const k = norm(x);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      out.push(x);
    }
    return out;
  }

  function formatYear(y, opts) {
    if (y == null || Number.isNaN(Number(y))) return "";
    opts = opts || {};
    const n = y < 0 ? String(Math.abs(y)) : String(y);
    return n + (y < 0 ? " BCE" : " CE");
  }
  function ordinalCentury(y) {
    const c = Math.ceil(Math.abs(y) / 100);
    const suf = c % 10 === 1 && c !== 11 ? "st" : c % 10 === 2 && c !== 12 ? "nd" : c % 10 === 3 && c !== 13 ? "rd" : "th";
    return c + suf + " century" + (y < 0 ? " BCE" : "");
  }
  function eraFromYears(b, d) {
    if (b == null && d == null) return "";
    const y = b != null ? b : d;
    if (d != null && b != null && Math.ceil(Math.abs(b) / 100) !== Math.ceil(Math.abs(d) / 100)) return ordinalCentury(b) + " – " + ordinalCentury(d);
    return ordinalCentury(y);
  }
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function parseWdTime(v) {
    // {time:"+1946-06-14T00:00:00Z", precision:11}
    if (!v || !v.time) return null;
    const m = String(v.time).match(/^([+-])(\d+)-(\d\d)-(\d\d)/);
    if (!m) return null;
    const year = (m[1] === "-" ? -1 : 1) * parseInt(m[2], 10);
    const month = parseInt(m[3], 10), day = parseInt(m[4], 10);
    const prec = v.precision || 9;
    let text = formatYear(year);
    if (prec >= 11 && month && day && year > 0) text = MONTHS[month - 1] + " " + day + ", " + year;
    else if (prec === 10 && month && year > 0) text = MONTHS[month - 1] + " " + year;
    else if (prec <= 8) text = "c. " + text;
    return { year, text };
  }

  // ---- Wikipedia text -------------------------------------------------------
  function parseSections(extract) {
    const lines = String(extract || "").split(/\n/);
    const sections = [{ title: "Lead", paras: [] }];
    let cur = sections[0];
    let buf = [];
    const flush = () => {
      const t = buf.join(" ").replace(/\s+/g, " ").trim();
      if (t.length > 40) cur.paras.push(t);
      buf = [];
    };
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) {
        flush();
        continue;
      }
      const heading =
        line.length < 80 && !/[.?!]$/.test(line) && line.split(/\s+/).length <= 10 && /^[A-Z0-9“"]/.test(line) && !/^\d+$/.test(line);
      if (heading && (cur.paras.length || cur.title !== "Lead")) {
        flush();
        cur = { title: line.replace(/\[edit\]/gi, "").trim(), paras: [] };
        sections.push(cur);
        continue;
      }
      buf.push(line);
    }
    flush();
    return sections.filter((s) => s.paras.length && !SKIP_HEAD.test(s.title));
  }

  async function getJson(url, headers) {
    const r = await fetch(url, headers ? { headers } : undefined);
    if (!r.ok) throw new Error("http " + r.status);
    return r.json();
  }

  async function fetchExtract(title) {
    const j = await getJson(
      "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&exsectionformat=plain&redirects=1&format=json&origin=*&titles=" + encodeURIComponent(title)
    );
    const page = Object.values(j.query?.pages || {})[0];
    return page?.extract || "";
  }

  // ---- Wikidata (small per-property claim reads, ordered as on Wikidata) ----
  const WD = "https://www.wikidata.org/w/api.php";
  async function wdClaims(qid, prop) {
    try {
      const j = await getJson(`${WD}?action=wbgetclaims&entity=${qid}&property=${prop}&format=json&origin=*`);
      return j.claims?.[prop] || [];
    } catch {
      return [];
    }
  }
  const cid = (stmts) => stmts.map((s) => s.mainsnak?.datavalue?.value?.id).filter(Boolean);
  async function wdLabels(ids) {
    const out = {};
    const list = Array.from(new Set(ids)).filter((x) => /^Q\d+$/.test(x));
    for (let i = 0; i < list.length; i += 45) {
      try {
        const j = await getJson(`${WD}?action=wbgetentities&ids=${list.slice(i, i + 45).join("|")}&props=labels&languages=en&format=json&origin=*`);
        for (const [id, e] of Object.entries(j.entities || {})) out[id] = e.labels?.en?.value || "";
      } catch {}
    }
    return out;
  }

  async function fetchIsHuman(qid) {
    if (!qid || !/^Q\d+$/i.test(qid)) return null;
    const p31 = cid(await wdClaims(qid, "P31"));
    return p31.includes("Q5");
  }

  async function fetchWikiData(qid) {
    if (!qid || !/^Q\d+$/i.test(qid)) return null;
    const props = ["P569", "P570", "P19", "P20", "P27", "P106", "P39", "P800", "P166", "P69", "P101"];
    const res = await Promise.all(props.map((p) => wdClaims(qid, p)));
    const c = Object.fromEntries(props.map((p, i) => [p, res[i]]));
    const posStmts = c.P39.slice(0, 24);
    const ids = [
      ...cid(c.P19).slice(0, 1), ...cid(c.P20).slice(0, 1), ...cid(c.P27).slice(0, 2), ...cid(c.P106).slice(0, 14),
      ...cid(posStmts), ...cid(c.P800).slice(0, 10), ...cid(c.P166).slice(0, 12), ...cid(c.P69).slice(0, 3), ...cid(c.P101).slice(0, 4),
    ];
    let labels = await wdLabels(ids);
    const L = (id) => labels[id] || "";
    // Birthplace recorded as a hospital → show the place it is located in.
    const placeOf = async (stmts) => {
      const id = cid(stmts)[0];
      if (!id || !L(id)) return "";
      if (!SKIP_OCC_PLACE.test(L(id))) return L(id);
      const loc = cid(await wdClaims(id, "P131"))[0];
      if (!loc) return "";
      const l2 = await wdLabels([loc]);
      return l2[loc] && !SKIP_OCC_PLACE.test(l2[loc]) ? l2[loc] : "";
    };
    const [pob, pod] = await Promise.all([placeOf(c.P19), placeOf(c.P20)]);
    const qv = (s, p) => s.qualifiers?.[p]?.[0]?.datavalue?.value;
    const positions = posStmts
      .map((s) => {
        const id = s.mainsnak?.datavalue?.value?.id;
        if (!id || !L(id)) return null;
        const o = qv(s, "P1545");
        const st = parseWdTime(qv(s, "P580"));
        const en = parseWdTime(qv(s, "P582"));
        return { label: L(id), ordinal: typeof o === "string" ? o : o?.amount || "", start: st?.year || null, end: en?.year || null };
      })
      .filter(Boolean);
    const awards = c.P166.slice(0, 12)
      .map((s) => {
        const id = s.mainsnak?.datavalue?.value?.id;
        const y = parseWdTime(qv(s, "P585"))?.year;
        return id && L(id) ? { label: L(id), year: y || null } : null;
      })
      .filter(Boolean)
      .filter((a) => !/raspberry|razzie|worst|ig nobel|shame|dishonou?r/i.test(a.label) && E.clean(a.label));
    return {
      birth: parseWdTime(c.P569[0]?.mainsnak?.datavalue?.value),
      death: parseWdTime(c.P570[0]?.mainsnak?.datavalue?.value),
      pob, pod,
      countries: uniq(cid(c.P27).map(L).filter(Boolean)).slice(0, 2),
      occupations: uniq(cid(c.P106).map(L).filter(Boolean)),
      positions,
      works: uniq(cid(c.P800).map(L).filter(Boolean)).slice(0, 8),
      awards,
      schools: uniq(cid(c.P69).map(L).filter(Boolean)).slice(0, 3),
      fields: uniq(cid(c.P101).map(L).filter(Boolean)).slice(0, 4),
    };
  }

  async function fetchQuotes(title) {
    let j;
    try {
      j = await getJson(
        "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&explaintext=1&exsectionformat=plain&redirects=1&format=json&origin=*&titles=" + encodeURIComponent(title)
      );
    } catch {
      return { quotes: [], page: "" };
    }
    const page = Object.values(j.query?.pages || {})[0];
    if (!page || page.missing != null) return { quotes: [], page: "" };
    const lines = String(page.extract || "").split(/\n/).map((l) => l.replace(/^['"“”]+|['"“”]+$/g, "").trim());
    const out = [];
    let skip = false;
    for (const line of lines) {
      if (/^(about |misattributed|disputed|see also|external|references|from wikipedia|quotes about)/i.test(line)) {
        skip = /^(about |misattributed|disputed|quotes about)/i.test(line);
        continue;
      }
      if (skip) continue;
      if (line.length < 40 || line.length > 260) continue;
      if (/^(quotes|attributed|from:|source:|wikipedia|wikiquote)/i.test(line)) continue;
      if (/^\d+$/.test(line) || /^https?:/i.test(line) || !/[a-z]/.test(line)) continue;
      if (/quoted in|as quoted|as translated|letter to|edited by|\bvol\.|\bp\.\s*\d+|refers to|variant translation|\(\d{3,4}\),\s*p\./i.test(line)) continue;
      out.push(line);
      if (out.length >= 24) break;
    }
    return { quotes: E.cleanQuotes(out, title).slice(0, 3), page: page.title || title };
  }

  function relatedFromCatalog(hay) {
    const figs = (window.HUMANITAS && window.HUMANITAS.figures) || [];
    const n = " " + norm(hay).replace(/[^a-z0-9]+/g, " ") + " ";
    const place = /^(alexandria|athens|rome|paris|egypt|india|china|france|italy|spain|london|jerusalem|babylon|corsica|moscow)$/;
    const hits = [];
    for (const f of figs) {
      const name = norm(f.name).replace(/\(.*\)/g, "").trim();
      if (name.length < 6) continue;
      if (n.includes(" " + name + " ")) {
        hits.push(f);
        continue;
      }
      const parts = name.split(" ").filter((p) => !["jr", "sr", "ii", "iii", "the", "of"].includes(p));
      const last = parts[parts.length - 1];
      if (place.test(last)) continue;
      if (last && last.length > 8 && n.includes(" " + last + " ") && parts.length > 1) hits.push(f);
      if (hits.length >= 6) break;
    }
    return uniq(hits.map((f) => f.slug)).map((slug) => figs.find((f) => f.slug === slug)).filter(Boolean).slice(0, 6);
  }

  function catsFromOccupation(occ) {
    const t = (occ || "").toLowerCase();
    const cats = [];
    if (/philosoph|writer|poet|essay|playwright|novel|thinker|scholar of|author|historian/.test(t)) cats.push("philosophical");
    if (/scient|physic|chemist|mathemat|inventor|astronom|biolog|physician|engineer|comput|naturalist/.test(t)) cats.push("scientific");
    if (/politic|statesman|monarch|emperor|king|queen|president|legislat|diplomat|ruler|consul|pharaoh|prime minister|senator/.test(t)) cats.push("political");
    if (/military|soldier|general|admiral|officer|commander/.test(t)) cats.push("military");
    if (/humanitar|activist|nurse|reformer|abolition|philanthrop|social worker/.test(t)) cats.push("humanitarian");
    if (/saint|prophet|theolog|cleric|monk|nun|imam|rabbi|priest|mystic|religious/.test(t)) cats.push("spiritual");
    return uniq(cats);
  }

  // ---- Not found ------------------------------------------------------------
  function notFoundPage(name, kind, found) {
    const n = esc(name);
    setMeta(`No record found for “${name}” — Humanity’s Atlas`, "Humanity’s Atlas profiles people documented in Wikipedia and Wikidata. No matching record was found.", { noindex: true });
    const headline =
      kind === "not-person"
        ? `“${n}” is not a person profile`
        : `No record found for “${n}”`;
    const body =
      kind === "not-person"
        ? `Wikipedia has an article titled <strong>${esc(found || name)}</strong>, but it is not about a person. Humanity’s Atlas profiles people only.`
        : `We searched Wikipedia and Wikidata and found no biographical record for this name. Check the spelling, try the full name, or browse the people we do cover.`;
    root.innerHTML = `
      <p class="who-kicker">Search result</p>
      <h1 class="who-nf-title">${headline}</h1>
      <p class="who-nf-body">${body}</p>
      <ul class="who-nf-tips">
        <li>Try the full name, for example <em>Ada Lovelace</em> rather than <em>Ada</em>.</li>
        <li>Profiles use the same standard for everyone: contributions first, neutral language, sources linked.</li>
      </ul>
      <div class="who-actions">
        <a class="btn btn-primary" href="/#timeline">See the 115</a>
        <a class="btn btn-ghost" href="/community">Community timeline</a>
        <a class="btn btn-ghost" href="/trending">Most explored this week</a>
      </div>`;
  }

  function catalogRedirect(f) {
    location.replace("/figure/" + f.slug);
  }

  // ---- Profile --------------------------------------------------------------
  function buildProfile(name, page, extra) {
    const title = page.title || name;
    const wd = extra.wd || {};
    const extract = extra.extract || page.extract || "";
    const sections = parseSections(extract);
    const leadParas = sections.find((s) => s.title === "Lead")?.paras || [];
    const leadText = leadParas.join(" ");
    const wiki = page.content_urls?.desktop?.page || "https://en.wikipedia.org/wiki/" + encodeURIComponent(title.replace(/ /g, "_"));
    const rawImg = page.thumbnail?.source || page.originalimage?.source || "";
    const img = rawImg.split("?")[0];

    const lead = E.composeLead({ positions: wd.positions || [], occupations: wd.occupations || [], description: page.description });
    const epithet = lead.lead || "";

    // Candidate sentences, in article order: lead first, then life chapters.
    const avoidEnts = E.negOrgs(extract);
    const leadSentences = leadParas.flatMap((p) => E.filterPara(p, title, 34, 420, 3));
    const chapters = E.cleanChapters(
      sections.filter((s) => !LEGACY_HEAD.test(s.title) && !VIEW_HEAD.test(s.title) && !WORK_HEAD.test(s.title)),
      { maxSentences: 3, name: title }
    );
    const lifeChapters = chapters
      .filter((c, i) => LIFE_HEAD.test(c.title) || i < 3)
      .slice(0, 6);

    // Lead paragraph: up to two clean, contribution-bearing sentences from the Wikipedia lead.
    const leadPick = leadSentences
      .filter((s) => E.contribScore(s) >= 3 && !E.CONTENTIOUS.test(s) && !/^(?:[A-Z][\w.’'-]*\s+){1,5}(?:is|was) an? /.test(s))
      .slice(0, 2);
    const fallbackLead = leadSentences.filter((s) => !E.CONTENTIOUS.test(s)).slice(0, 1);
    const leadPara = (leadPick.length ? leadPick : fallbackLead).join(" ");

    // Key contributions: offices and awards from Wikidata + contribution sentences from Wikipedia.
    const offices = lead.positions.filter((g) => g.rank >= 3).slice(0, 2);
    const contribs = [];
    for (const g of offices) contribs.push(`Served as ${E.positionPhrase(g)}${g.years ? " (" + g.years + ")" : ""}`);
    // The Wikipedia lead summarises what a person is known for: use it first, sections only to reach three.
    const notDup = (b) => !offices.some((g) => norm(b).includes(norm(g.label).slice(0, 18)));
    const usedInLead = new Set(leadPick.map((x) => norm(x).slice(0, 50)));
    const notInLeadPara = (b) => !Array.from(usedInLead).some((u) => norm(b).includes(u.slice(0, 40)) || u.includes(norm(b).slice(0, 40)));
    const fromLead = E.pickContributions(leadSentences, title, 8, avoidEnts).filter(notDup).filter(notInLeadPara);
    for (const b of fromLead) {
      if (contribs.length >= 5) break;
      contribs.push(b);
    }
    if (contribs.length < 3) {
      const pool = chapters.flatMap((c) => c.paras.flatMap((p) => E.splitSentences(p, 30, 420)));
      for (const b of E.pickContributions(pool, title, 6, avoidEnts).filter(notDup)) {
        if (contribs.length >= 4) break;
        if (!contribs.some((x) => norm(x).slice(0, 40) === norm(b).slice(0, 40))) contribs.push(b);
      }
    }
    const awardNames = (wd.awards || []).map((a) => a.label);
    if (awardNames.length && contribs.length < 6) {
      contribs.push(`Honours include ${E.joinList(awardNames.slice(0, 3))}${awardNames.length > 3 ? ` (${awardNames.length} recorded on Wikidata)` : ""}`);
    }
    if ((wd.works || []).length && contribs.length < 6) {
      contribs.push(`Notable works include ${E.joinList(wd.works.slice(0, 3))}`);
    }

    const works = [];
    for (const g of lead.positions.slice(0, 5)) works.push({ name: E.positionPhrase(g), kind: g.rank >= 3 ? "Office" : "Role", text: g.years ? g.years.replace(/–$/, "–present") : "" });
    for (const w of (wd.works || []).slice(0, 6)) works.push({ name: w, kind: "Work", text: "" });
    for (const a of (wd.awards || []).slice(0, 6)) works.push({ name: a.label, kind: "Award", text: a.year ? String(a.year) : "" });

    const occSet = new Set((wd.occupations || []).map((x) => norm(x)));
    const fieldsClean = (wd.fields || []).filter((f2) => !occSet.has(norm(f2)) && !/^(politics|politician)$/i.test(f2));

    // Life at a glance.
    const birth = wd.birth, death = wd.death;
    const by = birth?.year ?? null, dy = death?.year ?? null;
    const glance = [
      birth ? ["Born", [birth.text, wd.pob].filter(Boolean).join(" · ")] : null,
      death ? ["Died", [death.text, wd.pod].filter(Boolean).join(" · ")] : birth ? ["Status", "Living"] : null,
      eraFromYears(by, dy) ? ["Era", eraFromYears(by, dy)] : null,
      (wd.countries || []).length ? ["Citizenship", wd.countries.join(" · ")] : null,
      lead.occupations.length ? ["Roles", lead.occupations.join(" · ")] : null,
      (wd.schools || []).length ? ["Education", wd.schools.join(" · ")] : null,
      fieldsClean.length ? ["Field", fieldsClean.join(" · ")] : null,
    ].filter(Boolean);

    // Legacy and impact: legacy sections, else clean sentences that speak of influence.
    const legacySecs = sections.filter((s) => LEGACY_HEAD.test(s.title) && !E.negHead(s.title));
    let legacyParas = [];
    for (const s of legacySecs) {
      for (const p of s.paras.slice(0, 2)) {
        const k = E.filterPara(p, title, 30, 340, 3).filter((x) => !/["“”]/.test(x) && !E.CONTENTIOUS.test(x) && E.selfContained(x, title)).slice(0, 3);
        if (k.length) legacyParas.push(k.join(" "));
      }
    }
    if (!legacyParas.length) {
      const all = [...leadSentences, ...sections.filter((s) => s.title !== "Lead").flatMap((s) => s.paras.flatMap((p) => E.splitSentences(p, 30, 420)))];
      const impact = all.filter((s) => E.clean(s) && !/["“”]/.test(s) && !E.CONTENTIOUS.test(s) && !/^(?:On|In|At|By)\s+[A-Z][a-z]+\s+\d/.test(s) && E.selfContained(s, title) && s.length < 320 && /\b(legacy|inspired|impact|continues? to|named (?:in his|in her|after)|memorial|remembered|museum)\b/i.test(s)).map(E.strip).slice(0, 2);
      if (impact.length) legacyParas.push(impact.join(" "));
    }
    legacyParas = legacyParas.slice(0, 2);
    if (!legacyParas.length && awardNames.length) {
      legacyParas.push(`Recognised with ${awardNames.length} recorded award${awardNames.length > 1 ? "s" : ""} on Wikidata, including ${E.joinList(awardNames.slice(0, 3))}.`);
    }

    const quotes = (extra.quotes?.quotes || []).map((q) => ({ text: q, source: `${title}, attributed on Wikiquote` }));

    const sources = B.sourceLinks({ w: title.replace(/ /g, "_"), q: extra.qid, wq: quotes.length ? extra.quotes.page.replace(/ /g, "_") || true : false });
    if (wiki && wiki.includes("wikipedia.org")) sources[0] = { label: "Wikipedia", url: wiki, note: title };

    const related = relatedFromCatalog(extract + " " + (wd.occupations || []).join(" ") + " " + (wd.positions || []).map((p) => p.label).join(" "))
      .map((r) => ({ href: "/figure/" + r.slug, name: r.name, epithet: r.epithet }));

    const photo = img
      ? `<figure class="fig-hero-photo"><img src="${esc(img)}" alt="${esc(title)}" referrerpolicy="no-referrer" decoding="async" loading="eager" onerror="this.closest('figure')&&this.closest('figure').remove()" /><figcaption>${esc(title)} · Wikipedia</figcaption></figure>`
      : "";
    const cats = catsFromOccupation([lead.occupations.join(" "), epithet, (wd.fields || []).join(" ")].join(" "));

    return {
      model: {
        kicker: "Public record · not one of the 115",
        photo,
        badges: cats.map((c) => CAT[c] || c),
        name: title,
        epithet,
        actions: `<div class="fig-actions who-actions">
          <a class="btn btn-primary btn-sm" href="${esc(wiki)}" target="_blank" rel="noopener noreferrer">Wikipedia article</a>
          <button type="button" class="btn btn-ghost btn-sm" id="btn-share">Share</button>
          <a class="btn btn-ghost btn-sm" href="/#timeline">See the 115</a></div>`,
        lead: leadPara || (epithet ? epithet + "." : ""),
        glance,
        contributions: contribs.slice(0, 6),
        works: works.slice(0, 12),
        life: lifeChapters,
        legacy: { paras: legacyParas },
        quotes,
        sources,
        related,
        beforeSources: `<section class="bio-sec bio-grade" id="grade-status" hidden></section>`,
      },
      meta: { title, epithet, leadPara, lifespan: [birth?.text, death?.text].filter(Boolean).join(" – ") },
    };
  }

  function wikiPage(name, page, extra) {
    const { model, meta } = buildProfile(name, page, extra);
    setMeta(`${meta.title} — Humanity’s Atlas`, [meta.epithet, meta.leadPara].filter(Boolean).join(". ").replace(/\.\./g, "."));
    root.innerHTML = B.render(model);

    document.getElementById("btn-share")?.addEventListener("click", async () => {
      const url = location.href;
      if (navigator.share) {
        try {
          await navigator.share({ title: meta.title, text: meta.epithet, url });
          return;
        } catch (_) {}
      }
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied");
      } catch {
        prompt("Copy:", url);
      }
    });
    reportExplored(extra.qid);
  }

  // Fire-and-forget: the server grades, dedupes and counts. The client never sends a score.
  async function reportExplored(qid) {
    if (!qid || !/^Q\d{1,10}$/.test(qid)) return;
    try {
      const r = await fetch("/api/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qid }),
      });
      if (!r.ok) return;
      const j = await r.json();
      const box = document.getElementById("grade-status");
      if (!box || !j || typeof j.score !== "number") return;
      const verdict = j.community === "added" ? "Added to the <a href=\"/community\">Community timeline</a>."
        : j.community === "member" ? "On the <a href=\"/community\">Community timeline</a>."
        : j.community === "pending-store" ? "Qualifies for the <a href=\"/community\">Community timeline</a> (listing activates once the shared store is connected)."
        : j.community === "queued-cap" ? "Qualifies for the <a href=\"/community\">Community timeline</a>; the list is at its hourly cap and will pick this up shortly."
        : "Below the Community threshold. Grades use public, objective signals only.";
      box.hidden = false;
      box.innerHTML = `<h2>Community grade</h2><p class="bio-grade-line"><strong>${j.score}</strong> / 100 · threshold ${j.threshold} · ${verdict}</p><p class="bio-source-note">Scored server-side from Wikipedia and Wikidata: languages, recorded awards, offices and works, article depth, and long-run readership. Never politics or sentiment. <a href="/community#rubric">See the rubric</a>.</p>`;
    } catch {}
  }

  // ---- Search ---------------------------------------------------------------
  function isUsableWiki(summary, q) {
    if (!summary || summary.type === "disambiguation") return false;
    if (summary.title && /^list of /i.test(summary.title)) return false;
    const desc = (summary.description || "").toLowerCase();
    if (desc.includes("disambiguation")) return false;
    const extract = (summary.extract || "").trim();
    if (extract.length < 60) return false;
    const nq = norm(q).split(" ").filter((w) => w.length > 2);
    const hay = norm(summary.title + " " + extract);
    if (nq.length && !nq.every((w) => hay.includes(w))) return false;
    return true;
  }

  async function fetchWiki(q) {
    const sj = await getJson(
      "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=6&srprop=&format=json&origin=*&srsearch=" + encodeURIComponent(q)
    );
    const hits = (sj.query?.search || []).slice(0, 6);
    const sums = await Promise.all(
      hits.map(async (h) => {
        try {
          const s = await getJson("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(h.title.replace(/ /g, "_")), { Accept: "application/json" });
          return isUsableWiki(s, q) ? s : null;
        } catch {
          return null;
        }
      })
    );
    const usable = sums.filter(Boolean);
    if (!usable.length) return { page: null, other: null };
    const checks = await Promise.all(usable.slice(0, 4).map((s) => fetchIsHuman(s.wikibase_item)));
    const i = checks.findIndex((x) => x === true);
    if (i >= 0) return { page: usable[i], other: null };
    return { page: null, other: usable[0] };
  }

  async function run() {
    const q = queryFromUrl();
    const input = document.querySelector("form.who-search input[type='search']");
    if (input && q) input.value = q;

    if (!q) {
      setMeta("Search a name — Humanity’s Atlas", "Look up any person. The 115 curated figures, the Community timeline, or any documented life in the same neutral format.");
      root.innerHTML = `
        <p class="who-kicker">Lookup</p>
        <h1>Search a name</h1>
        <p class="who-epithet epithet">If they are among the 115, you get the curated Humanity’s Atlas page. Otherwise you get a profile composed from Wikipedia, Wikidata and Wikiquote in the same format: contributions first, neutral language, sources linked.</p>
        <div class="who-actions">
          <a class="btn btn-ghost" href="/recent">Recently explored</a>
          <a class="btn btn-ghost" href="/trending">Most explored this week</a>
          <a class="btn btn-ghost" href="/community">Community timeline</a>
        </div>`;
      return;
    }

    const local = pickCatalog(q);
    if (local) {
      catalogRedirect(local);
      return;
    }

    root.innerHTML = `<p class="who-loading">Opening the archive for <em>${esc(q)}</em>…</p>`;

    try {
      const { page: wiki, other } = await fetchWiki(q);
      if (!wiki) {
        notFoundPage(q, other ? "not-person" : "not-found", other?.title);
        return;
      }
      const title = wiki.title;
      const qid = wiki.wikibase_item;
      const [extractR, wdR, quotesR] = await Promise.allSettled([fetchExtract(title), fetchWikiData(qid), fetchQuotes(title)]);
      wikiPage(q, wiki, {
        qid,
        extract: extractR.status === "fulfilled" ? extractR.value : "",
        wd: wdR.status === "fulfilled" ? wdR.value : null,
        quotes: quotesR.status === "fulfilled" ? quotesR.value : { quotes: [], page: "" },
      });
    } catch {
      notFoundPage(q, "not-found");
    }
  }

  window.HumanitasWho = { buildProfile };
  run();
})();
