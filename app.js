(() => {
const { figures, CATEGORY_LABELS, STATUS_LABELS } = window.HUMANITAS;
const $ = (sel, el = document) => el.querySelector(sel);
const state = { query: "", categories: new Set(), activeSlug: null };
function formatYear(y) { if (y < 0) return Math.abs(y) + " BCE"; return y + " CE"; }
function formatLifespan(b, d) { return d == null ? formatYear(b) + " – present" : formatYear(b) + " – " + formatYear(d); }
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
function matches(f) {
  if (state.categories.size && !f.categories.some((c) => state.categories.has(c))) return false;
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  const hay = [f.name, f.epithet, f.region, f.civilization, f.summary, f.eraLabel, ...(f.philosophy.corePrinciples||[]), ...(f.creations||[]).map((c) => c.name)].join(" ").toLowerCase();
  return hay.includes(q);
}
function filtered() { return sortedFigures().filter(matches); }
function renderHeroStats() {
  const principles = figures.reduce((n, f) => n + (f.philosophy.corePrinciples||[]).length, 0);
  const creations = figures.reduce((n, f) => n + (f.creations||[]).length, 0);
  $("#hero-stats").innerHTML = [{ v: figures.length, l: "Lives" }, { v: principles, l: "Principles" }, { v: creations, l: "Creations" }].map((s) => `<div class=\"stat-card\"><div class=\"stat-value\">${s.v}</div><div class=\"stat-label\">${s.l}</div></div>`).join("");
  $("#thesis-stats").innerHTML = $("#hero-stats").innerHTML;
}
function renderChips() {
  const cats = Object.keys(CATEGORY_LABELS);
  $("#chips").innerHTML = cats.map((c) => {
    const active = state.categories.has(c) ? " active" : "";
    return `<button type=\"button\" class=\"chip${active}\" data-cat=\"${c}\">${CATEGORY_LABELS[c]}</button>`;
  }).join("");
}
function renderTimeline() {
  const list = filtered();
  $("#result-meta").textContent = `Showing ${list.length} of ${figures.length} figures · open any life for full history`;
  let html = "", prevBand = "";
  list.forEach((f) => {
    const band = eraBand(f.birthYear);
    if (band !== prevBand) { html += `<li class=\"era-band\" aria-hidden=\"true\">${band}</li>`; prevBand = band; }
    const badges = (f.categories||[]).map((c) => `<span class=\"badge\">${CATEGORY_LABELS[c]||c}</span>`).join("");
    html += `<li class=\"tl-item\" id=\"fig-${f.slug}\" data-slug=\"${f.slug}\">
      <span class=\"tl-dot\" aria-hidden=\"true\"></span>
      <div class=\"tl-meta\"><div class=\"tl-year\">${formatYear(f.birthYear)}${f.deathYear != null ? " · " + formatYear(f.deathYear) : " · living"}</div>
      <h2 class=\"tl-name\"><button type=\"button\" data-open=\"${f.slug}\">${f.name}</button></h2>
      <p class=\"tl-epithet\">${f.epithet||""}</p></div>
      <div class=\"tl-card-wrap\"><button type=\"button\" class=\"tl-card\" data-open=\"${f.slug}\">
        <div class=\"tl-badges\">${badges}</div>
        <p class=\"tl-summary\">${f.summary||""}</p>
        <div class=\"tl-foot\"><span>${f.region||""}</span><span>${formatLifespan(f.birthYear, f.deathYear)}</span><span>${f.eraLabel||""}</span></div>
        <div class=\"tl-cta\">Full history & philosophy →</div>
      </button></div></li>`;
  });
  if (!list.length) html = `<li class=\"era-band\" style=\"margin-left:0\">No figures match your filters</li>`;
  $("#timeline-list").innerHTML = html;
}
function openFigure(slug) {
  const f = figures.find((x) => x.slug === slug);
  if (!f) return;
  state.activeSlug = slug;
  const body = $("#drawer-body");
  const badges = (f.categories||[]).map((c) => `<span class=\"badge\">${CATEGORY_LABELS[c]||c}</span>`).join(" ");
  const quotes = (f.philosophy.keyQuotes||[]).map((q) => `<blockquote class=\"quote-block\"><p>“${q.text}”</p>${q.source ? `<footer>— ${q.source}</footer>` : ""}</blockquote>`).join("");
  const principles = (f.philosophy.corePrinciples||[]).map((p) => `<li style=\"margin:4px 0;color:var(--fg)\">· ${p}</li>`).join("");
  const creations = (f.creations||[]).map((c) => {
    const st = (STATUS_LABELS&&STATUS_LABELS[c.status]) || c.status;
    return `<div class=\"creation-card\"><div style=\"display:flex;justify-content:space-between;gap:8px\"><div><h3>${c.name}</h3><div class=\"type\">${c.type||""}</div></div><span class=\"badge badge-status ${c.status}\">${st}</span></div><p>${c.description||""}</p>${c.modernPresence?`<p><span style=\"color:var(--fg-subtle)\">Today: </span>${c.modernPresence}</p>`:""}</div>`;
  }).join("");
  const related = (f.relatedSlugs||[]).map((s) => figures.find((x) => x.slug === s)).filter(Boolean).map((r) => `<button type=\"button\" class=\"related-btn\" data-open=\"${r.slug}\"><span><strong>${r.name}</strong><span>${r.epithet||""}</span></span><span>→</span></button>`).join("");
  const today = (f.todayRelevance||[]).map((t) => `<p style=\"padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--bg);margin:0 0 8px\">${t}</p>`).join("");
  body.innerHTML = `<div class=\"tl-badges\">${badges}</div><h1 id=\"drawer-title\">${f.name}</h1><p class=\"epithet\">${f.epithet||""}</p>
    <dl class=\"drawer-dl\"><div><dt>Lived</dt><dd>${formatLifespan(f.birthYear, f.deathYear)}</dd></div><div><dt>Era</dt><dd>${f.eraLabel||""}</dd></div><div><dt>Region</dt><dd>${f.region||""}</dd></div><div><dt>Civilization</dt><dd>${f.civilization||""}</dd></div></dl>
    <div class=\"drawer-section\"><p style=\"color:var(--fg);font-size:1.05rem\">${f.summary||""}</p></div>
    <div class=\"drawer-section\"><h2>Historical life</h2>${(f.biography||[]).map((p)=>`<p>${p}</p>`).join("")}</div>
    <div class=\"drawer-section\"><h2>Philosophy of the human person</h2>
      <p><strong style=\"color:var(--fg-subtle);font-size:11px;text-transform:uppercase;letter-spacing:.06em\">View of humanity</strong><br/>${f.philosophy.viewOfHumanity||""}</p>
      <p><strong style=\"color:var(--fg-subtle);font-size:11px;text-transform:uppercase;letter-spacing:.06em\">How we should operate</strong><br/>${f.philosophy.howWeOperate||""}</p>
      <p><strong style=\"color:var(--fg-subtle);font-size:11px;text-transform:uppercase;letter-spacing:.06em\">Core principles</strong></p>
      <ul style=\"list-style:none;padding:0;margin:0\">${principles}</ul></div>
    ${quotes ? `<div class=\"drawer-section\"><h2>Words that endure</h2>${quotes}</div>` : ""}
    <div class=\"drawer-section\"><h2>Creations — standing, lost, living ideas</h2>${creations||"<p>See legacy.</p>"}</div>
    <div class=\"drawer-section\"><h2>Legacy & why it matters now</h2><p>${f.legacy||""}</p>${today}</div>
    ${related ? `<div class=\"drawer-section\"><h2>Related figures</h2><div class=\"related-list\">${related}</div></div>` : ""}`; 
  $("#drawer").hidden = false; $("#drawer-backdrop").hidden = false; document.body.style.overflow = "hidden";
}
function closeDrawer() { $("#drawer").hidden = true; $("#drawer-backdrop").hidden = true; document.body.style.overflow = ""; state.activeSlug = null; }
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
    for (const f of figures) for (const p of (f.philosophy.corePrinciples||[])) if (def.match(p)) voices.push({ name: f.name, principle: p });
    return { ...def, voices: voices.slice(0, 8) };
  }).filter((c) => c.voices.length);
  return {
    generatedAt: new Date().toISOString(), sourcesCount: figures.length, principlesCount, clusters,
    preamble: `This thesis is assembled from ${figures.length} lives across millennia—lawgivers and liberators, contemplatives and scientists. They converge on how humans must treat truth, power, suffering, and one another.`,
    pillars: [
      { name: "Constitutional Conscience", actions: ["Publish laws in plain language", "Guarantee voting access and independent courts", "Teach founding promises alongside historical betrayals"], rootedIn: ["Hammurabi", "King David", "Abraham Lincoln", "Nelson Mandela"] },
      { name: "Care as Strategic Power", actions: ["Treat public health as national security", "Fund mental health without stigma", "Design cities so the vulnerable are not warehoused out of sight"], rootedIn: ["Florence Nightingale", "Ashoka", "Mother Teresa", "Eleanor Roosevelt"] },
      { name: "Education for Every Mind", actions: ["Universal safe schooling", "Science literacy and Socratic dialogue as civic skills", "Lifelong public learning"], rootedIn: ["Malala Yousafzai", "Marie Curie", "Socrates", "Frederick Douglass"] },
      { name: "Peace Technologies", actions: ["Invest in nonviolent conflict resolution", "After communal violence: truth processes before triumphal myths", "Count civilian suffering as strategic failure"], rootedIn: ["Gandhi", "Martin Luther King Jr.", "Buddha", "Desmond Tutu"] },
      { name: "Plural Covenant & Living Earth", actions: ["Protect minority practice while teaching a shared civic ethic", "Pair ecological restoration with democratic rights", "Celebrate multiple civilizational inheritances"], rootedIn: ["Ashoka", "Muhammad", "Wangari Maathai", "Eleanor Roosevelt"] },
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
  const clusters = doc.clusters.map((c, i) => `<div class=\"cluster\"><div class=\"cluster-head\"><span class=\"cluster-num\">${String(i+1).padStart(2,"0")}</span><h4>${c.title}</h4></div><p>${c.description}</p><ul>${c.voices.map((v)=>`<li><span>${v.name}:</span> ${v.principle}</li>`).join("")}</ul><div class=\"cluster-today\"><strong>Practice today — </strong>${c.modern}</div></div>`).join("");
  const pillars = doc.pillars.map((p) => `<div class=\"pillar\"><h4>${p.name}</h4><ul>${p.actions.map((a)=>`<li>${a}</li>`).join("")}</ul><div class=\"rooted\">Rooted in: ${p.rootedIn.join(" · ")}</div></div>`).join("");
  const practices = doc.practices.map((p) => `<div class=\"practice\"><h4>${p.title}</h4><p>${p.detail}</p></div>`).join("");
  const future = doc.future.map((f) => `<p>${f}</p>`).join("");
  $("#thesis-doc").innerHTML = `<p class=\"eyebrow\">Full synthesis</p><h3 style=\"margin-top:8px\">A Living Thesis: Principles of Greatness for Nations & Communities</h3><p class=\"thesis-preamble\">${doc.preamble}</p><h3>Principle clusters</h3>${clusters}<h3>A national path of greatness & truth</h3>${pillars}<h3>Community practices</h3>${practices}<h3>If we continued the path</h3><div class=\"future\">${future}</div><div class=\"closing-box\"><p>${doc.closing}</p><p class=\"closing-meta\">Synthesized from ${doc.sourcesCount} figures · ${doc.principlesCount} principles · ${new Date(doc.generatedAt).toLocaleString()}</p></div>`;
  $("#thesis-doc").hidden = false; $("#btn-copy").hidden = false; window.__lastThesisText = thesisToText(doc);
}
async function runGenerate() {
  const btn = $("#btn-generate"); const status = $("#thesis-status");
  const steps = ["Indexing lives, eras, and civilizational contexts…", "Clustering philosophical principles across traditions…", "Mapping creations that stand, fell, or live as ideas…", "Drafting national pillars and community practices…"];
  btn.disabled = true; btn.querySelector(".btn-label").textContent = "Synthesizing…"; status.hidden = false; $("#thesis-doc").hidden = true;
  for (let i = 0; i < steps.length; i++) {
    status.innerHTML = steps.map((s, j) => { const cls = j < i ? "done" : j === i ? "active" : ""; return `<div class=\"status-line ${cls}\"><span class=\"status-dot\"></span>${s}</div>`; }).join("");
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 200));
  }
  status.innerHTML = steps.map((s) => `<div class=\"status-line done\"><span class=\"status-dot\"></span>${s}</div>`).join("");
  renderThesisDoc(generateThesis()); btn.disabled = false; btn.querySelector(".btn-label").textContent = "Regenerate thesis";
}
let explore = null;
function openExplore() { $("#explore-overlay").hidden = false; document.body.style.overflow = "hidden"; initExplore(); }
function closeExplore() { $("#explore-overlay").hidden = true; document.body.style.overflow = ""; explore = null; }
function initExplore() {
  const canvas = $("#explore-canvas"); const ctx = canvas.getContext("2d"); const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() { const rect = canvas.parentElement.getBoundingClientRect(); canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; canvas.style.width = rect.width + "px"; canvas.style.height = rect.height + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  resize();
  const nodes = sortedFigures().map((f, i) => { const t = i / Math.max(figures.length - 1, 1); const angle = t * Math.PI * 2 * 1.7 + 0.4; const radius = 80 + t * 160 + (i % 3) * 28; return { f, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.72, r: 4 + ((f.categories||[]).includes("spiritual") ? 2 : 0) }; });
  explore = { nodes, camX: 0, camY: 0, scale: 1.1, dragging: false, lastX: 0, lastY: 0, hover: null };
  function worldToScreen(x, y) { const w = canvas.clientWidth, h = canvas.clientHeight; return { x: w / 2 + (x - explore.camX) * explore.scale, y: h / 2 + (y - explore.camY) * explore.scale }; }
  function draw() {
    if (!explore) return; const w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(155,176,212,0.06)"; ctx.lineWidth = 1;
    for (let i = -400; i <= 400; i += 40) { const a = worldToScreen(i, -400), b = worldToScreen(i, 400); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    ctx.strokeStyle = "rgba(155,176,212,0.12)";
    explore.nodes.forEach((n) => { (n.f.relatedSlugs||[]).forEach((slug) => { const m = explore.nodes.find((x) => x.f.slug === slug); if (!m) return; const a = worldToScreen(n.x, n.y), b = worldToScreen(m.x, m.y); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }); });
    explore.nodes.forEach((n) => { const p = worldToScreen(n.x, n.y); const active = explore.hover === n; const r = (active ? n.r + 3 : n.r) * Math.min(explore.scale, 1.6); ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = active ? "#e8eef8" : "#9bb0d4"; ctx.fill(); if (active || explore.scale > 0.9) { ctx.font = (active ? 13 : 11) + "px Outfit, sans-serif"; ctx.fillStyle = active ? "#f2f0ea" : "rgba(242,240,234,0.65)"; ctx.textAlign = "center"; ctx.fillText(n.f.name.split("(")[0].trim(), p.x, p.y + r + 14); } });
    requestAnimationFrame(draw);
  }
  draw();
  function pick(clientX, clientY) { const rect = canvas.getBoundingClientRect(); const x = clientX - rect.left, y = clientY - rect.top; let best = null, bestD = 18; explore.nodes.forEach((n) => { const p = worldToScreen(n.x, n.y); const d = Math.hypot(p.x - x, p.y - y); if (d < bestD) { bestD = d; best = n; } }); return best; }
  canvas.onpointerdown = (e) => { explore.dragging = true; explore.lastX = e.clientX; explore.lastY = e.clientY; canvas.setPointerCapture(e.pointerId); };
  canvas.onpointermove = (e) => { if (explore.dragging) { explore.camX -= (e.clientX - explore.lastX) / explore.scale; explore.camY -= (e.clientY - explore.lastY) / explore.scale; explore.lastX = e.clientX; explore.lastY = e.clientY; } else explore.hover = pick(e.clientX, e.clientY); };
  canvas.onpointerup = (e) => { if (!explore.dragging) return; const dx = Math.abs(e.clientX - explore.lastX); explore.dragging = false; if (dx < 4) { const hit = pick(e.clientX, e.clientY); if (hit) { closeExplore(); openFigure(hit.f.slug); } } };
  canvas.onpointerleave = () => { explore.hover = null; };
  canvas.onwheel = (e) => { e.preventDefault(); const factor = e.deltaY > 0 ? 0.92 : 1.08; explore.scale = Math.min(2.4, Math.max(0.45, explore.scale * factor)); };
  window.addEventListener("resize", resize, { passive: true });
}
function updateProgress() { const scrolled = window.scrollY; const max = document.documentElement.scrollHeight - window.innerHeight; const p = max > 0 ? scrolled / max : 0; $("#progress-bar").style.transform = `scaleX(${p})`; }
function bind() {
  $("#search").addEventListener("input", (e) => { state.query = e.target.value; renderTimeline(); });
  $("#chips").addEventListener("click", (e) => { const btn = e.target.closest("[data-cat]"); if (!btn) return; const c = btn.dataset.cat; if (state.categories.has(c)) state.categories.delete(c); else state.categories.add(c); renderChips(); renderTimeline(); });
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]"); if (open) { e.preventDefault(); openFigure(open.dataset.open); return; }
    const nav = e.target.closest("[data-nav]"); if (nav) { const t = nav.dataset.nav; if (t === "timeline") $("#timeline").scrollIntoView({ behavior: "smooth", block: "start" }); else if (t === "thesis") $("#thesis").scrollIntoView({ behavior: "smooth", block: "start" }); else if (t === "home") window.scrollTo({ top: 0, behavior: "smooth" }); else if (t === "explore") openExplore(); }
  });
  $("#drawer-close").addEventListener("click", closeDrawer);
  $("#drawer-backdrop").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!$("#explore-overlay").hidden) closeExplore(); else if (!$("#drawer").hidden) closeDrawer(); } });
  $("#btn-generate").addEventListener("click", runGenerate);
  $("#btn-copy").addEventListener("click", async () => { if (!window.__lastThesisText) return; try { await navigator.clipboard.writeText(window.__lastThesisText); $("#btn-copy").textContent = "Copied"; setTimeout(() => { $("#btn-copy").textContent = "Copy full text"; }, 1600); } catch (_) {} });
  $("#explore-close").addEventListener("click", closeExplore);
  window.addEventListener("scroll", updateProgress, { passive: true }); updateProgress();
}
renderHeroStats(); renderChips(); renderTimeline(); bind();
})();
