/**
 * /who — generated page for any searched name.
 * Catalog hit → figure page. Public encyclopedia + Wikidata + Wikiquote →
 * a Humanitas-shaped life in the same depth as the 115. Zero record → roast.
 */
(() => {
  const esc =
    window.HumanitasWhoSearch?.esc ||
    ((s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;"));
  const norm = window.HumanitasWhoSearch?.norm || ((s) => String(s).toLowerCase());
  const cleanQuery = window.HumanitasWhoSearch?.cleanQuery || ((s) => String(s || "").trim().slice(0, 80));
  const pickCatalog = window.HumanitasWhoSearch?.pickCatalog || (() => null);
  const CAT = (window.HUMANITAS && window.HUMANITAS.CATEGORY_LABELS) || {};
  const STATUS = (window.HUMANITAS && window.HUMANITAS.STATUS_LABELS) || {};

  const root = document.getElementById("who-root");
  if (!root) return;

  const SKIP_HEAD =
    /^(see also|references|notes|bibliography|external links|further reading|footnotes|citations|sources|works cited|notes and references|general and cited sources|primary sources|secondary sources|citations and footnotes|navboxes|categories|gallery|films|in popular culture|popular culture|ancestry|coats of arms|family tree|titles, styles|honours|decorations|arms)$/i;
  const LIFE_HEAD =
    /early|childhood|youth|family|origin|background|education|career|life|consulate|empire|campaign|expedition|later|exile|death|personal|marriage|military|political|revolution|presidency|papacy|ministry|rise|rule|reign|war|reform|science|work|invention|writing|poetry|art|activism|civil|trial|imprison|directory|hundred|helena|italian|egyptian|russian|peninsular|coronation|government|leader|command|battle|siege|conquest|emperor|kingship|queen|pharaoh|caliph|sultan|administration|office|tenure|final|illness|assassination|execution|captivity|return|restoration|abdication|anoint|formation|apprentice|training|discovery|research|ministry|pastorate|pontificate|sultanate|caliphate|chancell|premiership|governorship/i;
  const LEGACY_HEAD = /legacy|influence|assessment|reputation|aftermath|historiography|commemoration|historical reputation|memory of|impact/i;
  const WORK_HEAD = /^(works|publications|writings|compositions|inventions|filmography|discography|bibliography of|selected works|notable works)/i;
  const VIEW_HEAD = /philosoph|belief|politic(?:al)? views|religious views|thought|ideolog|doctrine|teaching|ethic|idea|religion|faith/i;
  const WAR_HEAD = /campaign|battle|war of|coalition|invasion|peninsular|russian campaign|egyptian campaign|italian campaign|siege/i;
  const ACT_VERB =
    /\b(founded|invented|discovered|wrote|authored|composed|painted|established|won|led|created|built|drafted|signed|abolished|introduced|enacted|emancipated|developed|formulated|proved|directed|commanded|negotiated|designed|published|translated|organized|organised|pioneered|coined|launched|opened|taught|promulgated|reorganized|reorganised|centralized|codified|issued|instituted|restored|crowned|unified|liberated|vaccinated|isolated|proclaimed|ratified|chartered|endowed|sculpted|choreographed|orchestrated)\b/i;
  const WORK_NAME =
    /\b(?:the )?([A-Z][\w'’-]+(?:\s+[A-Z][\w'’-]+){0,5}\s+(?:Code|Institute|University|Treaty|Constitution|Law|Method|Vaccine|Theory|Commission|Academy|Bank|Concordat|Lycée|Lyceum|System|Declaration|Proclamation|Manifesto|Canon|Principia|Edict|Charter|Amendment|Address|Temple|Pyramid|Cathedral|Mosque|Library|Hospital|League|Press|School|College|Society|Order|Medal|Prize))\b/g;
  const WORK_FIXED =
    /\b(Legion of Honou?r|Napoleonic Code|Code Napoléon|Civil Code|Bank of France|Red Cross|World Wide Web|Universal Declaration of Human Rights|Magna Carta|Gettysburg Address|Emancipation Proclamation|Concordat of \d{4})\b/g;
  const SKIP_OCC = /^(militant|art collector|human|person|sovereign|male|female|organism|individual|Q\d+)$/i;

  function queryFromUrl() {
    const params = new URLSearchParams(location.search);
    if (params.get("q")) return cleanQuery(params.get("q"));
    const parts = location.pathname.split("/").filter(Boolean);
    const i = parts.indexOf("who");
    if (i >= 0 && parts[i + 1]) {
      return cleanQuery(decodeURIComponent(parts[i + 1]).replace(/[-_]+/g, " "));
    }
    return "";
  }

  function hashName(s) {
    let h = 2166136261;
    const n = norm(s);
    for (let i = 0; i < n.length; i++) {
      h ^= n.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function pick(arr, seed, salt) {
    return arr[(seed + salt) % arr.length];
  }

  function setMeta(title, description) {
    document.title = title;
    const desc = description.slice(0, 160);
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
  }

  function sentences(text, min, max) {
    const lo = min == null ? 28 : min;
    const hi = max == null ? 460 : max;
    return String(text || "")
      .replace(/\s+/g, " ")
      .split(/(?<=[.?!])\s+(?=[A-Z“"‘])/)
      .map((s) => s.trim())
      .filter((s) => s.length >= lo && s.length <= hi);
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

  function yearFromIso(iso) {
    if (!iso) return null;
    const m = String(iso).match(/(-?\d{3,4})/);
    return m ? parseInt(m[1], 10) : null;
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
    if (b && typeof b === "object") { meta = b; d = b.deathYear; b = b.birthYear; }
    meta = meta || {};
    var circa = meta.datePrecision === "circa";
    var trad = meta.datePrecision === "traditional";
    if (b == null && d == null) return "";
    var bStr = formatYear(b, { circa: circa, alt: meta.birthYearAlt });
    if (d == null) return (trad ? "traditional " : "") + (bStr ? bStr + " – present" : "");
    if (b == null) return (trad ? "traditional " : "") + "d. " + formatYear(d, { circa: circa, alt: meta.deathYearAlt });
    var span = bStr + " – " + formatYear(d, { circa: circa, alt: meta.deathYearAlt });
    return trad ? "traditional " + formatYear(b, { alt: meta.birthYearAlt }) + " – " + formatYear(d, { alt: meta.deathYearAlt }) : span;
  }

  function ordinalCentury(y) {
    const c = Math.ceil(Math.abs(y) / 100);
    const suf = c % 10 === 1 && c !== 11 ? "st" : c % 10 === 2 && c !== 12 ? "nd" : c % 10 === 3 && c !== 13 ? "rd" : "th";
    return c + suf + " century" + (y < 0 ? " BCE" : "");
  }

  function eraFromYears(b, d) {
    if (b == null && d == null) return "";
    const y = b != null ? b : d;
    if (d != null && b != null && Math.ceil(Math.abs(b) / 100) !== Math.ceil(Math.abs(d) / 100)) {
      return ordinalCentury(b) + " – " + ordinalCentury(d);
    }
    return ordinalCentury(y);
  }

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
        line.length < 80 &&
        !/[.?!]$/.test(line) &&
        line.split(/\s+/).length <= 10 &&
        /^[A-Z0-9“"]/.test(line) &&
        !/^\d+$/.test(line);
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

  function catsFromOccupation(occ) {
    const t = (occ || "").toLowerCase();
    const cats = [];
    if (/philosoph|writer|poet|essay|playwright|novel|thinker|scholar of|author|historian/.test(t)) cats.push("philosophical");
    if (/scient|physic|chemist|mathemat|inventor|astronom|biolog|physician|engineer|comput|naturalist/.test(t)) cats.push("scientific");
    if (/politic|statesman|monarch|emperor|king|queen|president|legislat|diplomat|ruler|consul|pharaoh/.test(t)) cats.push("political");
    if (/military|soldier|general|admiral|officer|commander/.test(t)) cats.push("military");
    if (/humanitar|activist|nurse|reformer|abolition|philanthrop|social worker/.test(t)) cats.push("humanitarian");
    if (/saint|prophet|theolog|cleric|monk|nun|imam|rabbi|priest|mystic|religious/.test(t)) cats.push("spiritual");
    if (!cats.length && t) cats.push("philosophical");
    return uniq(cats);
  }

  function roastPage(name, reason) {
    const seed = hashName(name);
    const n = esc(name);
    const openers = [
      `The phylogeny keeps 115 chairs. <em>${n}</em> was offered a pamphlet and the door.`,
      `We ran <em>${n}</em> through 4,600 years of law, faith, science, and liberation. The archive answered in eleven milliseconds. That is not a compliment.`,
      `Hammurabi left a code. Nightingale left a profession. <em>${n}</em> left the search bar slightly warmer.`,
      `Greatness leaves residue: vaccines, republics, poems, trees. <em>${n}</em> left a query string.`,
      `The clerks opened the ledger. Lincoln was there. Hypatia was there. <em>${n}</em> was a blank line with confidence.`,
    ];
    const middles = [
      `Checked: the Code of Hammurabi — no. The Gettysburg Address — no. The Green Belt Movement — no. A group chat from last Tuesday — possibly.`,
      `If consequence were a mountain, <em>${n}</em> is the gift shop at the parking lot, closed, lights off, a handwritten sign that says “back never.”`,
      `History is a long hallway of statues. <em>${n}</em> is the fire extinguisher. Necessary in some buildings. Not this one.`,
      `We do not say <em>${n}</em> never lived. We say the species would not notice the difference. That is a rarer kind of immortality: total stealth.`,
      `Some names move armies. Some names move theorems. <em>${n}</em> moved the cursor and pressed Enter. Bold. Insufficient.`,
    ];
    const closers = [
      `Come back when you have a law, a hospital, a theorem, a crossing, or a tree. Until then the 115 will keep the lights on.`,
      `The timeline is not a yearbook. It is a short list of people who altered the weather of the species. Weather report for <em>${n}</em>: indoor.`,
      `There is still time. Malala was a child with a book. The door is not locked. It is simply not automatic.`,
      `If this stings, good. Sting is the first evidence you might yet do something. The archive is patient. It is not sentimental.`,
    ];
    const stamps = [
      "Finding: not in the 115. Not in the public encyclopedia. Filed under silence.",
      "Finding: no law, no lab, no liberation, no lyric that the species kept.",
      "Finding: the record did not sit up. The record did not blink.",
    ];
    if (reason === "wiki-miss") {
      stamps.unshift("Even the encyclopedia shrugged. That is a dual rejection. Prestigious, in a way.");
    }

    setMeta(
      `${name} is not in Humanity’s Atlas`,
      `The Humanity’s Atlas archive has no record of ${name}. The phylogeny of greatness did not keep a chair.`
    );

    root.innerHTML = `
      <p class="who-kicker who-kicker-roast">Archive reply · zero record</p>
      <p class="who-stamp">${pick(stamps, seed, 3)}</p>
      <h1>${n}</h1>
      <p class="epithet who-epithet">Not important enough — and we can say that in complete sentences.</p>
      <div class="who-roast">
        <p>${pick(openers, seed, 1)}</p>
        <p>${pick(middles, seed, 7)}</p>
        <p>${pick(closers, seed, 13)}</p>
      </div>
      <ol class="who-log" aria-label="Search log">
        <li>Humanity’s Atlas 115 — no match</li>
        <li>Public encyclopedia — ${reason === "wiki-miss" ? "no biographical page" : "no usable record"}</li>
        <li>Consequence residue — none filed</li>
        <li>Recommendation — search a name that dented the species</li>
      </ol>
      <div class="who-actions">
        <a class="btn btn-primary" href="/#timeline">See the 115</a>
        <a class="btn btn-ghost" href="/#thesis">Read the thesis</a>
      </div>
    `;
  }

  function catalogRedirect(f) {
    location.replace("/figure/" + f.slug);
  }

  function wikiVals(rows, key) {
    return uniq(rows.map((r) => r[key]?.value).filter(Boolean));
  }

  function splitConcat(s) {
    return String(s || "")
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  async function sparql(query) {
    const url = "https://query.wikidata.org/sparql?format=json&query=" + encodeURIComponent(query);
    const r = await fetch(url, { headers: { Accept: "application/sparql-results+json" } });
    if (!r.ok) return [];
    const j = await r.json();
    return j.results?.bindings || [];
  }

  async function fetchExtract(title) {
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&exsectionformat=plain&redirects=1&format=json&origin=*&titles=" +
      encodeURIComponent(title);
    const r = await fetch(url);
    if (!r.ok) return "";
    const j = await r.json();
    const page = Object.values(j.query?.pages || {})[0];
    return page?.extract || "";
  }

  async function fetchWikiData(qid) {
    if (!qid || !/^Q\d+$/i.test(qid)) return null;
    const item = "wd:" + qid;
    const [coreRows, extraRows] = await Promise.all([
      sparql(`SELECT ?birth ?death ?pobLabel ?podLabel ?countryLabel ?occupationLabel ?workLabel ?awardLabel ?fieldLabel WHERE {
        BIND(${item} AS ?item)
        OPTIONAL { ?item wdt:P569 ?birth }
        OPTIONAL { ?item wdt:P570 ?death }
        OPTIONAL { ?item wdt:P19 ?pob }
        OPTIONAL { ?item wdt:P20 ?pod }
        OPTIONAL { ?item wdt:P27 ?country }
        OPTIONAL { ?item wdt:P106 ?occupation }
        OPTIONAL { ?item wdt:P800 ?work }
        OPTIONAL { ?item wdt:P166 ?award }
        OPTIONAL { ?item wdt:P101 ?field }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      } LIMIT 80`),
      sparql(`SELECT ?positionLabel ?schoolLabel ?movementLabel WHERE {
        BIND(${item} AS ?item)
        OPTIONAL { ?item wdt:P39 ?position }
        OPTIONAL { ?item wdt:P69 ?school }
        OPTIONAL { ?item wdt:P135 ?movement }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      } LIMIT 40`),
    ]);
    const rows = coreRows;
    if (!rows.length && !extraRows.length) return null;
    return {
      birth: yearFromIso(rows[0]?.birth?.value),
      death: yearFromIso(rows[0]?.death?.value),
      pob: wikiVals(rows, "pobLabel")[0] || "",
      pod: wikiVals(rows, "podLabel")[0] || "",
      countries: wikiVals(rows, "countryLabel").slice(0, 4),
      occupations: wikiVals(rows, "occupationLabel")
        .filter((o) => !SKIP_OCC.test(o))
        .filter((o, _i, arr) => {
          const t = o.toLowerCase();
          if (/army officer|military personnel/.test(t) && arr.some((x) => /military leader/.test(x.toLowerCase()))) return false;
          return true;
        })
        .slice(0, 3),
      works: wikiVals(rows, "workLabel").slice(0, 10),
      awards: wikiVals(rows, "awardLabel").slice(0, 6),
      fields: wikiVals(rows, "fieldLabel").slice(0, 6),
      positions: wikiVals(extraRows, "positionLabel")
        .filter((p) => p.length > 3 && p.length < 80)
        .sort((a, b) => rankPosition(b) - rankPosition(a))
        .slice(0, 6),
      schools: wikiVals(extraRows, "schoolLabel").slice(0, 4),
      movements: wikiVals(extraRows, "movementLabel").slice(0, 4),
    };
  }

  async function fetchQuotes(title) {
    const url =
      "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&explaintext=1&exsectionformat=plain&redirects=1&format=json&origin=*&titles=" +
      encodeURIComponent(title);
    const r = await fetch(url);
    if (!r.ok) return [];
    const j = await r.json();
    const page = Object.values(j.query?.pages || {})[0];
    if (!page || page.missing != null) return [];
    const extract = page.extract || "";
    const lines = extract.split(/\n/).map((l) => l.replace(/^['"“”]+|['"“”]+$/g, "").trim());
    const out = [];
    let skip = false;
    for (const line of lines) {
      if (/^(about |misattributed|disputed|see also|external|references|from wikipedia)/i.test(line)) {
        skip = /^(about |misattributed|disputed)/i.test(line);
        continue;
      }
      if (skip) continue;
      if (line.length < 32 || line.length > 280) continue;
      if (/^(quotes|attributed|from:|source:|wikipedia|wikiquote|castilian|french|italian|german|latin)/i.test(line)) continue;
      if (/^\d+$/.test(line) || /^https?:/i.test(line)) continue;
      if (!/[a-z]/.test(line)) continue;
      if (isCitationLine(line)) continue;
      out.push(line);
      if (out.length >= 8) break;
    }
    return out;
  }

  function isCitationLine(line) {
    return (
      /quoted in|as quoted|as translated|letter to|edited by|\bvol\.|\bp\.\s*\d+|precis des|selection from|boyhood and youth/i.test(line) ||
      /^(on ['"“]|letter to|from |speech to|variant )/i.test(line) ||
      /\brefers to\b|variant translation/i.test(line) ||
      /\(\d{3,4}\),\s*p\./i.test(line)
    );
  }

  function quoteScore(q) {
    if (isCitationLine(q)) return -1;
    if (/francs|send me \d/i.test(q)) return 1;
    if (/[.?!]["”]?$/.test(q) && q.length > 40 && q.length < 220) return 4;
    return 2;
  }

  function quotesFromExtract(extract) {
    const out = [];
    const re = /[“"]([^”"]{36,240})[”"]/g;
    let m;
    while ((m = re.exec(extract)) && out.length < 4) {
      const q = m[1].replace(/\s+/g, " ").trim();
      if (/[a-z]/.test(q) && !/wikipedia/i.test(q) && !isCitationLine(q)) out.push(q);
    }
    return out;
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
    return uniq(hits.map((f) => f.slug))
      .map((slug) => figs.find((f) => f.slug === slug))
      .filter(Boolean)
      .slice(0, 6);
  }

  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function rankPosition(p) {
    const t = String(p || "").toLowerCase();
    if (/emperor|pharaoh|caliph|pope|sultan/.test(t)) return 6;
    if (/first consul|president|chancellor|prime minister|founder/.test(t)) return 5;
    if (/king|queen|monarch/.test(t)) return 3;
    return 1;
  }

  function compress(para, maxSent, maxChars) {
    const bits = sentences(para, 28, 480).slice(0, maxSent || 3);
    const out = [];
    let n = 0;
    const cap = maxChars || 560;
    for (const s of bits) {
      if (n + s.length > cap && out.length) break;
      out.push(s);
      n += s.length;
    }
    return out.join(" ");
  }

  function punchy(s, name) {
    let t = String(s || "").replace(/\s+/g, " ").trim();
    t = t.replace(/^(?:On|In|At|By)\s+\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?,?\s+/i, "");
    t = t.replace(
      /^(?:In|On)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4},?\s+/i,
      ""
    );
    t = t.replace(
      new RegExp(`^(?:${escapeRe(name)}(?:'s)?|Bonaparte(?:'s)?|Napoleon I|He|She|They)\\s+`, "i"),
      ""
    );
    t = t.replace(/^(was|were|is|are)\s+/i, "");
    if (!t || /^(then swore|swore an oath)/i.test(t)) return "";
    t = t.charAt(0).toUpperCase() + t.slice(1);
    t = t.replace(/\.$/, "");
    if (t.length > 148) {
      const cut = t.slice(0, 145);
      const sp = cut.lastIndexOf(" ");
      t = (sp > 70 ? cut.slice(0, sp) : cut) + "…";
    }
    return t;
  }

  function actForWork(w, hay) {
    const re = new RegExp(
      `\\b(founded|established|instituted|promulgated|created|introduced|signed|issued|enacted|implemented|imposed|opened|designed|wrote|composed|concluded|restored)\\b[^.!]{0,60}${escapeRe(w)}`,
      "i"
    );
    const m = hay.match(re);
    if (m) {
      const verb = m[1][0].toUpperCase() + m[1].slice(1);
      return verb + " the " + w.replace(/^the /i, "");
    }
    const name = w.replace(/^the /i, "");
    if (/code|law|constitution/i.test(name)) return "Promulgated the " + name;
    if (/concordat|treaty/i.test(name)) return "Signed the " + name;
    if (/university|academy|school|lyc/i.test(name)) return "Founded the " + name;
    if (/legion|order|medal/i.test(name)) return "Instituted the " + name;
    return "Left " + name + " in the public record";
  }

  function harvestWorks(lead, sections, legacyText, wd) {
    const works = [...(wd.works || [])];
    const blob = lead + " " + legacyText + " " + sections.map((s) => s.title + " " + s.paras.join(" ")).join(" ");
    const pushMatch = (re) => {
      const copy = new RegExp(re.source, re.flags);
      let m;
      while ((m = copy.exec(blob))) {
        const w = (m[1] || m[0]).replace(/^the /i, "").trim();
        if (w.length > 6 && w.length < 80) works.push(w);
      }
    };
    pushMatch(WORK_NAME);
    pushMatch(WORK_FIXED);
    for (const s of sections) {
      if (!WORK_HEAD.test(s.title)) continue;
      for (const p of s.paras.slice(0, 3)) {
        p.split(/[;•\n]|(?<=\.)\s+/).forEach((bit) => {
          const t = bit.replace(/^\d+\.\s*/, "").replace(/\.$/, "").trim();
          if (t.length > 8 && t.length < 72 && /^[A-Z]/.test(t) && t.split(/\s+/).length <= 8) works.push(t);
        });
      }
    }
    const cleaned = uniq(works).slice(0, 12);
    return cleaned.filter(
      (w, i) => !cleaned.some((other, j) => j !== i && norm(other).includes(norm(w)) && other.length > w.length)
    );
  }

  function describeWork(name, hay) {
    const re = new RegExp(`(?:^|[.?!]\\s+)([A-Z][^.?!]{0,140}${escapeRe(name)}[^.?!]{0,160}[.?!])`);
    const m = hay.match(re);
    if (m) {
      let s = m[1].replace(/\s+/g, " ").trim();
      if (s.length > 220) s = s.slice(0, 217) + "…";
      return s;
    }
    return "Named in the public encyclopedia as a work, office, or institution they left in the world.";
  }

  function theyCreated(w, hay) {
    const around = describeWork(w, hay).toLowerCase();
    if (/elected (a )?member|joined|admitted to|fellow of|was a member/.test(around)) return false;
    return true;
  }

  function pickLifeChapters(sections) {
    const chapters = [];
    let warCount = 0;
    for (const s of sections) {
      if (s.title === "Lead") continue;
      if (SKIP_HEAD.test(s.title) || LEGACY_HEAD.test(s.title) || VIEW_HEAD.test(s.title) || WORK_HEAD.test(s.title)) continue;
      const war = WAR_HEAD.test(s.title);
      if (war) {
        warCount += 1;
        if (warCount > 2) continue;
      }
      if (LIFE_HEAD.test(s.title) || chapters.length === 0) {
        chapters.push(s);
      }
      if (chapters.length >= 10) break;
    }
    return chapters;
  }

  function composeEpithet(desc, wd, works) {
    const d = String(desc || "")
      .replace(/\.$/, "")
      .trim();
    if (d && d.length <= 92 && !/wikimedia|article about/i.test(d)) return d;
    const pos = (wd.positions || []).find((p) => /emperor|president|king|queen|pope|caliph|sultan|pharaoh|consul|chancellor|prime minister|founder/i.test(p));
    if (pos) return pos;
    if ((wd.positions || [])[0] && wd.positions[0].length < 70) return wd.positions[0];
    const occ = (wd.occupations || [])[0];
    const work = works[0];
    if (occ && work) return occ + " · " + work;
    return occ || "A life the public record kept";
  }

  function composeSummary(title, desc, lead, lifespan, wd) {
    const life = lifespan ? ` (${lifespan})` : "";
    const where = wd.pob ? `, beginning in ${wd.pob}` : "";
    const frame = `${title}${life} is kept by the public encyclopedia as ${String(desc || "a recorded life").replace(/\.$/, "")}${where}.`;
    const epithetBit = norm(String(desc || "")).slice(0, 24);
    const facts = sentences(lead, 40, 360).filter((s) => {
      if (/born |di buonaparte|\d{1,2} august|\d{1,2} may 1821/i.test(s)) return false;
      if (epithetBit && norm(s).includes(epithetBit)) return false;
      return true;
    });
    const act = facts.find((s) => ACT_VERB.test(s)) || facts[0] || "";
    return [frame, act].filter(Boolean).join(" ");
  }

  function composePhilosophy(title, wd, quotes, viewParas, lead, cats, works, accomplishments) {
    const n = title;
    const occ = (wd?.occupations || []).slice(0, 2).join(" and ") || "a recorded public life";
    const work = works[0];
    const principles = [];

    for (const q of quotes.slice(0, 4)) {
      const short = q.length > 110 ? q.slice(0, 107) + "…" : q;
      principles.push(short);
    }
    for (const p of viewParas) {
      for (const s of sentences(p, 40, 180).slice(0, 2)) {
        if (principles.length >= 6) break;
        principles.push(s.replace(/^(The |He |She |They )/, "").replace(/\.$/, ""));
      }
    }
    if (work && /code|law|constitution|charter|edict/i.test(work)) {
      principles.push("Write the law so strangers can still open it");
    }
    if (work && /vaccine|hospital|institute|method/i.test(work)) {
      principles.push("Leave a method that keeps bodies alive after you are gone");
    }
    if (work && /temple|university|academy|school|lyc/i.test(work)) {
      principles.push("Build a house of learning that outlasts the builder");
    }
    for (const a of accomplishments.slice(0, 4)) {
      if (principles.length >= 6) break;
      const m = a.match(ACT_VERB);
      if (!m) continue;
      principles.push(m[1][0].toUpperCase() + m[1].slice(1) + " as a public act the record still names");
    }
    if (!principles.length) {
      principles.push("Leave residue the encyclopedia is forced to keep");
      principles.push("Consequence over celebrity");
    }

    const cat = cats[0] || "";
    let view = `The public record keeps ${n} as ${occ}. Humanity’s Atlas does not invent a school they never wrote. It reads what they left in the world, and the cost the same record names.`;
    let operate = `Study the residue: the acts, the works, the sentences they actually spoke. Measure them the way the 115 are measured — did the weather of the species change?`;
    if (cat === "scientific") {
      view = `The record treats ${n} as someone who made nature more legible. That is a moral claim as much as a technical one: the world can be known, and knowing it can spare people.`;
      operate = `Fund the method, not the myth. Keep the notebook. Publish the result. Refuse to let power rewrite the measurement.`;
    } else if (cat === "political") {
      view = `Power is a tool that either publishes law or hides it. The record of ${n} is a ledger of which they chose, and who paid.`;
      operate = `Ask of every ruler what Hammurabi asked of himself: was justice written down, and were the strong restrained?`;
    } else if (cat === "military") {
      view = `${n} moved armies. The record is not shy about victory or about the bodies it took. Humanity’s Atlas reads both columns.`;
      operate = `Do not confuse tactics with civilization. A campaign is residue; a code, a hospital, a school is what still stands.`;
    } else if (cat === "spiritual") {
      view = `The record places ${n} inside a claim about the soul and the neighbor. Humanity’s Atlas does not baptize them into the 115 by force. It asks whether the teaching still binds.`;
      operate = `Test the teaching by the fruit the encyclopedia actually kept: mercy, law, or spectacle.`;
    } else if (cat === "humanitarian") {
      view = `${n} is kept because suffering was not abstract to them. The record is a trail of institutions, refusals, and people they would not leave behind.`;
      operate = `Build the clinic, the school, the crossing. Sentiment without infrastructure is a speech.`;
    }
    if (work) {
      view += ` The name the living still have to walk through is ${work}.`;
    }
    const quoted = quotes[0];
    if (quoted) {
      operate += ` Their own sentence, still on the public record: “${quoted.length > 140 ? quoted.slice(0, 137) + "…" : quoted}”`;
    }

    return { principles: uniq(principles).slice(0, 6), view, operate };
  }

  function composeToday(cats, works, title) {
    const bullets = [];
    if (cats.includes("political")) bullets.push("The question of written law versus personal will did not retire with them.");
    if (cats.includes("scientific")) bullets.push("Method still outranks myth, and every lab inherits that fight.");
    if (cats.includes("military")) bullets.push("Victory is easy to celebrate. The body count is the other column of the same page.");
    if (cats.includes("spiritual")) bullets.push("A teaching is alive only while it still binds the neighbor, not the fan club.");
    if (cats.includes("humanitarian")) bullets.push("Mercy that does not become an institution is a speech that evaporates.");
    if (cats.includes("philosophical")) bullets.push("Ideas remain weapons. The record asks whether theirs still cut toward dignity.");
    if (works[0]) bullets.push(`${works[0]} is still a thing the living have to walk through.`);
    if (bullets.length < 2) bullets.push(`Fame is cheap. The encyclopedia’s continued labor on ${title} is the test.`);
    return uniq(bullets).slice(0, 3);
  }

  function composeLegacyLine(title, cats, works, wd) {
    const work = works[0];
    const cat = cats[0] || "";
    if (work && /code|law|constitution/i.test(work)) {
      return `${title} remains a test of whether power can leave a law that outlives the army.`;
    }
    if (cat === "scientific") return `${title} left a way of seeing that later hands still have to use.`;
    if (cat === "spiritual") return `The teaching associated with ${title} is still a claim on the living, or it is a museum.`;
    if (cat === "humanitarian") return `${title} is kept because an institution of care still bears the fingerprint.`;
    if (cat === "military") return `Campaigns end. What Humanity’s Atlas weighs is whether anything civilizing stood when the smoke lifted.`;
    if (cat === "political") return `Rule is residue. The record of ${title} is whether the office became more than a name.`;
    return `The public record still bothers to keep ${title}. That labor is the first fact.`;
  }

  function wikiPage(name, page, extra) {
    const title = page.title || name;
    const desc = page.description || extra.wd?.occupations?.[0] || extra.wd?.positions?.[0] || "A life with a public record.";
    const extract = extra.extract || page.extract || "";
    const sections = parseSections(extract);
    const lead = (sections.find((s) => s.title === "Lead")?.paras || []).join(" ");
    const rawImg = page.thumbnail?.source || page.originalimage?.source || "";
    const img = rawImg.split("?")[0];
    const wiki = page.content_urls?.desktop?.page || "";
    const wd = extra.wd || {};
    const birth = wd.birth;
    const death = wd.death;
    const lifespan = formatLifespan(birth, death);
    const era = eraFromYears(birth, death);
    const region = [wd.pob, ...(wd.countries || [])].filter(Boolean).slice(0, 2).join(" / ");
    const civ = (wd.countries || [])[0] || "";
    const occ = (wd.occupations || []).join(" · ");
    const catSeed = [occ, desc, (wd.positions || []).join(" "), (wd.fields || []).join(" ")].join(" ");
    const cats = catsFromOccupation(catSeed);
    const badges = cats.map((c) => `<span class="badge">${esc(CAT[c] || c)}</span>`).join(" ");

    const legacyParas = [];
    for (const s of sections) {
      if (LEGACY_HEAD.test(s.title)) legacyParas.push(...s.paras.slice(0, 2).map((p) => compress(p, 3, 520)));
    }
    if (!legacyParas.length) {
      const last = sections.filter((s) => s.title !== "Lead").slice(-2);
      for (const s of last) legacyParas.push(compress(s.paras[0] || "", 2, 420));
    }

    const viewParas = [];
    for (const s of sections) {
      if (VIEW_HEAD.test(s.title)) viewParas.push(...s.paras.slice(0, 3));
    }

    const works = harvestWorks(lead, sections, legacyParas.join(" "), wd).filter((w) => theyCreated(w, extract + " " + lead));
    const hay = extract + " " + lead;

    const actPool = [];
    for (const s of sections) {
      const pool = s.title === "Lead" || LIFE_HEAD.test(s.title) || WORK_HEAD.test(s.title) || /reform|government|law|code/i.test(s.title);
      if (!pool) continue;
      for (const p of s.paras.slice(0, 4)) {
        for (const sent of sentences(p, 32, 400)) {
          WORK_NAME.lastIndex = 0;
          WORK_FIXED.lastIndex = 0;
          if (ACT_VERB.test(sent) || WORK_NAME.test(sent) || WORK_FIXED.test(sent)) actPool.push(sent);
        }
      }
    }
    const scoredActs = uniq(actPool).sort((a, b) => {
      const weight = (s) => {
        if (/\b(established|enacted|invented|discovered|founded|abolished|wrote|composed|formulated|pioneered|promulgated|codified|issued|proclaimed)\b/i.test(s)) return 4;
        WORK_FIXED.lastIndex = 0;
        if (WORK_FIXED.test(s) || /code|constitution|vaccine|declaration|proclamation/i.test(s)) return 5;
        if (/\b(won|led|commanded|sold|defeated|crowned)\b/i.test(s)) return 1;
        return 2;
      };
      return weight(b) - weight(a);
    });

    const accomplishments = uniq([
      ...(wd.positions || [])
        .filter((p) => /emperor|president|consul|founder|pharaoh|caliph|pope|chancellor|prime minister/i.test(p))
        .sort((a, b) => rankPosition(b) - rankPosition(a))
        .slice(0, 2)
        .map((p) => "Held the office of " + p),
      ...works.slice(0, 5).map((w) => actForWork(w, hay)),
      ...scoredActs.slice(0, 8).map((s) => punchy(s, title)).filter(Boolean),
      ...(wd.schools || []).slice(0, 1).map((s) => "Formed at " + s),
      ...(wd.awards || []).slice(0, 1).map((a) => "Awarded " + a),
    ]).slice(0, 8);

    const quotes = uniq([...(extra.quotes || []), ...quotesFromExtract(extract)])
      .filter((q) => quoteScore(q) > 0)
      .sort((a, b) => quoteScore(b) - quoteScore(a))
      .slice(0, 5);
    const epithet = composeEpithet(desc, wd, works);
    const summaryText = composeSummary(title, epithet, lead, lifespan, wd);
    const phil = composePhilosophy(title, wd, quotes, viewParas, lead, cats, works, accomplishments);
    const related = relatedFromCatalog(extract + " " + (wd.occupations || []).join(" ") + " " + (wd.positions || []).join(" "));
    const today = composeToday(cats, works, title);
    const legacyLine = composeLegacyLine(title, cats, works, wd);

    const origin = (() => {
      const born = wd.pob ? ` in ${wd.pob}` : "";
      const school = (wd.schools || [])[0] ? ` Formation includes ${(wd.schools || [])[0]}.` : "";
      return `${title}${lifespan ? " (" + lifespan + ")" : ""} enters the public record${born} as ${epithet}.${school}`;
    })();

    const chapters = pickLifeChapters(sections);
    const lifeHtml = [
      `<p>${esc(origin)}</p>`,
      ...chapters.map((s) => {
        const paras = s.paras.slice(0, 2).map((p) => compress(p, 3, 520)).filter(Boolean);
        if (!paras.length) return "";
        return `<h3>${esc(s.title)}</h3>${paras.map((p) => `<p>${esc(p)}</p>`).join("")}`;
      }),
    ].join("");

    const photo = img
      ? `<figure class="fig-hero-photo"><img src="${esc(img)}" alt="${esc(title)}" referrerpolicy="no-referrer" decoding="async" loading="eager" onerror="this.closest('figure')&&this.closest('figure').remove()" /><figcaption>${esc(title)}${epithet ? " · " + esc(epithet) : ""} · Wikipedia</figcaption></figure>`
      : "";

    const quoteHtml = quotes
      .slice(0, 6)
      .map((q) => `<blockquote class="quote-block"><p>“${esc(q)}”</p><footer>— ${esc(title)}, public record / Wikiquote</footer></blockquote>`)
      .join("");

    const creationHtml = works
      .slice(0, 8)
      .map((w) => {
        const standing = /code|law|university|academy|bank|institute|charter|declaration|web|vaccine|method|lyc|legion|honou?r/i.test(w)
          ? "stands"
          : "transformed";
        return `<div class="creation-card"><h3>${esc(w)}</h3><span class="badge badge-status ${standing}">${esc(STATUS[standing] || standing)}</span><p>${esc(describeWork(w, hay))}</p></div>`;
      })
      .join("");

    const relatedHtml = related
      .map(
        (r) =>
          `<a class="related-btn" href="/figure/${esc(r.slug)}"><span><strong>${esc(r.name)}</strong><span>${esc(r.epithet || "")}</span></span><span>→</span></a>`
      )
      .join("");

    const metaBits = [
      lifespan ? ["Lived", lifespan] : null,
      era ? ["Era", era] : null,
      region ? ["Region", region] : null,
      civ ? ["Civilization", civ] : null,
      occ ? ["Occupation", occ] : null,
      (wd.positions || [])[0] ? ["Office", wd.positions.slice(0, 2).join(" · ")] : null,
      (wd.fields || []).length ? ["Field", wd.fields.join(" · ")] : null,
    ].filter(Boolean);

    setMeta(`${title} — Humanity’s Atlas lookup`, (summaryText || epithet).slice(0, 160));

    root.innerHTML = `
      <p class="who-kicker">Generated life · public record · not one of the 115</p>
      ${photo}
      <div class="tl-badges">${badges}</div>
      <h1>${esc(title)}</h1>
      <p class="epithet who-epithet">${esc(epithet)}</p>
      <dl class="fig-meta">
        ${metaBits.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl>
      <div class="fig-actions who-actions">
        ${wiki ? `<a class="btn btn-primary btn-sm" href="${esc(wiki)}" target="_blank" rel="noopener noreferrer">Encyclopedia article</a>` : ""}
        <button type="button" class="btn btn-ghost btn-sm" id="btn-share">Share</button>
        <a class="btn btn-ghost btn-sm" href="/#timeline">See the 115</a>
      </div>
      <section><p class="who-summary">${esc(summaryText)}</p></section>
      ${
        accomplishments.length
          ? `<section><h2>Greatest accomplishments</h2><ol class="accomplishments-list">${accomplishments
              .map((a) => `<li>${esc(a)}</li>`)
              .join("")}</ol></section>`
          : ""
      }
      <section class="who-life">
        <h2>Historical life</h2>
        ${lifeHtml}
      </section>
      <section class="who-phil">
        <h2>Philosophy</h2>
        <p><strong>View of humanity</strong><br/>${esc(phil.view)}</p>
        <p><strong>How we should operate</strong><br/>${esc(phil.operate)}</p>
        <p><strong>Core principles</strong></p>
        <ul>${phil.principles.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <p class="who-phil-note">A Humanity’s Atlas reading of documented acts, offices, works, and quoted speech. Not a private diary we invented, and not a chair among the 115.</p>
      </section>
      ${quoteHtml ? `<section><h2>Words that endure</h2>${quoteHtml}</section>` : ""}
      ${creationHtml ? `<section><h2>Creations</h2>${creationHtml}</section>` : ""}
      <section>
        <h2>Legacy</h2>
        <p class="who-legacy-line">${esc(legacyLine)}</p>
        ${legacyParas.filter(Boolean).slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("")}
      </section>
      ${
        today.length
          ? `<section class="who-today"><h2>Why it still matters</h2><ul>${today
              .map((t) => `<li>${esc(t)}</li>`)
              .join("")}</ul></section>`
          : ""
      }
      ${relatedHtml ? `<section><h2>Related figures</h2><div class="related-list">${relatedHtml}</div></section>` : ""}
      <p class="who-source">Composed for Humanity’s Atlas from the public encyclopedia (Wikipedia), structured facts (Wikidata), and quoted speech (Wikiquote) where those pages exist. This is not a seat among the 115. It does not invent a biography they never lived.</p>
    `;

    document.getElementById("btn-share")?.addEventListener("click", async () => {
      const url = location.href;
      if (navigator.share) {
        try {
          await navigator.share({ title, text: summaryText, url });
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
  }

  function isUsableWiki(summary, q) {
    if (!summary || summary.type === "disambiguation") return false;
    if (summary.title && /^list of /i.test(summary.title)) return false;
    const desc = (summary.description || "").toLowerCase();
    if (desc.includes("disambiguation")) return false;
    const extract = (summary.extract || "").trim();
    if (extract.length < 60) return false;
    const nq = norm(q).split(" ").filter((w) => w.length > 2);
    const hay = norm(summary.title + " " + extract);
    if (nq.length && !nq.some((w) => hay.includes(w))) return false;
    return true;
  }

  async function fetchWiki(q) {
    const searchUrl =
      "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=8&srprop=&format=json&origin=*&srsearch=" +
      encodeURIComponent(q);
    const sr = await fetch(searchUrl);
    if (!sr.ok) throw new Error("search");
    const sj = await sr.json();
    const hits = sj.query?.search || [];
    for (const hit of hits) {
      const title = hit.title;
      if (!title) continue;
      const sumUrl =
        "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_"));
      const r = await fetch(sumUrl, { headers: { Accept: "application/json" } });
      if (!r.ok) continue;
      const summary = await r.json();
      if (isUsableWiki(summary, q)) return summary;
    }
    return null;
  }

  async function run() {
    const q = queryFromUrl();
    const input = document.querySelector("form.who-search input[type='search']");
    if (input && q) input.value = q;

    if (!q) {
      setMeta("Search a name — Humanity’s Atlas", "Look up any name. The 115, the public record, or a polite rejection.");
      root.innerHTML = `
        <p class="who-kicker">Lookup</p>
        <h1>Name someone.</h1>
        <p class="who-epithet">If they are in the 115, you get the Humanity’s Atlas page. If the encyclopedia kept them, you get a generated life in the same shape. If neither did, you get the jokes.</p>
      `;
      return;
    }

    const local = pickCatalog(q);
    if (local) {
      catalogRedirect(local);
      return;
    }

    root.innerHTML = `<p class="who-loading">Opening the archive for <em>${esc(q)}</em>…</p>`;

    try {
      const wiki = await fetchWiki(q);
      if (!wiki) {
        roastPage(q, "wiki-miss");
        return;
      }
      const title = wiki.title;
      const qid = wiki.wikibase_item;
      const [extractR, wdR, quotesR] = await Promise.allSettled([
        fetchExtract(title),
        fetchWikiData(qid),
        fetchQuotes(title),
      ]);
      wikiPage(q, wiki, {
        extract: extractR.status === "fulfilled" ? extractR.value : "",
        wd: wdR.status === "fulfilled" ? wdR.value : null,
        quotes: quotesR.status === "fulfilled" ? quotesR.value : [],
      });
    } catch {
      roastPage(q, "wiki-miss");
    }
  }

  run();
})();
