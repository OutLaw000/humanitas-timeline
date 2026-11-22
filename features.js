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

  let player = null;
  let playingSlug = null;
  let objectUrl = null;

  function listenButtons() {
    return document.querySelectorAll("[data-tts]");
  }

  function setListenLabel(slug, label) {
    listenButtons().forEach((b) => {
      if (!slug || b.dataset.tts === slug) b.textContent = label;
    });
  }

  function stopSpeak() {
    if (player) {
      player.pause();
      player.removeAttribute("src");
      player = null;
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    playingSlug = null;
    setListenLabel(null, "▶ Listen");
  }

  async function speakFigure(f) {
    if (playingSlug === f.slug) {
      stopSpeak();
      return;
    }
    stopSpeak();
    setListenLabel(f.slug, "…");
    flashStatus("Ara is speaking…");
    try {
      const r = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: f.slug }),
      });
      if (r.status === 429) {
        flashStatus("Give it a moment, then listen again");
        setListenLabel(f.slug, "▶ Listen");
        return;
      }
      if (r.status === 503) {
        flashStatus("Grok voice isn’t connected yet");
        setListenLabel(f.slug, "▶ Listen");
        return;
      }
      if (!r.ok) {
        flashStatus("Could not play this life");
        setListenLabel(f.slug, "▶ Listen");
        return;
      }
      const blob = await r.blob();
      objectUrl = URL.createObjectURL(blob);
      player = new Audio(objectUrl);
      player.onended = () => stopSpeak();
      player.onerror = () => {
        flashStatus("Could not play this life");
        stopSpeak();
      };
      playingSlug = f.slug;
      setListenLabel(f.slug, "■ Stop");
      await player.play();
    } catch (_) {
      flashStatus("Could not play this life");
      setListenLabel(f.slug, "▶ Listen");
    }
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
    if (core()) {
      const prev = core().onFigureOpen;
      core().onFigureOpen = (f) => {
        if (typeof prev === "function") prev(f);
        enhanceDrawer(f);
      };
    }
  }

  window.HumanitasFeatures = { init, enhanceDrawer, speakFigure, shareFigure, stopSpeak };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0));
  } else {
    setTimeout(init, 0);
  }
})();
