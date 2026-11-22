/**
 * Header search: any name → catalog figure, generated public-record page, or a clean not-found.
 */
(() => {
  const $ = (sel, el = document) => el.querySelector(sel);

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cleanQuery(raw) {
    return String(raw || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
  }

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function figures() {
    return (window.HUMANITAS && window.HUMANITAS.figures) || [];
  }

  function lastToken(name) {
    const parts = norm(name)
      .split(" ")
      .filter((p) => p && !["jr", "sr", "ii", "iii", "iv"].includes(p));
    return parts[parts.length - 1] || "";
  }

  function scoreFigure(f, q) {
    const nq = norm(q);
    if (!nq) return 0;
    const name = norm(f.name);
    const slug = norm(f.slug);
    const epithet = norm(f.epithet);
    if (name === nq || slug === nq) return 100;
    if (lastToken(f.name) === nq) return 90;
    if (name.startsWith(nq) || slug.startsWith(nq)) return 80;
    const parts = nq.split(" ");
    if (parts.every((p) => name.includes(p))) return 70;
    if (name.includes(nq) || slug.includes(nq)) return 60;
    if (epithet.includes(nq)) return 40;
    return 0;
  }

  function bestCatalog(q) {
    const list = figures()
      .map((f) => ({ f, s: scoreFigure(f, q) }))
      .filter((x) => x.s >= 60)
      .sort((a, b) => b.s - a.s);
    return list;
  }

  function pickCatalog(q) {
    const hits = bestCatalog(q);
    if (!hits.length) return null;
    if (hits[0].s >= 80 && (hits.length === 1 || hits[0].s > hits[1].s)) return hits[0].f;
    if (hits.length === 1) return hits[0].f;
    return null;
  }

  function goLookup(q) {
    const query = cleanQuery(q);
    if (!query) return;
    const hit = pickCatalog(query);
    if (hit) {
      location.href = "/figure/" + hit.slug;
      return;
    }
    location.href = "/who?q=" + encodeURIComponent(query);
  }

  function renderSuggest(box, q) {
    if (!box) return;
    const query = cleanQuery(q);
    if (query.length < 2) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    const hits = bestCatalog(query).slice(0, 6);
    if (!hits.length) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    box.hidden = false;
    box.innerHTML = hits
      .map(
        ({ f }) =>
          `<button type="button" class="who-suggest-item" data-slug="${esc(f.slug)}"><strong>${esc(f.name)}</strong><span>${esc(f.epithet || "")}</span></button>`
      )
      .join("");
  }

  function bindForm(form) {
    const input = $("input[type='search']", form);
    const box = $(".who-suggest", form);
    if (!input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      goLookup(input.value);
    });

    input.addEventListener("input", () => renderSuggest(box, input.value));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (box) box.hidden = true;
      }
    });
    input.addEventListener("blur", () => {
      setTimeout(() => {
        if (box) box.hidden = true;
      }, 180);
    });
    input.addEventListener("focus", () => renderSuggest(box, input.value));

    if (box) {
      box.addEventListener("mousedown", (e) => {
        const btn = e.target.closest("[data-slug]");
        if (!btn) return;
        e.preventDefault();
        location.href = "/figure/" + btn.dataset.slug;
      });
    }
  }

  function init() {
    document.querySelectorAll("form.who-search").forEach(bindForm);
  }

  window.HumanitasWhoSearch = { goLookup, bestCatalog, pickCatalog, cleanQuery, norm, esc };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
