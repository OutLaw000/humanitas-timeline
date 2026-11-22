/**
 * Community timeline, Recently explored, Most explored this week.
 * Data comes from /api/lists (server-graded, anonymous). Everything is escaped before display.
 */
(() => {
  const root = document.getElementById("list-root");
  if (!root) return;
  const kind = root.dataset.kind;
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const yr = (y) => (y == null ? "" : y < 0 ? Math.abs(y) + " BCE" : y + " CE");
  const span = (b, d) => (b == null ? "" : yr(b) + (d != null ? " · " + yr(d) : " · living"));
  const href = (it) => (it.slug ? "/figure/" + encodeURIComponent(it.slug) : "/who?q=" + encodeURIComponent(it.name));
  const initial = (n) => esc(String(n || "?").charAt(0).toUpperCase());

  const empty = (msg) => `<div class="list-empty"><p>${msg}</p><div class="who-actions"><a class="btn btn-primary btn-sm" href="/#timeline">See the 115</a><a class="btn btn-ghost btn-sm" href="/who">Search a name</a></div></div>`;
  const offline = `<div class="list-empty"><p><strong>Not connected yet.</strong> These lists are backed by a small anonymous store that has not been switched on for this deployment, so nothing is recorded or shown here yet.</p></div>`;

  function portrait(it) {
    const fallback = `<div class="tl-portrait-fallback" aria-hidden="true"><span>${initial(it.name)}</span></div>`;
    if (it.slug) {
      const s = encodeURIComponent(it.slug);
      const onerr =
        "this.onerror=null;this.style.display='none';var pic=this.closest('picture');if(pic)pic.remove();";
      return `<div class="tl-portrait">${fallback}<picture>
        <source type="image/avif" srcset="/images/figures/${s}.avif">
        <source type="image/webp" srcset="/images/figures/${s}.webp">
        <img src="/images/figures/${s}.jpg" alt="" loading="lazy" decoding="async" onerror="${onerr}">
      </picture></div>`;
    }
    return `<div class="tl-portrait" data-wiki-name="${esc(it.name)}">${fallback}</div>`;
  }

  function fillWikiThumbs(box) {
    box.querySelectorAll("[data-wiki-name]").forEach(async (el) => {
      const name = el.getAttribute("data-wiki-name");
      if (!name) return;
      try {
        const r = await fetch(
          "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(name.replace(/ /g, "_")),
          { headers: { Accept: "application/json" } }
        );
        if (!r.ok) return;
        const s = await r.json();
        const src = s && s.thumbnail && s.thumbnail.source;
        if (!src) return;
        const img = document.createElement("img");
        img.src = String(src).split("?")[0];
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        img.referrerPolicy = "no-referrer";
        img.onerror = () => img.remove();
        el.appendChild(img);
      } catch {}
    });
  }

  function renderCommunity(j) {
    if (!j.items.length) return empty("No one has qualified yet. Search a name: if their public record clears the threshold, they appear here automatically.");
    const items = j.items
      .map(
        (it) => `<li class="tl-item">
        <span class="tl-dot" aria-hidden="true"></span>
        <a class="tl-person" href="${href(it)}">
          ${portrait(it)}
          <div class="tl-details">
            <div class="tl-year">${esc(span(it.birth, it.death))}</div>
            <h2 class="tl-name">${esc(it.name)}</h2>
            <p class="tl-epithet">${esc(it.desc)}</p>
            <div class="tl-badges"><span class="badge">Community · graded ${esc(it.score)}/100</span></div>
            <div class="tl-cta">Open profile →</div>
          </div>
        </a></li>`
      )
      .join("");
    return `<section class="timeline-section list-timeline"><div class="timeline-spine" aria-hidden="true"></div><ol class="timeline">${items}</ol></section>`;
  }

  function renderRows(j, showCount) {
    if (!j.items.length) return empty(showCount ? "Nothing explored yet this week." : "Nothing explored yet.");
    return `<ol class="list-rows">${j.items
      .map(
        (it, i) => `<li><a class="list-row" href="${href(it)}">
          <span class="list-rank" aria-hidden="true">${showCount ? i + 1 : ""}</span>
          <span class="list-main"><strong>${esc(it.name)}</strong><span>${esc(it.desc)}</span></span>
          <span class="list-meta">${showCount ? esc(it.explorers) + (it.explorers === 1 ? " explorer" : " explorers") : esc(span(it.birth, it.death))}</span>
        </a></li>`
      )
      .join("")}</ol>`;
  }

  async function rubric() {
    const box = document.getElementById("rubric");
    if (!box) return;
    try {
      const c = await (await fetch("/config/grading.config.json")).json();
      const k = c.components, g = c.gates, A = k.recordedAchievements, R = k.readershipLongevity;
      box.innerHTML = `
        <h2>How the Community is graded</h2>
        <p>Searching a name triggers a server-side grade from public Wikipedia and Wikidata records. Clients cannot submit scores. Passing <strong>${c.threshold} / 100</strong> adds the person automatically; the same rubric applies to everyone, and politics or sentiment are never inputs.</p>
        <table class="rubric-table"><thead><tr><th>Signal</th><th>Max</th><th>How</th></tr></thead><tbody>
          <tr><td>Language editions</td><td>${k.languageEditions.max}</td><td>${k.languageEditions.pointsPerEdition} per Wikipedia language edition</td></tr>
          <tr><td>Recorded achievements</td><td>${A.max}</td><td>${A.awards.perItem}/award (cap ${A.awards.cap}), ${A.offices.perItem}/office held (cap ${A.offices.cap}), ${A.works.perItem}/notable work (cap ${A.works.cap})</td></tr>
          <tr><td>Article depth</td><td>${k.articleDepth.max}</td><td>Full marks at ${Number(k.articleDepth.fullPointsBytes).toLocaleString()} bytes of English Wikipedia text</td></tr>
          <tr><td>Readership longevity</td><td>${R.max}</td><td>Median monthly views over ${R.windowMonths} months (a median cannot be lifted by a spike); full marks at ${Number(R.medianMonthlyViewsForFullPoints).toLocaleString()}</td></tr>
        </tbody></table>
        <p class="bio-source-note">Blocked before scoring: non-humans, fictional characters, people without an English Wikipedia article, and living people with fewer than ${g.minLanguageEditionsLiving} language editions (${g.minLanguageEditionsDeceased} for historical figures). One entry per Wikidata item. No IP, name or account is stored. <a href="/docs/GRADING.md">Full documentation</a>.</p>`;
    } catch {}
  }

  async function run() {
    rubric();
    try {
      const r = await fetch("/api/lists?kind=" + encodeURIComponent(kind), { cache: "no-store" });
      if (!r.ok) throw new Error("http");
      const j = await r.json();
      if (!j.configured) { root.innerHTML = offline; return; }
      root.innerHTML = kind === "community" ? renderCommunity(j) : renderRows(j, kind === "week");
      fillWikiThumbs(root);
    } catch {
      root.innerHTML = offline;
    }
  }
  run();
})();
