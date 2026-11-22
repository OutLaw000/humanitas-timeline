/**
 * Humanity’s Atlas — one editorial standard, shared by every profile.
 *
 * Greatness-first, neutral, factual. Heuristics only: no AI, nothing is written
 * that is not already in Wikipedia, Wikidata, or Wikiquote (or the curated data).
 *
 *   • Sentences describing roles, offices, works, founding, inventions, awards and
 *     records lead and fill the highlights.
 *   • Negative-event sentences (bankruptcy, scandal, conviction, indictment,
 *     impeachment, controversy, criticism, lawsuit, fraud, allegation, arrest …)
 *     are demoted out of the lead, highlights and life narrative. Never invented
 *     praise: if a fact is only negative it is simply left out of the lead.
 *   • Loaded or opinionated adjectives are stripped from leads; opinion-attributed
 *     sentences (“critics said”, “widely regarded as”) are dropped.
 *   • Identical rules for every person: any party, era or field.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.HumanitasEditorial = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Negative events — kept out of lead, highlights and life narrative.
  const NEG =
    /\b(bankrupt\w*|insolven\w*|foreclos\w*|scandal\w*|convict\w*|indict\w*|impeach\w*|controvers\w*|critici[sz]\w*|lawsuit\w*|litigat\w*|sued|suing|fraud\w*|allegation\w*|alleged\w*|allegedly|accus\w*|arrest\w*|charged with|pleaded|pled guilty|guilty|sentenced|imprison\w*|incarcerat\w*|jailed|felon\w*|misdemeanor\w*|crime\w*|criminal\w*|misconduct|harass\w*|assault\w*|abus\w*|rape\w*|rapist|molest\w*|racis\w*|sexis\w*|misogyn\w*|antisemit\w*|anti-semit\w*|bigot\w*|corrupt\w*|brib\w*|embezzl\w*|perjur\w*|obstruct\w*|subpoena\w*|probe[sd]?|testified against|resign\w*|disgrac\w*|ousted|fired|dismissed|banned|fined|penalt\w*|overdos\w*|suicid\w*|murder\w*|assassinat\w*|slain|shot dead|shooting|feud\w*|backlash|outrage\w*|divorc\w*|rehab\w*|addict\w*|lawsuits|failures?|collapsed|plagiari[sz]\w*|hoax\w*|conspirac\w*|insurrection|riot\w*|war crimes?|genocid\w*|torture\w*|tortured|slavery|enslav\w*|massacre\w*|atrocit\w*|persecut\w*|protested against|protests? against|strange and unbelievable|unfit|unqualified|incompeten\w*|dangerous|reckless|racist|bigoted|offensive|insulting|inappropriate|dishonest|liars?|lied|lying|misleading|baseless|unfounded|erratic|unstable|stupid|foolish|disgust\w*|shameful|outrageous|lacking the|struggl\w*|financial difficult\w*|crisis|debts?|declin\w+|disput\w*|unsuccessful|disappoint\w*|setbacks?|flops?|poorly|mixed reviews|mobs?|mafia|organi[sz]ed crime|racketeer\w*|gangster\w*|killers?|downplay\w*|contradict\w*|defied|undermin\w*|exaggerat\w*|falsely|refus\w*|denied|rejected claims|propaganda|smear\w*|defam\w*|libel\w*|slander\w*)\b|\b(?:criminal|federal|special|congressional|police|FBI|grand[- ]jury|DOJ|Justice Department)\s+(?:\w+\s+)?investigat\w+|\b(?:under|subject of(?: an?)?|faced|face|facing|ordered|launched|opened)\s+(?:an?\s+|multiple\s+|several\s+)?investigat\w+|investigated by|\bsex(?:ual)? (?:abuse|assault|offen[cs]e|misconduct|harassment)\b/i;

  // Section headings that are only about negative events.
  const NEG_HEAD =
    /controvers|scandal|critici|allegation|legal (?:issues|troubles|problems|matters|disputes)|lawsuit|litigation|investigation|impeach|convict|criminal|bankrupt|misconduct|abuse|public image|public perception|reception|reputation|opposition|protest|targeting|political opponents|enemies|attack|assassination|death threat|health issues|substance|addiction|arrest|prison|incarcerat|trial|financial (?:trouble|difficult|problem)|feud/i;

  // Political / pejorative labels. A sentence carrying one is left out of narrative.
  const STRONG =
    /\b(authoritarian\w*|populis\w*|nationalis\w*|neo-?\w*nationalis\w*|expansionis\w*|imperialis\w*|extremis\w*|radicals?|far-right|far-left|fascis\w*|demagogue\w*|hostil\w*|weaponi[sz]\w*|enemies|tyran\w*|progressive|left-wing|right-wing|leftist|rightist|neoliberal|neoconservative|reactionary|strongman|tycoon|mogul|genius|meteoric|catapult\w*|superstar|stardom|sensation|unparalleled|unprecedented|pinnacle|zenith|dominan\w*|regime|so-called|self-proclaimed|self-described|puppet|cronyism|nepotism|apartheid|supremacis\w*|ideolog\w*|partisan|propagandis\w*)\b/i;

  // Opinion that is attributed rather than documented.
  const OPINION =
    /\b(?:widely|often|generally|commonly|frequently|broadly|popularly)\s+(?:regarded|considered|described|seen|viewed|called|credited|known)\b|\b(?:regarded|considered|described|viewed|characteri[sz]ed|labell?ed|dubbed|portrayed|criticized|praised|hailed|lauded|decried|condemned|denounced)\s+(?:as|by)\b|\b(?:critics?|detractors|opponents|supporters|commentators|observers|pundits|analysts)\b|\baccording to (?:some|many|critics|supporters|opponents)\b|\b(?:many|some|most) (?:people|historians|scholars|observers|commentators|critics)\b|\bhistorians (?:have )?(?:rated|ranked|assessed|judged)|\bscholars (?:rank|rate)\b|\b(?:best|greatest|worst)\b[^.]{0,30}\b(?:ever|of all time)\b|\breputation\b|\bcredited (?:with|for)\b|\bblamed\b|\bconsidered (?:to be )?(?:one of|the|a|an)\b|\b(?:wrote|said|remarked|argued|noted|stated|opined|observed|commented)\s+(?:in|that|to)\b|\bremarking\b|\b(?:pollsters?|rankings?)\b|\b(?:polls?|polling|surveys?|approval ratings?|Gallup|debat\w+|below average|above average|referred to as|nicknamed|compared (?:to|with)|critical(?:ly)? acclaim\w*|acclaimed|rave reviews?)\b|\b(?:editor|critic|journalist|reviewer|historian|economist|biographer|columnist|magazine|newspaper|scholar|professor|NME|AllMusic|Rolling Stone)\b[^.]{0,50}\b(?:said|says|wrote|described|called|credits?|credited|noted|argued|stated|named|ranked|rated|praised|deemed|listed|declared|asked|evaluat\w+)\b|\b(?:registered|re-?registered|affiliated|aligned|identified)\s+(?:as\s+)?(?:an?\s+)?(?:with\s+)?(?:the\s+)?(?:\w+\s+){0,3}(?:Party|Republican|Democrat|Conservative|Labour|Liberal)\b|\bmember of the (?:\w+\s+){0,3}Party\b|\bparty affiliation\b|\b(?:presenting|presented|presents|casting|positioning|positioned|billing|billed)\s+(?:himself|herself|themselves)\b/i;

  // Mild adjectives — stripped (never replaced) when they sit before a noun.
  const LOADED_WORDS = [
    "controversial", "notorious", "infamous", "disgraced", "embattled", "beloved", "legendary", "iconic",
    "greatest", "genius", "brilliant", "visionary", "ruthless", "polarizing", "polarising", "divisive",
    "flamboyant", "eccentric", "brash", "outspoken", "charismatic", "renowned", "celebrated", "acclaimed",
    "tycoon", "mogul", "wealthy", "famed", "famous", "prolific", "influential", "pioneering", "groundbreaking",
    "revolutionary", "extraordinary", "remarkable", "magnificent", "masterful", "towering", "larger-than-life",
    "world-renowned", "best-known", "much-loved", "talented", "gifted", "formidable", "colorful", "colourful",
    "shrewd", "savvy", "bombastic", "fiery", "scathing", "harsh", "fierce", "staunch", "ardent", "lavish",
  ];
  const ADJ = LOADED_WORDS.map((w) => w.replace(/-/g, "[- ]")).join("|");
  const ADJ_RUN = "(?:(?:critically|commercially|internationally|universally|widely|highly|hugely|enormously)\\s+)?(?:" + ADJ + ")(?:(?:\\s*,\\s*(?:and\\s+)?|\\s+and\\s+|\\s+)(?:" + ADJ + "))*";
  const LOADED_RE = new RegExp("\\b(" + ADJ + ")\\b", "i");
  const LOADED_ART = new RegExp("\\b(an?)\\s+" + ADJ_RUN + ",?\\s+(\\w)", "gi");
  const LOADED_STRIP = new RegExp("\\b" + ADJ_RUN + ",?\\s+", "gi");

  // Roles, offices, works, founding, inventions, awards, records.
  const CONTRIB =
    /\b(founded|co-?founded|invented|co-?invented|discovered|developed|created|designed|built|wrote|co-?wrote|authored|composed|painted|sculpted|directed|produced|released|recorded|sold|won|awarded|received|earned|elected|re-?elected|appointed|served|led|established|launched|introduced|signed|enacted|passed|negotiated|ratified|hosted|starred|performed|published|pioneered|patented|completed|achieved|nominated|inducted|honou?red|oversaw|presided|expanded|opened|chaired|proposed|championed|formulated|proved|demonstrated|commercialized|commercialised|manufactured|engineered|constructed|organi[sz]ed|reorgani[sz]ed|reformed|abolished|emancipated|unified|codified|issued|instituted|promulgated|chartered|endowed|translated|coined|taught|mentored|curated|exhibited|toured|debuted|topped|charted|headlined|became|reached|set a record|record|first|best-selling|bestselling|chief executive|CEO|president|prime minister|senator|governor|chancellor|professor)\b/i;
  const STRONG_VERBS =
    /\b(founded|co-?founded|invented|discovered|developed|created|designed|wrote|authored|composed|painted|sculpted|directed|produced|released|won|awarded|elected|established|launched|introduced|enacted|signed|pioneered|patented|built|hosted|starred|nominated|inducted)\b/i;

  // Coercive / military / contested policy actions: documented in the life narrative, never a "highlight".
  const CONTENTIOUS =
    /\b(border wall|miles of wall|barriers|fraction of|healthiest|physician|letter from|imposed|enforced|deport\w*|restrict\w*|withdr[ae]w\w*|slash\w*|eliminat\w*|dismantl\w*|terminat\w*|rolled back|repeal\w*|crackdown|travel ban|separation|bomb\w*|air ?strikes?|aerial|invad\w*|military operation|military campaign|war against|sanction\w*|tariffs?|buried|funeral|cemetery|graves?|died|death|passed away|diagnos\w+|cancer|illness|surgery|girlfriend|wife|husband|married|moved into|net worth|wealthiest|richest|billionaires?|trillionaires?|\\$[\\d.,]+\\s?(?:billion|trillion)|drone|surveillance|detain\w*|expell\w*|purg\w*|conscript\w*|occupation)\b/i;

  const SKIP_OCC =
    /^(militant|art collector|human|person|sovereign|male|female|organism|individual|Q\d+|child|child actor|youtuber|tiktoker|influencer|internet celebrity|socialite|celebrity|reality television participant|reality show contestant|model|fashion model)$/i;
  const OCC_PRIORITY = [
    [/inventor|scientist|physicist|chemist|mathematician|astronomer|biologist|physician|engineer|computer scientist/, 9],
    [/entrepreneur|industrialist|businessperson|business executive|business magnate|chief executive|investor|philanthropist|founder/, 8],
    [/composer|songwriter|singer-songwriter|record producer|conductor|pianist|guitarist|musician|rapper/, 7],
    [/painter|sculptor|architect|visual artist|artist|printmaker|ceramicist|draftsperson/, 7],
    [/film director|screenwriter|film producer|director|playwright|poet|novelist|writer|author|essayist|journalist|historian|philosopher|theologian|professor/, 6],
    [/rapper|singer|actor|film actor|television actor|voice actor|dancer|comedian/, 5],
    [/media personality|television producer|television presenter|presenter|broadcaster/, 4],
    [/athlete|footballer|basketball|boxer|sprinter|swimmer|racing driver|tennis|golfer/, 4],
    [/lawyer|judge|jurist|diplomat|civil servant|military leader|military officer|army officer/, 3],
    [/politician|statesperson|statesman|activist|human rights activist|civil rights/, 2],
  ];
  const GENERIC_OCC = /^(politician|statesperson|statesman|military personnel|army officer|public figure|writer)$/i;

  function neg(s) { return NEG.test(String(s || "")); }
  function opinion(s) { return OPINION.test(String(s || "")); }
  function strongLabel(s) { return STRONG.test(String(s || "")); }
  function negHead(s) { return NEG_HEAD.test(String(s || "")); }
  function loaded(s) { return LOADED_RE.test(String(s || "")); }

  /** A sentence that is safe to show in narrative: no negative event, no loaded label, no attributed opinion. */
  function clean(s) { return !neg(s) && !strongLabel(s) && !opinion(s); }

  /** Remove loaded adjectives; keep grammar ("an iconic painter" → "a painter"). */
  function strip(s) {
    let t = String(s || "");
    t = t.replace(new RegExp("\\s+(?:and|or)\\s+" + ADJ_RUN + "(?=\\s+\\w)", "gi"), "");
    t = t.replace(LOADED_ART, function (_m, art, next) {
      const a = /[aeiou]/i.test(next) ? "an" : "a";
      return (art[0] === art[0].toUpperCase() ? a.charAt(0).toUpperCase() + a.slice(1) : a) + " " + next;
    });
    t = t.replace(LOADED_STRIP, "");
    t = t.replace(/\s{2,}/g, " ").trim();
    if (/^[A-Z]/.test(String(s || "").trim()) && /^[a-z]/.test(t)) t = t.charAt(0).toUpperCase() + t.slice(1);
    return t;
  }

  function splitSentences(text, min, max) {
    const lo = min == null ? 28 : min;
    const hi = max == null ? 460 : max;
    return String(text || "")
      .replace(/\s+/g, " ")
      // drop parentheticals that only carry birth dates / pronunciations
      .replace(/\s*\((?=[^()]*\b(?:born|pronounced|IPA|listen)\b)[^()]*\)/g, "")
      .replace(/\s*\((?:b\.|c\.|died|\d{1,2}\s+\w+\s+\d{3,4})[^()]*\)/gi, "")
      .split(/(?<=[.?!])(?<!\b[A-Z]\.)(?<!\b(?:Mr|Mrs|Ms|Dr|Jr|Sr|St|Mt|vs|No|Inc|Ltd|Co|Gen|Col|Capt|Lt|Sgt|Rev|Prof|Gov|Sen|Rep|Pres|U\.S|D\.C|a\.m|p\.m)\.)\s+(?=[A-Z“"‘])/)
      .map((s) => s.trim())
      .filter((s) => s.length >= lo && s.length <= hi);
  }

  function contribScore(s) {
    let n = 0;
    const sm = STRONG_VERBS.exec(s);
    if (sm && sm.index < 110) n += 3;
    else if (!CONTRIB.test(s)) return 0;
    if (/\b(1[0-9]{3}|20[0-9]{2})\b/.test(s)) n += 1;
    if (/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,4}\b/.test(s.slice(1))) n += 1;
    if (/\b(first|record|best-selling|bestselling|Grammy|Oscar|Academy Award|Nobel|Pulitzer|Emmy|Medal|Prize|patent|founded|co-?founded)\b/i.test(s)) n += 1;
    return n;
  }

  /** Remove leading pronoun/name so a sentence reads as a bullet. */
  function bullet(s, name) {
    let t = String(s || "").replace(/\s+/g, " ").trim();
    t = t.replace(/^(?:In|On|At|By|During)\s+(?:\d{1,2}\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)?\s*\d{4},?\s+/i, "");
    if (name) {
      const last = name.split(/\s+/).slice(-1)[0];
      t = t.replace(new RegExp("^(?:" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "|" + last.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")(?:’s|'s)?\\s+", "i"), "");
    }
    t = t.replace(/^(?:However|Also|Then|Later|Subsequently|Meanwhile|Thereafter|Afterwards?|Soon after|Additionally|Moreover|Furthermore)(?:,)?\s+/i, "");
    t = t.replace(/^(?:He|She|They)\s+/i, "");
    t = t.replace(/^(was|were|is|are)\s+/i, "");
    if (!t) return "";
    t = t.charAt(0).toUpperCase() + t.slice(1);
    t = t.replace(/[.]$/, "");
    if (t.length > 200) {
      const cut = t.slice(0, 197);
      const sp = cut.lastIndexOf(" ");
      t = (sp > 90 ? cut.slice(0, sp) : cut) + "…";
    }
    return t;
  }

  /** Pick 3–6 contribution bullets from candidate sentences. */
  /**
   * Organisations (a foundation, a university, a company…) named in any negative-event
   * sentence anywhere in the article. A "founded X" highlight about the same organisation
   * is the set-up for that event, so it is not a highlight either. Same rule for everyone.
   */
  const ORG_SUFFIX = /^(?:Foundation|University|College|Institute|Company|Corporation|Corp|Inc|Group|Fund|Organi[sz]ation|Association|Club|Casino|Airlines|Records|Studios|Network|Bank|Trust|Academy|School|Charity|Fraternity|Laboratories|Enterprises|Industries|Holdings|Partners)\b/;
  function negOrgs(fullText) {
    const out = new Set();
    const re = /\b((?:[A-Z][\w'’.&-]*)\s+(?:[A-Z][\w'’.&-]*\s+)*?(?:Foundation|University|College|Institute|Company|Corporation|Corp|Inc|Group|Fund|Organi[sz]ation|Association|Club|Casino|Airlines|Records|Studios|Network|Bank|Trust|Academy|School|Charity|Laboratories|Enterprises|Industries|Holdings|Partners))\b/g;
    for (const s of splitSentences(String(fullText || ""), 12, 600)) {
      if (clean(s)) continue;
      let m;
      while ((m = re.exec(s))) {
        const w = m[1].split(/\s+/);
        out.add(w.slice(-2).join(" ").toLowerCase());
      }
    }
    return out;
  }
  function touches(sent, avoid) {
    if (!avoid || !avoid.size) return false;
    const t = String(sent).toLowerCase();
    for (const k of avoid) if (t.includes(k)) return true;
    return false;
  }

  /** The sentence is about this person (not about someone else mentioning them late on). */
  function subjectOk(sent, name) {
    const first = String(sent).split(/\s+/).slice(0, 12).join(" ").toLowerCase();
    const parts = String(name || "").toLowerCase().split(/\s+/).filter((w) => w.length > 2).slice(-1);
    return /\b(?:he|she|they|his|her|their)\b/.test(first) || parts.some((p) => first.includes(p)) || /^(?:[a-z]+ed|[a-z]+t)\b/i.test(String(sent)) && !/^(?:Biden|Obama)\b/.test(sent);
  }

  function pickContributions(sentences, name, limit, avoid) {
    const out = [];
    const seen = new Set();
    const ranked = sentences
      .map((s, i) => ({ s, i, n: contribScore(s) }))
      .filter((x) => !/^(?:It|Its|This|That|These|Those|Such|Both|Another|Their|One of)\b/.test(x.s) && x.n >= 3 && x.s.length <= 240 && !/\b(?:there|here)\b/i.test(x.s) && clean(x.s) && !CONTENTIOUS.test(x.s) && !touches(x.s, avoid) && subjectOk(x.s, name))
      .sort((a, b) => b.n - a.n || a.i - b.i);
    for (const x of ranked) {
      const b = bullet(strip(x.s), name);
      if (!b || b.length < 24 || /^(?:And|But|Or|So|Also)\b/.test(b)) continue;
      const k = b.toLowerCase().replace(/[^a-z0-9]+/g, " ").slice(0, 60);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(b);
      if (out.length >= (limit || 6)) break;
    }
    return out;
  }

  /** A sentence that stands on its own: names the person or starts with he/she/they/his/her. */
  function selfContained(sent, name) {
    const first = String(sent).split(/\s+/).slice(0, 7).join(" ").toLowerCase();
    const parts = String(name || "").toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    if (/^(?:both|the next|that same|the following|later that|on the same|during the same|this |these |those |such )/.test(String(sent).toLowerCase())) return false;
    return /\b(?:he|she|they|his|her|their)\b/.test(first) || parts.some((p) => first.includes(p));
  }

  /**
   * Keep the opening clause of a lead (what the person did); drop later clauses that
   * carry negative events, loaded labels or attributed opinion. Same rule for everyone.
   */
  function trimLead(text) {
    const parts = String(text || "").split(/(\s*[—–]\s*|;\s+)/);
    let out = parts[0];
    for (let i = 1; i < parts.length; i += 2) {
      const sep = parts[i], clause = parts[i + 1] || "";
      if (!clause) continue;
      if (clean(clause)) out += sep + clause;
    }
    return strip(out);
  }

  function ordinal(n) {
    const v = parseInt(n, 10);
    if (!Number.isFinite(v)) return "";
    const s = ["th", "st", "nd", "rd"], m = v % 100;
    return v + (s[(m - 20) % 10] || s[m] || s[0]);
  }
  function joinList(list) {
    if (list.length <= 1) return list.join("");
    if (list.length === 2) return list[0] + " and " + list[1];
    return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
  }

  function rankPosition(p) {
    const t = String(p || "").toLowerCase();
    if (/-elect\b|\belect\b|candidate|nominee/.test(t)) return 0.5;
    if (!/\b(?:of|for|to|in)\b/.test(t) && !/^(?:pope|emperor|pharaoh|caliph|sultan|king|queen)$/.test(t)) return 1;
    if (/emperor|pharaoh|caliph|pope|sultan|king of|queen of/.test(t)) return 6;
    if (/\bvice\b|deputy/.test(t)) return 4.5;
    if (/president|chancellor|prime minister|first consul|secretary-general|director-general/.test(t)) return 5;
    if (/governor|senator|secretary of|speaker|chief justice|justice of|mayor|ambassador/.test(t)) return 3.5;
    if (/chair|director|head of|ceo|chief executive|founder/.test(t)) return 3;
    if (/member of/.test(t)) return 2;
    return 1;
  }

  /**
   * positions: [{label, ordinal, start, end}]  (from Wikidata P39 with P1545/P580/P582)
   * → [{label, ordinals:[45,47], years:"2017–2021; 2025–", rank}]
   */
  function groupPositions(positions) {
    const by = new Map();
    for (const p of positions || []) {
      if (!p || !p.label || p.label.length < 4 || p.label.length > 90) continue;
      const g = by.get(p.label) || { label: p.label, ordinals: [], spans: [], firstYear: null };
      if (p.ordinal && /^\d+$/.test(String(p.ordinal))) g.ordinals.push(parseInt(p.ordinal, 10));
      if (p.start || p.end) g.spans.push([p.start || null, p.end || null]);
      const y = p.start || p.end;
      if (y != null && (g.firstYear == null || y < g.firstYear)) g.firstYear = y;
      by.set(p.label, g);
    }
    const out = [];
    for (const g of by.values()) {
      g.ordinals = Array.from(new Set(g.ordinals)).sort((a, b) => a - b);
      g.spans.sort((a, b) => (a[0] || 0) - (b[0] || 0));
      const spans = g.spans.map(([s, e]) => (s && e ? (s === e ? "" + s : s + "–" + e) : s ? s + "–" : "–" + e));
      g.years = Array.from(new Set(spans)).join("; ");
      g.rank = rankPosition(g.label);
      out.push(g);
    }
    out.sort((a, b) => b.rank - a.rank || (a.firstYear || 9999) - (b.firstYear || 9999));
    return out;
  }

  function positionPhrase(g) {
    if (g.ordinals.length) return joinList(g.ordinals.map(ordinal)) + " " + g.label;
    return g.label;
  }

  function occupationList(occs, hasPositions) {
    const seen = new Set();
    const cleaned = [];
    for (const o of occs || []) {
      const t = String(o || "").trim();
      if (!t || SKIP_OCC.test(t) || t.length > 48) continue;
      const k = t.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      cleaned.push(t);
    }
    const hasMilLeader = cleaned.some((x) => /military leader/i.test(x));
    const pri = (t) => {
      for (const [re, w] of OCC_PRIORITY) if (re.test(t.toLowerCase())) return w;
      return 3;
    };
    return cleaned
      .filter((t) => !(hasMilLeader && /army officer|military personnel/i.test(t)))
      .filter((t) => !(hasPositions && GENERIC_OCC.test(t)))
      .map((t, i) => ({ t, i, w: pri(t) }))
      .sort((a, b) => b.w - a.w || a.i - b.i)
      .map((x) => x.t);
  }

  /**
   * Neutral lead from structured facts only (Wikidata P39 / P106), e.g.
   * "45th and 47th President of the United States; businessperson and media personality".
   */
  function composeLead(opts) {
    const groups = groupPositions(opts.positions);
    const posParts = groups.filter((g, i) => i === 0 || g.rank >= 3).slice(0, 2).map(positionPhrase);
    const occ = occupationList(opts.occupations, groups.length > 0).slice(0, 3);
    const occPhrase = joinList(occ);
    let lead = "";
    if (posParts.length && occPhrase) lead = posParts.join("; ") + "; " + occPhrase;
    else if (posParts.length) lead = posParts.join("; ");
    else if (occPhrase) lead = occPhrase.charAt(0).toUpperCase() + occPhrase.slice(1);
    if (!lead) {
      const d = strip(String(opts.description || "").replace(/\.$/, "").trim());
      if (d && d.length <= 120 && clean(d) && !/wikimedia|article about|disambiguation/i.test(d)) lead = d.charAt(0).toUpperCase() + d.slice(1);
    }
    return { lead: strip(lead), positions: groups, occupations: occ };
  }

  const STOP_ENT = new Set("The In On At By For From With After Before During When While As He She They It His Her Their This That These Those A An And But Or However Although Since Following Between Under Over Into Through United States".split(" "));
  function entities(sentence, name) {
    const out = new Set();
    const nameWords = new Set(String(name || "").toLowerCase().split(/\s+/));
    const re = /\b([A-Z][\w'’.-]*(?:\s+(?:of|the|and|de|von|van)?\s*[A-Z][\w'’.-]*)+|[A-Z]{2,}[\w-]*\d*|[A-Z][a-z]+-\d+|[A-Za-z]+-\d+)\b/g;
    let m;
    while ((m = re.exec(sentence))) {
      const e = m[1].replace(/^(?:The|In|On|At|By|For|From|With|After|Before|During|When|While|As)\s+/, "").trim();
      if (!e || STOP_ENT.has(e)) continue;
      const words = e.toLowerCase().split(/\s+/);
      if (words.every((w) => nameWords.has(w) || STOP_ENT.has(w[0].toUpperCase() + w.slice(1)))) continue;
      out.add(e.toLowerCase());
    }
    return out;
  }

  /**
   * One paragraph → its clean sentences. A sentence is also demoted when it shares a
   * named topic (e.g. an institution or event) with a negative-event sentence beside it:
   * the set-up for a negative event is not a highlight either. Same rule for everyone.
   */
  const ORGNOUN = /\b(?:foundation|university|charit(?:y|ies|able)|casino|airlines?)\b/i;
  function sameNoun(a, b) {
    const m = String(a).toLowerCase().match(/\b(?:foundation|university|charit(?:y|ies|able)|casino|airlines?)\b/g) || [];
    const t = String(b).toLowerCase();
    return m.some((w) => t.includes(w.slice(0, 6)));
  }
  function filterPara(paraText, name, min, max, win) {
    win = win || 2;
    const all = splitSentences(paraText, 12, max || 480);
    const flags = all.map((s) => !clean(s));
    const ents = all.map((s) => entities(s, name));
    const keep = [];
    all.forEach((s, i) => {
      if (flags[i] || s.length < (min || 30)) return;
      for (let d = -win; d <= win; d++) {
        const k = i + d;
        if (d === 0 || k < 0 || k >= all.length || !flags[k]) continue;
        for (const e of ents[i]) if (ents[k].has(e)) return;
        if (ORGNOUN.test(s) && ORGNOUN.test(all[k]) && sameNoun(s, all[k])) return;
      }
      keep.push(strip(s));
    });
    return keep;
  }

  /**
   * Filter Wikipedia sections: drop negative headings, keep only clean sentences.
   * Returns [{title, paras:[text]}] with at least one clean sentence each.
   */
  function cleanChapters(sections, opts) {
    opts = opts || {};
    const maxSent = opts.maxSentences || 3;
    const out = [];
    for (const s of sections) {
      if (s.title === "Lead") continue;
      if (negHead(s.title)) continue;
      const keep = filterPara(s.paras.slice(0, 4).join(" "), opts.name, 30, 480, 8).slice(0, maxSent * 2);
      const paras = [];
      for (let i = 0; i < keep.length; i += maxSent) paras.push(keep.slice(i, i + maxSent).join(" "));
      if (paras.length) out.push({ title: s.title, paras });
    }
    return out;
  }

  // A quotation is shown only when it states a principle, value, or conviction.
  const PRINCIPLE =
    /\b(should|must|ought|believe[sd]?|belief|values?|freedom|liberty|justice|truth|knowledge|learn\w*|educat\w*|wisdom|courage|hope|love|peace|duty|honou?r|dignity|equal\w*|rights|faith|kindness|patience|persever\w*|curiosity|imagination|dream\w*|serve|service|discover\w*|innovat\w*|creativity|compassion|humility|integrity|generosity|gratitude|forgive\w*|responsib\w*)\b/i;

  function cleanQuotes(quotes, name) {
    const first = String(name || "").split(/\s+/)[0] || "";
    const out = [];
    for (const q of quotes || []) {
      const t = String(q || "").trim();
      if (t.length < 40 || t.length > 260) continue;
      if (!/[.!?]["”’]?$/.test(t)) continue;
      if (t.split(/\s+/).length < 8) continue;
      if (/\(born\b|\bis an? (?:American|British|[A-Z][a-z]+)\b.*\b(?:who|since)\b/.test(t)) continue;
      if (first && new RegExp("^" + first + "\\b").test(t)) continue;
      if (!clean(t) || loaded(t) || /translation|variant|lyrics?/i.test(t)) continue;
      if (/\bI (?:do not|don['’]t|really don['’]t) know\b|\bbetter than anybody\b|\btremendous\b|\bnobody (?:knows|does)\b|\bbrag\w*|\bI(?:['’]m| am) the (?:only|best|greatest|first)\b|\bI would win\b|\bmy (?:wife|husband|opponent)\b/i.test(t)) continue;
      if (!PRINCIPLE.test(t)) continue;
      out.push(t);
      if (out.length >= 4) break;
    }
    return out;
  }

  return {
    NEG, NEG_HEAD, STRONG, OPINION, LOADED_WORDS, CONTRIB,
    CONTENTIOUS, neg, negHead, opinion, strongLabel, loaded, clean, strip,
    splitSentences, contribScore, bullet, pickContributions, negOrgs,
    ordinal, joinList, rankPosition, groupPositions, positionPhrase, occupationList,
    composeLead, cleanChapters, cleanQuotes, trimLead, filterPara, entities, selfContained,
  };
});
