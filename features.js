/* Humanitas extras — slim drawer actions + routes + studio CTA */
(() => {
  const $ = (sel, el = document) => el.querySelector(sel);

  function core() {
    return window.HumanitasCore;
  }

  function flashStatus(msg) {
    const el = $("#feature-toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.hidden = true; }, 1800);
  }

  function speakFigure(f, seconds = 55) {
    if (!window.speechSynthesis) {
      flashStatus("Speech not available here");
      return;
    }
    window.speechSynthesis.cancel();
    const parts = [
      f.name + ".",
      f.epithet || "",
      core()?.formatLifespan?.(f.birthYear, f.deathYear) || "",
      f.summary || "",
      "Greatest accomplishments: " + ((f.accomplishments || []).slice(0, 5).join(". ") || "") + ".",
      (f.biography || []).slice(0, 2).join(" "),
      (f.philosophy?.corePrinciples || []).slice(0, 4).join(". ") + ".",
      f.legacy || "",
    ].filter(Boolean);
    const u = new SpeechSynthesisUtterance(parts.join(" ").slice(0, 1200));
    u.rate = 0.95;
    const voices = speechSynthesis.getVoices();
    const en = voices.find((v) => /en[-_]?US|en[-_]?GB|English/i.test(v.lang + v.name));
    if (en) u.voice = en;
    window.speechSynthesis.speak(u);
    setTimeout(() => {
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    }, seconds * 1000);
  }

  async function shareFigure(f) {
    const shareUrl = location.origin + "/figure/" + f.slug;
    if (navigator.share) {
      try {
        await navigator.share({ title: f.name + " — Humanitas", text: f.summary || f.epithet, url: shareUrl });
        return;
      } catch (_) {}
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      flashStatus("Link copied");
    } catch {
      prompt("Copy this link:", shareUrl);
    }
  }

  function enhanceDrawer(f) {
    const body = $("#drawer-body");
    if (!body || !f) return;
    const bar = document.createElement("div");
    bar.className = "drawer-actions";
    bar.innerHTML = `
      <button type="button" class="btn btn-primary btn-sm" data-tts="${f.slug}">▶ Listen</button>
      <button type="button" class="btn btn-ghost btn-sm" data-share-fig="${f.slug}">Share</button>
      <a class="btn btn-ghost btn-sm" href="/figure/${f.slug}" target="_blank" rel="noopener">Full page</a>
    `;
    body.insertBefore(bar, body.firstChild);
  }

  function applyRoute() {
    const params = new URLSearchParams(location.search);
    const hash = location.hash.replace(/^#/, "");
    let slug = params.get("figure") || params.get("slug");
    if (hash.startsWith("figure=")) slug = hash.slice(7);
    if (hash === "thesis" || hash.startsWith("thesis")) {
      $("#thesis")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (slug) setTimeout(() => core()?.openFigure(slug), 100);
  }

  function bindFeatures() {
    document.addEventListener("click", (e) => {
      const tts = e.target.closest("[data-tts]");
      if (tts) {
        const f = core()?.findFigure(tts.dataset.tts);
        if (f) speakFigure(f);
        return;
      }
      const share = e.target.closest("[data-share-fig]");
      if (share) {
        const f = core()?.findFigure(share.dataset.shareFig);
        if (f) shareFigure(f);
      }
    });
  }

  function init() {
    if (window.AmeriKingCTA?.render) window.AmeriKingCTA.render();
    bindFeatures();
    applyRoute();
    if (core()) {
      const prev = core().onFigureOpen;
      core().onFigureOpen = (f) => {
        if (typeof prev === "function") prev(f);
        enhanceDrawer(f);
      };
    }
  }

  window.HumanitasFeatures = { init, enhanceDrawer, speakFigure, shareFigure };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0));
  } else {
    setTimeout(init, 0);
  }
})();
