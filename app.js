(() => {
const { figures, CATEGORY_LABELS, STATUS_LABELS } = window.HUMANITAS;
const $ = (sel, el = document) => el.querySelector(sel);
const state = {
  query: "",
  categories: new Set(),
  activeSlug: null,
  standingOnly: false,
};
const SLUG_ALIASES = {
  mlk: "martin-luther-king-jr",
  gandhi: "mahatma-gandhi",
  mandela: "nelson-mandela",
  lincoln: "abraham-lincoln",
  douglass: "frederick-douglass",
  tubman: "harriet-tubman",
  curie: "marie-curie",
  nightingale: "florence-nightingale",
  "da-vinci": "leonardo-da-vinci",
  roosevelt: "eleanor-roosevelt",
  maathai: "wangari-maathai",
  tutu: "desmond-tutu",
  malala: "malala-yousafzai",
  "mother-teresa": "mother-teresa",
  buddha: "buddha",
  confucius: "confucius",
  socrates: "socrates",
  jesus: "jesus",
  muhammad: "muhammad",
  david: "david",
  solomon: "solomon",
  ashoka: "ashoka",
  hypatia: "hypatia",
  rumi: "rumi",
  newton: "isaac-newton",
  einstein: "albert-einstein",
  darwin: "charles-darwin",
  locke: "john-locke",
  washington: "george-washington",
  churchill: "winston-churchill",
  fdr: "franklin-d-roosevelt",
  turing: "alan-turing",
  parks: "rosa-parks",
  salk: "jonas-salk",
  carson: "rachel-carson",
  gutenberg: "johannes-gutenberg",
  luther: "martin-luther",
  copernicus: "nicolaus-copernicus",
  galileo: "galileo",
  shakespeare: "william-shakespeare",
  plato: "plato",
  aristotle: "aristotle",
  alexander: "alexander-the-great",
  augustus: "augustus",
  cyrus: "cyrus-the-great",
  moses: "moses",
  marx: "karl-marx",
  smith: "adam-smith",
  edison: "thomas-edison",
  bolivar: "simon-bolivar",
  anthony: "susan-b-anthony",
  "berners-lee": "tim-berners-lee",
  "ibn-sina": "ibn-sina",
  "al-khwarizmi": "al-khwarizmi",
  "qin-shi-huang": "qin-shi-huang",
  imhotep: "imhotep",
  hatshepsut: "hatshepsut",
  pericles: "pericles",
  hippocrates: "hippocrates",
  euclid: "euclid",
  archimedes: "archimedes",
  paul: "paul-the-apostle",
  "paul-the-apostle": "paul-the-apostle",
  "apostle-paul": "paul-the-apostle",
  "saul-of-tarsus": "paul-the-apostle",
  genghis: "genghis-khan",
  "genghis-khan": "genghis-khan",
  chinggis: "genghis-khan",
  "chinggis-khan": "genghis-khan",
  temujin: "genghis-khan",
  napoleon: "napoleon-bonaparte",
  "napoleon-bonaparte": "napoleon-bonaparte",
  "napoleon-i": "napoleon-bonaparte",
  watt: "james-watt",
  "james-watt": "james-watt",
  mencius: "mencius",
  cicero: "cicero",
  seneca: "seneca",
  augustine: "augustine",
  justinian: "justinian",
  charlemagne: "charlemagne",
  farabi: "al-farabi",
  averroes: "ibn-rushd",
  maimonides: "maimonides",
  khaldun: "ibn-khaldun",
  hildegard: "hildegard",
  aquinas: "thomas-aquinas",
  francis: "francis-of-assisi",
  dante: "dante",
  "mansa-musa": "mansa-musa",
  sejong: "sejong",
  "zheng-he": "zheng-he",
  erasmus: "erasmus",
  bacon: "francis-bacon",
  descartes: "descartes",
  spinoza: "spinoza",
  kepler: "kepler",
  harvey: "william-harvey",
  voltaire: "voltaire",
  kant: "immanuel-kant",
  wollstonecraft: "mary-wollstonecraft",
  franklin: "benjamin-franklin",
  humboldt: "alexander-von-humboldt",
  jenner: "edward-jenner",
  faraday: "michael-faraday",
  maxwell: "james-clerk-maxwell",
  mendel: "gregor-mendel",
  braille: "louis-braille",
  dunant: "henry-dunant",
  carver: "george-washington-carver",
  addams: "jane-addams",
  dubois: "w-e-b-du-bois",
  schweitzer: "albert-schweitzer",
  fleming: "alexander-fleming",
  borlaug: "norman-borlaug",
  lovelace: "ada-lovelace",
  "rosalind-franklin": "rosalind-franklin",
  goodall: "jane-goodall",
  yunus: "muhammad-yunus",
  mary: "mary",
  abraham: "abraham",
  noah: "noah",
  isaiah: "isaiah",
  elijah: "elijah",
  jeremiah: "jeremiah",
  john: "john-the-baptist",
  deborah: "deborah",
  joshua: "joshua",
  daniel: "daniel",
  zoroaster: "zoroaster",
  nanak: "guru-nanak",
  gideon: "gideon",
  maccabee: "judah-maccabee",
  constantine: "constantine",
  martel: "charles-martel",
  saladin: "saladin",
  sobieski: "jan-sobieski",
  hiawatha: "hiawatha",
  sequoyah: "sequoyah",
  tecumseh: "tecumseh",
  "sitting-bull": "sitting-bull",
  "crazy-horse": "crazy-horse",
  joseph: "chief-joseph",
  sacagawea: "sacagawea",
  "black-elk": "black-elk",
  jefferson: "thomas-jefferson",
  madison: "james-madison",
  adams: "john-adams",
  stowe: "harriet-beecher-stowe",
  barton: "clara-barton",
  epictetus: "epictetus",
  ghazali: "al-ghazali",
};
function resolveSlug(s) {
  if (!s) return s;
  if (figures.some((f) => f.slug === s)) return s;
  return SLUG_ALIASES[s] || s;
}
function findFigure(slug) {
  const s = resolveSlug(slug);
  return figures.find((x) => x.slug === s);
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
  if (d == null) return (trad ? "traditional " : "") + bStr + " – present";
  if (b == null) return (trad ? "traditional " : "") + "d. " + formatYear(d, { circa: circa, alt: meta.deathYearAlt });
  var span = bStr + " – " + formatYear(d, { circa: circa, alt: meta.deathYearAlt });
  return trad ? "traditional " + formatYear(b, { alt: meta.birthYearAlt }) + " – " + formatYear(d, { alt: meta.deathYearAlt }) : span;
}
function yearOpts(f, which) {
  return { circa: f.datePrecision === "circa", alt: which === "death" ? f.deathYearAlt : f.birthYearAlt };
}
function eraBand(year) {
  if (year < -1000) return "Bronze & early Iron Age";
  if (year < 0) return "Classical antiquity";
  if (year < 500) return "Late antiquity";
  if (year < 1200) return "Medieval world";
  if (year < 1700) return "Early modern";
  if (year < 1900) return "Age of reform & industry";
  if (year < 2000) return "Twentieth century";
  return "Living history";
}
function sortedFigures() { return [...figures].sort((a, b) => a.birthYear - b.birthYear); }
function hasStanding(f) {
  return (f.creations || []).some((c) => c.status === "stands" || c.status === "partial" || c.status === "idea");
}
function matches(f) {
  if (state.standingOnly && !hasStanding(f)) return false;
  if (state.categories.size && !f.categories.some((c) => state.categories.has(c))) return false;
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    f.name, f.epithet, f.region, f.civilization, f.summary, f.eraLabel,
    ...(f.philosophy.corePrinciples || []),
    ...(f.creations || []).map((c) => c.name),
    ...(f.accomplishments || []),
    ...(f.biography || []),
  ].join(" ").toLowerCase();
  return hay.includes(q);
}
function filtered() { return sortedFigures().filter(matches); }
function renderHeroStats() {
  const principles = figures.reduce((n, f) => n + (f.philosophy.corePrinciples||[]).length, 0);
  const creations = figures.reduce((n, f) => n + (f.creations||[]).length, 0);
  const html = [
    { v: figures.length, l: "Lives" },
    { v: principles, l: "Principles" },
    { v: creations, l: "Creations" },
  ].map((s) => `<div class="stat-card"><div class="stat-value">${s.v}</div><div class="stat-label">${s.l}</div></div>`).join("");
  const hero = $("#hero-stats");
  if (hero) hero.innerHTML = html;
  const thesis = $("#thesis-stats");
  if (thesis) thesis.innerHTML = html;
}
function renderChips() {
  const cats = Object.keys(CATEGORY_LABELS);
  const host = $("#chips");
  if (!host) return;
  const standingActive = state.standingOnly ? " active" : "";
  host.innerHTML =
    `<button type="button" class="chip chip-special${standingActive}" data-standing="1">What still stands</button>` +
    cats.map((c) => {
      const active = state.categories.has(c) ? " active" : "";
      return `<button type="button" class="chip${active}" data-cat="${c}">${CATEGORY_LABELS[c]}</button>`;
    }).join("");
}
function renderTimeline() {
  const list = filtered();
  const metaEl = $("#result-meta");
  if (metaEl) {
    metaEl.textContent = `Showing ${list.length} of ${figures.length} figures` +
      (state.standingOnly ? " · living institutions filter on" : "") +
      " · open any life for full history";
  }
  let html = "", prevBand = "";
  list.forEach((f) => {
    const band = eraBand(f.birthYear);
    if (band !== prevBand) { html += `<li class="era-band" aria-hidden="true">${band}</li>`; prevBand = band; }
    const badges = (f.categories||[]).map((c) => `<span class="badge">${CATEGORY_LABELS[c]||c}</span>`).join("");
    const initial = (f.name || "?").charAt(0);
    const fallback = `<div class="tl-portrait-fallback" aria-hidden="true"><span>${initial}</span></div>`;
    const onerr = "this.onerror=null;this.style.display='none';var box=this.closest('.tl-portrait')||this.parentNode;box.innerHTML='<div class=\'tl-portrait-fallback\' aria-hidden=\'true\'><span>" + initial + "</span></div>';";
    const portrait = (f.image && f.image.url)
      ? (window.HUMANITAS && HUMANITAS.figurePicture
          ? HUMANITAS.figurePicture(f, "", { alt: f.name, loading: "lazy", onerror: onerr })
          : `<img src="${f.image.url}" alt="${f.name}" loading="lazy" decoding="async" onerror="${onerr}" />`)
      : fallback;
    html += `<li class="tl-item" id="fig-${f.slug}" data-slug="${f.slug}">
      <span class="tl-dot" aria-hidden="true"></span>
      <button type="button" class="tl-person" data-open="${f.slug}">
        <div class="tl-portrait">${portrait}</div>
        <div class="tl-details">
          <div class="tl-year">${(f.datePrecision === "traditional" ? "trad. " : "")}${formatYear(f.birthYear, yearOpts(f, "birth"))}${f.deathYear != null ? " · " + formatYear(f.deathYear, yearOpts(f, "death")) : " · living"}</div>
          <h2 class="tl-name">${f.name}</h2>
          <p class="tl-epithet">${f.epithet || ""}</p>
          <div class="tl-badges">${badges}</div>
          <p class="tl-summary">${f.summary || ""}</p>
          <div class="tl-foot"><span>${f.region || ""}</span><span>${formatLifespan(f)}</span><span>${f.eraLabel || ""}</span></div>
          <div class="tl-cta">Open full history →</div>
        </div>
      </button>
    </li>`;
  });
  if (!list.length) html = `<li class="era-band" style="margin-left:0">No figures match your filters</li>`;
  const listEl = $("#timeline-list");
  if (listEl) listEl.innerHTML = html;
}
function figureImage(f, cls) {
  if (!f.image || !f.image.url) return "";
  const cap = f.image.caption || f.name;
  const credit = f.image.credit ? `<span class="img-credit">${f.image.credit}</span>` : "";
  const initial = (f.name || "?").charAt(0);
  const onerr = "this.onerror=null;this.style.display='none';var fig=this.closest('figure');if(fig){fig.classList.add('img-failed');var d=document.createElement('div');d.className='tl-portrait-fallback';d.innerHTML='<span>" + initial + "</span>';fig.insertBefore(d,fig.firstChild);}";
  const pic = (window.HUMANITAS && HUMANITAS.figurePicture)
    ? HUMANITAS.figurePicture(f, "", { alt: cap, loading: "lazy", onerror: onerr })
    : `<img src="${f.image.url}" alt="${cap}" loading="lazy" decoding="async" onerror="${onerr}" />`;
  return `<figure class="${cls||"figure-photo"}">${pic}<figcaption>${cap}${credit ? " · " + credit : ""}</figcaption></figure>`;
}
function openFigure(slug) {
  const f = findFigure(slug);
  if (!f) return;
  state.activeSlug = slug;
  if (window.HumanitasField && typeof HumanitasField.pulse === "function") {
    HumanitasField.pulse(innerWidth * 0.5, innerHeight * 0.45);
  }
  const body = $("#drawer-body");
  if (!body) return;
  const badges = (f.categories||[]).map((c) => `<span class="badge">${CATEGORY_LABELS[c]||c}</span>`).join(" ");
  const quotes = (f.philosophy.keyQuotes||[]).map((q) => `<blockquote class="quote-block"><p>“${q.text}”</p>${q.source ? `<footer>— ${q.source}</footer>` : ""}</blockquote>`).join("");
  const principles = (f.philosophy.corePrinciples||[]).map((p) => `<li style="margin:4px 0;color:#f5f7f8">· ${p}</li>`).join("");
  const creations = (f.creations||[]).map((c) => {
    const st = (STATUS_LABELS&&STATUS_LABELS[c.status]) || c.status;
    return `<div class="creation-card"><div style="display:flex;justify-content:space-between;gap:8px"><div><h3>${c.name}</h3><div class="type">${c.type||""}</div></div><span class="badge badge-status ${c.status}">${st}</span></div><p>${c.description||""}</p>${c.modernPresence?`<p><span style="color:var(--fg-subtle)">Today: </span>${c.modernPresence}</p>`:""}</div>`;
  }).join("");
  const related = (f.relatedSlugs||[]).map((s) => findFigure(s)).filter(Boolean).map((r) => `<button type="button" class="related-btn" data-open="${r.slug}"><span><strong>${r.name}</strong><span>${r.epithet||""}</span></span><span>→</span></button>`).join("");
  const today = (f.todayRelevance||[]).map((t) => `<p style="padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--bg);margin:0 0 8px">${t}</p>`).join("");
  const photo = figureImage(f, "drawer-photo");
  const accomplishments = (f.accomplishments || []).map((a) => `<li>${a}</li>`).join("");
  body.innerHTML = `${photo}<div class="tl-badges">${badges}</div><h1 id="drawer-title">${f.name}</h1><p class="epithet">${f.epithet||""}</p>
    <dl class="drawer-dl"><div><dt>Lived</dt><dd>${formatLifespan(f)}</dd></div><div><dt>Era</dt><dd>${f.eraLabel||""}</dd></div><div><dt>Region</dt><dd>${f.region||""}</dd></div><div><dt>Civilization</dt><dd>${f.civilization||""}</dd></div></dl>
    <div class="drawer-section"><p style="color:#f5f7f8;font-size:1.05rem">${f.summary||""}</p></div>
    ${accomplishments ? `<div class="drawer-section"><h2>Greatest accomplishments</h2><ol class="accomplishments-list">${accomplishments}</ol></div>` : ""}
    <div class="drawer-section"><h2>Historical life</h2>${(f.biography||[]).map((p)=>`<p>${p}</p>`).join("")}</div>
    <div class="drawer-section"><h2>Philosophy of the human person</h2>
      <p><strong style="color:var(--fg-subtle);font-size:11px;text-transform:uppercase;letter-spacing:.06em">View of humanity</strong><br/>${f.philosophy.viewOfHumanity||""}</p>
      <p><strong style="color:var(--fg-subtle);font-size:11px;text-transform:uppercase;letter-spacing:.06em">How we should operate</strong><br/>${f.philosophy.howWeOperate||""}</p>
      <p><strong style="color:var(--fg-subtle);font-size:11px;text-transform:uppercase;letter-spacing:.06em">Core principles</strong></p>
      <ul style="list-style:none;padding:0;margin:0">${principles}</ul></div>
    ${quotes ? `<div class="drawer-section"><h2>Words that endure</h2>${quotes}</div>` : ""}
    <div class="drawer-section"><h2>Creations — standing, lost, living ideas</h2>${creations||"<p>See legacy.</p>"}</div>
    <div class="drawer-section"><h2>Legacy & why it matters now</h2><p>${f.legacy||""}</p>${today}</div>
    ${related ? `<div class="drawer-section"><h2>Related figures</h2><div class="related-list">${related}</div></div>` : ""}`;
  $("#drawer").hidden = false;
  $("#drawer-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
  if (typeof window.HumanitasCore?.onFigureOpen === "function") {
    window.HumanitasCore.onFigureOpen(f);
  } else if (window.HumanitasFeatures?.enhanceDrawer) {
    window.HumanitasFeatures.enhanceDrawer(f);
  }
}
function closeDrawer() {
  const d = $("#drawer");
  const b = $("#drawer-backdrop");
  if (d) d.hidden = true;
  if (b) b.hidden = true;
  document.body.style.overflow = "";
  state.activeSlug = null;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
const CLUSTER_DEFS = [
  { id: "truth", title: "Truth over Face-Saving", match: (p) => /truth|honest|examined|knowledge|name|speech|rectif|evidence|data|understand|wisdom|discern/i.test(p), description: "Greatness begins when communities stop lying to themselves.", modern: "Protect free inquiry; publish understandable rules and outcomes." },
  { id: "dignity", title: "Inherent Dignity of Every Person", match: (p) => /dignity|worth|equal|human right|neighbor|poor|weak|least|slave|personhood|orphan|girl|shepherd/i.test(p), description: "Civilization is graded by how it treats those without leverage.", modern: "Anchor law and budgets in human rights." },
  { id: "nonviolence", title: "Breaking the Cycle of Hatred", match: (p) => /non-?harm|non-?viol|ahimsa|enemy|forgiv|reconcil|mercy|compassion|hatred|love|peace|ubuntu/i.test(p), description: "Advanced political technologies for ending cycles that devour nations.", modern: "Train de-escalation; fund restorative justice." },
  { id: "justice", title: "Public Justice and Limited Power", match: (p) => /justice|law|rule|govern|account|duty|right|emancip|union|freedom|oppress|covenant|repent/i.test(p), description: "Power that cannot be checked becomes predation.", modern: "Defend independent courts and free elections." },
  { id: "service", title: "Leadership as Service", match: (p) => /service|care|welfare|heal|nurse|steward|servant|duty|protect|children|hospital|education|plant|tree/i.test(p), description: "Authority is justified by what it heals.", modern: "Recruit and pay caregivers and teachers as nation-builders." },
  { id: "self", title: "Self-Mastery Before Rule", match: (p) => /self|cultivat|character|virtue|discipline|middle way|control|fear|courage|simple|swaraj|wu wei|repent/i.test(p), description: "The untrained self will corrupt any office.", modern: "Restore character and civic formation." },
  { id: "plural", title: "Plural Belonging", match: (p) => /toleran|plural|sect|interfaith|tribe|peoples|diversity|ummah|relig|ubuntu/i.test(p), description: "Diversity is not a bug to delete.", modern: "Protect minority rights within majority democracy." },
  { id: "education", title: "Education as Liberation", match: (p) => /educat|learn|litera|school|book|teacher|exam|knowledge|pen|science|training|observ/i.test(p), description: "Ignorance is a political weapon; education disarms it.", modern: "Guarantee free, safe schooling for every child." },
];
function generateThesis() {
  const principlesCount = figures.reduce((n, f) => n + (f.philosophy.corePrinciples||[]).length, 0);
  const clusters = CLUSTER_DEFS.map((def) => {
    const voices = [];
    for (const f of figures) {
      for (const p of (f.philosophy.corePrinciples||[])) {
        if (def.match(p)) voices.push({ name: f.name, principle: p });
      }
    }
    return { ...def, voices: voices.slice(0, 8) };
  }).filter((c) => c.voices.length);
  const rootedNames = (names) => names;
  return {
    generatedAt: new Date().toISOString(),
    sourcesCount: figures.length,
    principlesCount,
    clusters,
    preamble: `This thesis is assembled from ${figures.length} lives across millennia—lawgivers and liberators, contemplatives and scientists. They converge on how humans must treat truth, power, suffering, and one another.`,
    pillars: [
      { name: "Constitutional Conscience", actions: ["Publish laws in plain language", "Guarantee voting access and independent courts", "Teach founding promises alongside historical betrayals"], rootedIn: rootedNames(["Hammurabi", "King David", "Abraham Lincoln", "Nelson Mandela"]) },
      { name: "Care as Strategic Power", actions: ["Treat public health as national security", "Fund mental health without stigma", "Design cities so the vulnerable are not warehoused out of sight"], rootedIn: rootedNames(["Florence Nightingale", "Ashoka", "Mother Teresa", "Eleanor Roosevelt"]) },
      { name: "Education for Every Mind", actions: ["Universal safe schooling", "Science literacy and Socratic dialogue as civic skills", "Lifelong public learning"], rootedIn: rootedNames(["Malala Yousafzai", "Marie Curie", "Socrates", "Frederick Douglass"]) },
      { name: "Peace Technologies", actions: ["Invest in nonviolent conflict resolution", "After communal violence: truth processes before triumphal myths", "Count civilian suffering as strategic failure"], rootedIn: rootedNames(["Gandhi", "Martin Luther King Jr.", "Buddha", "Desmond Tutu"]) },
      { name: "Plural Covenant & Living Earth", actions: ["Protect minority practice while teaching a shared civic ethic", "Pair ecological restoration with democratic rights", "Celebrate multiple civilizational inheritances"], rootedIn: rootedNames(["Ashoka", "Muhammad", "Wangari Maathai", "Eleanor Roosevelt"]) },
    ],
    practices: [
      { title: "Weekly examined-life circles", detail: "Small groups practice honest dialogue and mutual aid." },
      { title: "Local rights & care maps", detail: "Map who is hungry, unhoused, or out of school—and assign companions." },
      { title: "Youth truth projects", detail: "Teens document community history—injustices and helpers." },
      { title: "Service sabbaths", detail: "Regular unpaid service in clinics, schools, shelters." },
      { title: "Enemy-to-neighbor protocols", detail: "After conflict, structured listening before social-media trials." },
      { title: "Evidence rituals", detail: "Town halls open with data on health, safety, and schooling." },
    ],
    future: [
      "Imagine a nation where leaders publish conflicts of interest as casually as weather.",
      "Imagine schools where every child, especially girls once barred from classrooms, learns both equations and ethics.",
      "Imagine streets where the dying and destitute are not invisible.",
      "Imagine protests that refuse hatred’s script, and institutions that refuse cruelty’s script.",
      "That nation would not be paradise. It would argue, err, and reform—but it would be recognizable to the great ones on this timeline.",
    ],
    closing: "Greatness is not a bloodline or a golden age behind glass. It is a set of repeatable human choices: tell the truth, limit your power, protect the weak, break hatred’s chain, teach the child, serve without spectacle, repent when you fail. The teachers have already lived the experiment. The only open variable is whether we continue the path.",
  };
}
function thesisToText(doc) {
  const lines = [doc.preamble, "", "— PRINCIPLE CLUSTERS —", ""];
  doc.clusters.forEach((c, i) => { lines.push((i+1)+". "+c.title, c.description); c.voices.forEach((v) => lines.push("  • "+v.name+": "+v.principle)); lines.push("Today: "+c.modern, ""); });
  lines.push("— NATIONAL PROGRAM —"); doc.pillars.forEach((p) => { lines.push(p.name); p.actions.forEach((a) => lines.push("  - "+a)); lines.push("  Rooted in: "+p.rootedIn.join(", "), ""); });
  lines.push("— COMMUNITY PRACTICES —"); doc.practices.forEach((p) => lines.push(p.title, p.detail, ""));
  lines.push("— IF WE CONTINUED THE PATH —"); doc.future.forEach((f) => lines.push(f));
  lines.push("", doc.closing, `\n[Synthesized from ${doc.sourcesCount} figures, ${doc.principlesCount} principles · ${doc.generatedAt}]`);
  return lines.join("\n");
}
function renderThesisDoc(doc) {
  const clusters = doc.clusters.map((c, i) => `<div class="cluster"><div class="cluster-head"><span class="cluster-num">${String(i+1).padStart(2,"0")}</span><h4>${c.title}</h4></div><p>${c.description}</p><ul>${c.voices.map((v)=>`<li><span>${v.name}:</span> ${v.principle}</li>`).join("")}</ul><div class="cluster-today"><strong>Practice today — </strong>${c.modern}</div></div>`).join("");
  const pillars = doc.pillars.map((p) => `<div class="pillar"><h4>${p.name}</h4><ul>${p.actions.map((a)=>`<li>${a}</li>`).join("")}</ul><div class="rooted">Rooted in: ${p.rootedIn.join(" · ")}</div></div>`).join("");
  const practices = doc.practices.map((p) => `<div class="practice"><h4>${p.title}</h4><p>${p.detail}</p></div>`).join("");
  const future = doc.future.map((f) => `<p>${f}</p>`).join("");
  $("#thesis-doc").innerHTML = `<p class="eyebrow">Full synthesis</p><h3 style="margin-top:8px">A Living Thesis: Principles of Greatness for Nations & Communities</h3><p class="thesis-preamble">${doc.preamble}</p><h3>Principle clusters</h3>${clusters}<h3>A national path of greatness & truth</h3>${pillars}<h3>Community practices</h3>${practices}<h3>If we continued the path</h3><div class="future">${future}</div><div class="closing-box"><p>${doc.closing}</p><p class="closing-meta">Synthesized from ${doc.sourcesCount} figures · ${doc.principlesCount} principles · ${new Date(doc.generatedAt).toLocaleString()}</p></div>`;
  $("#thesis-doc").hidden = false;
  $("#btn-copy").hidden = false;
  window.__lastThesisText = thesisToText(doc);
  window.__lastThesisDoc = doc;
}
async function runGenerate() {
  const btn = $("#btn-generate");
  const status = $("#thesis-status");
  if (!btn || !status) return;
  const steps = ["Indexing lives, eras, and civilizational contexts…", "Clustering philosophical principles across traditions…", "Drafting national pillars and community practices…"];
  btn.disabled = true;
  const label = btn.querySelector(".btn-label");
  if (label) label.textContent = "Synthesizing…";
  status.hidden = false;
  $("#thesis-doc").hidden = true;
  for (let i = 0; i < steps.length; i++) {
    status.innerHTML = steps.map((s, j) => { const cls = j < i ? "done" : j === i ? "active" : ""; return `<div class="status-line ${cls}"><span class="status-dot"></span>${s}</div>`; }).join("");
    await new Promise((r) => setTimeout(r, 350 + Math.random() * 180));
  }
  status.innerHTML = steps.map((s) => `<div class="status-line done"><span class="status-dot"></span>${s}</div>`).join("");
  renderThesisDoc(generateThesis());
  btn.disabled = false;
  if (label) label.textContent = "Regenerate thesis";
}
let explore = null;
function openExplore() { $("#explore-overlay").hidden = false; document.body.style.overflow = "hidden"; initExplore(); }
function closeExplore() { $("#explore-overlay").hidden = true; document.body.style.overflow = ""; explore = null; }
function initExplore() {
  const canvas = $("#explore-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let tick = 0;
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  const nodes = sortedFigures().map((f, i) => {
    const t = i / Math.max(figures.length - 1, 1);
    const angle = t * Math.PI * 2 * 1.7 + 0.4;
    const radius = 80 + t * 160 + (i % 3) * 28;
    return {
      f, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.72,
      r: 4 + ((f.categories || []).includes("spiritual") ? 2 : 0),
      phase: Math.random() * Math.PI * 2,
      hue: t,
    };
  });
  explore = { nodes, camX: 0, camY: 0, scale: 1.1, dragging: false, lastX: 0, lastY: 0, hover: null, downX: 0, downY: 0 };
  function worldToScreen(x, y) {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    return { x: w / 2 + (x - explore.camX) * explore.scale, y: h / 2 + (y - explore.camY) * explore.scale };
  }
  function draw() {
    if (!explore) return;
    tick += 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
    g.addColorStop(0, "rgba(10, 18, 36, 0.9)");
    g.addColorStop(1, "rgba(3, 5, 10, 1)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(96, 165, 250,0.05)";
    ctx.lineWidth = 1;
    for (let r = 40; r < 420; r += 40) {
      const c = worldToScreen(0, 0);
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, r * explore.scale, r * explore.scale * 0.72, tick * 0.001, 0, Math.PI * 2);
      ctx.stroke();
    }
    explore.nodes.forEach((n) => {
      (n.f.relatedSlugs || []).forEach((slug) => {
        const m = explore.nodes.find((x) => x.f.slug === slug);
        if (!m) return;
        const a = worldToScreen(n.x, n.y), b = worldToScreen(m.x, m.y);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, "rgba(96, 165, 250,0.2)");
        grad.addColorStop(1, "rgba(167,139,250,0.18)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
    });
    explore.nodes.forEach((n) => {
      const p = worldToScreen(n.x, n.y);
      const active = explore.hover === n;
      const r = (active ? n.r + 3 : n.r) * Math.min(explore.scale, 1.6);
      const pulse = 0.7 + Math.sin(tick * 0.04 + n.phase) * 0.3;
      ctx.strokeStyle = active ? "rgba(255,184,77,0.45)" : "rgba(96, 165, 250,0.2)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, r + 8, r + 4, n.phase + tick * 0.01, 0, Math.PI * 2);
      ctx.stroke();
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      glow.addColorStop(0, active ? "rgba(147, 197, 253,0.45)" : "rgba(96, 165, 250,0.2)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = active ? "#e8edf4" : n.hue > 0.6 ? "#a78bfa" : n.hue > 0.3 ? "#93c5fd" : "#ffb84d";
      ctx.fill();
      if (active || explore.scale > 0.9) {
        ctx.font = (active ? 13 : 11) + "px Outfit, sans-serif";
        ctx.fillStyle = active ? "#e8edf4" : "rgba(232,244,242,0.65)";
        ctx.textAlign = "center";
        ctx.fillText(n.f.name.split("(")[0].trim(), p.x, p.y + r + 16);
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
  function pick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left, y = clientY - rect.top;
    let best = null, bestD = 20;
    explore.nodes.forEach((n) => {
      const p = worldToScreen(n.x, n.y);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bestD) { bestD = d; best = n; }
    });
    return best;
  }
  canvas.onpointerdown = (e) => {
    explore.dragging = true;
    explore.lastX = e.clientX; explore.lastY = e.clientY;
    explore.downX = e.clientX; explore.downY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  };
  canvas.onpointermove = (e) => {
    if (explore.dragging) {
      explore.camX -= (e.clientX - explore.lastX) / explore.scale;
      explore.camY -= (e.clientY - explore.lastY) / explore.scale;
      explore.lastX = e.clientX; explore.lastY = e.clientY;
    } else explore.hover = pick(e.clientX, e.clientY);
  };
  canvas.onpointerup = (e) => {
    if (!explore.dragging) return;
    const moved = Math.hypot(e.clientX - explore.downX, e.clientY - explore.downY);
    explore.dragging = false;
    if (moved < 6) {
      const hit = pick(e.clientX, e.clientY);
      if (hit) { closeExplore(); openFigure(hit.f.slug); }
    }
  };
  canvas.onpointerleave = () => { explore.hover = null; };
  canvas.onwheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    explore.scale = Math.min(2.4, Math.max(0.45, explore.scale * factor));
  };
  window.addEventListener("resize", resize, { passive: true });
}
function updateProgress() {
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? scrolled / max : 0;
  const bar = $("#progress-bar");
  if (bar) bar.style.transform = `scaleX(${p})`;
  if (window.HumanitasField && typeof HumanitasField.setScroll === "function") {
    HumanitasField.setScroll(p);
  }
}
function setStandingOnly(on) {
  state.standingOnly = !!on;
  renderChips();
  renderTimeline();
}
function getActiveFigure() { return state.activeSlug ? findFigure(state.activeSlug) : null; }

window.HumanitasCore = {
  findFigure,
  resolveSlug,
  formatYear,
  formatLifespan,
  openFigure,
  closeDrawer,
  closeExplore,
  openExplore,
  setStandingOnly,
  getActiveFigure,
  generateThesis,
  thesisToText,
  onFigureOpen: null,
  figures: () => figures,
};

function bind() {
  const search = $("#search");
  if (search) search.addEventListener("input", (e) => { state.query = e.target.value; renderTimeline(); });
  const chips = $("#chips");
  if (chips) chips.addEventListener("click", (e) => {
    if (e.target.closest("[data-standing]")) {
      state.standingOnly = !state.standingOnly;
      renderChips();
      renderTimeline();
      return;
    }
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    const c = btn.dataset.cat;
    if (state.categories.has(c)) state.categories.delete(c);
    else state.categories.add(c);
    renderChips();
    renderTimeline();
  });
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) { e.preventDefault(); openFigure(open.dataset.open); return; }
    const nav = e.target.closest("[data-nav]");
    if (nav) {
      const t = nav.dataset.nav;
      if (t === "timeline") $("#timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (t === "thesis") $("#thesis")?.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (t === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else if (t === "explore") openExplore();
    }
  });
  $("#drawer-close")?.addEventListener("click", closeDrawer);
  $("#drawer-backdrop")?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if ($("#explore-overlay") && !$("#explore-overlay").hidden) closeExplore();
      else if ($("#drawer") && !$("#drawer").hidden) closeDrawer();
    }
  });
  $("#btn-generate")?.addEventListener("click", runGenerate);
  $("#btn-copy")?.addEventListener("click", async () => {
    if (!window.__lastThesisText) return;
    try {
      await navigator.clipboard.writeText(window.__lastThesisText);
      $("#btn-copy").textContent = "Copied";
      setTimeout(() => { $("#btn-copy").textContent = "Copy full text"; }, 1600);
    } catch (_) {}
  });
  $("#explore-close")?.addEventListener("click", closeExplore);
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}
renderHeroStats();
renderChips();
renderTimeline();
bind();
})();
