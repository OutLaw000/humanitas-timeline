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

  const FEMALE =
    /female|woman|zira|samantha|karen|aria|jenny|sonia|hazel|susan|moira|tessa|ava|zoe|victoria|allison|catherine|linda|michelle|eva|heera|nicky|fiona|kathy|\bana\b/i;
  const NEURAL = /neural|natural|online|premium|enhanced|wavenet|studio/i;
  const MALE = /male|\bman\b|david|mark|george|daniel|james|fred|\btom\b|ravi|richard|\balex\b|microsoft david|google us english$/i;
  let cachedVoice = null;

  function scoreVoice(v) {
    const n = (v.name || "") + " " + (v.lang || "");
    let s = 0;
    if (FEMALE.test(n)) s += 80;
    if (NEURAL.test(n)) s += 40;
    if (/google uk english female/i.test(n)) s += 25;
    if (/en-GB|en_GB|en-AU|en-IE/i.test(n)) s += 10;
    if (/en-US|en_US/i.test(n)) s += 6;
    if (MALE.test(n) && !/female/i.test(n)) s -= 120;
    return s;
  }

  function pickWoman(voices) {
    const en = voices.filter((v) => /^en(-|_)/i.test(v.lang) || /english/i.test(v.name));
    const pool = (en.length ? en : voices).slice().sort((a, b) => scoreVoice(b) - scoreVoice(a));
    const woman = pool.find((v) => scoreVoice(v) > 0);
    return woman || pool[0] || null;
  }

  function loadVoices() {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve([]);
      const ready = () => resolve(speechSynthesis.getVoices() || []);
      const now = speechSynthesis.getVoices();
      if (now && now.length) return resolve(now);
      speechSynthesis.addEventListener("voiceschanged", ready, { once: true });
      setTimeout(ready, 600);
    });
  }

  async function speakFigure(f, seconds = 55) {
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
    u.lang = "en-GB";
    u.rate = 0.88;
    u.pitch = 1.04;
    u.volume = 1;
    if (!cachedVoice) cachedVoice = pickWoman(await loadVoices());
    if (cachedVoice) {
      u.voice = cachedVoice;
      u.lang = cachedVoice.lang || u.lang;
    }
    window.speechSynthesis.speak(u);
    setTimeout(() => {
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    }, seconds * 1000);
  }

  async function shareFigure(f) {
    const shareUrl = location.origin + "/figure/" + f.slug;
    if (navigator.share) {
      try {
        await navigator.share({ title: f.name + " — Humanity’s Atlas", text: f.summary || f.epithet, url: shareUrl });
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
    loadVoices().then((list) => {
      if (!cachedVoice) cachedVoice = pickWoman(list);
    });
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
