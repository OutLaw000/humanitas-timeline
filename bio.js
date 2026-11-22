/**
 * Humanity’s Atlas — the ONE bio layout, used for the 115 curated figures,
 * Community entries, and generated search profiles alike.
 *
 * Order (always the same; empty sections are omitted, never padded):
 *   Lead → Life at a glance → Key contributions → Notable works, inventions & offices
 *   → Life and career → Legacy and impact → Principles and words → Sources → Related
 *
 * Every string is escaped unless the model sets raw:true (curated build data only).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.HumanitasBio = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const escHtml = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  /**
   * m = {
   *  raw, kicker, photo (html), badges:[label], name, epithet,
   *  actions (html), lead, glance:[[label,value]],
   *  contributions:[text], works:[{name, kind, status, statusLabel, text}],
   *  life:[{title, paras:[text]}], legacy:{paras:[text], today:[text]},
   *  principles:[text], outlook:[{label,text}], quotes:[{text,source}],
   *  sources:[{label,url,note}], related:[{href, name, epithet}], beforeSources (html)
   * }
   */
  function render(m, o) {
    o = o || {};
    const e = m.raw ? (s) => String(s == null ? "" : s) : escHtml;
    const H = o.headingTag || "h2";
    const sec = (cls, title, body) =>
      body ? `<section class="bio-sec ${cls}" aria-labelledby="bio-${cls}"><${H} id="bio-${cls}">${title}</${H}>${body}</section>` : "";
    const html = [];

    if (m.photo) html.push(m.photo);
    if (m.kicker) html.push(`<p class="who-kicker">${escHtml(m.kicker)}</p>`);
    if (m.badges && m.badges.length) html.push(`<div class="tl-badges">${m.badges.map((b) => `<span class="badge">${escHtml(b)}</span>`).join(" ")}</div>`);
    html.push(`<h1 class="bio-name"${o.titleId ? ` id="${o.titleId}"` : ""}>${e(m.name)}</h1>`);
    if (m.epithet) html.push(`<p class="epithet bio-epithet">${e(m.epithet)}</p>`);
    if (m.actions) html.push(m.actions);

    if (m.lead) html.push(`<section class="bio-sec bio-lead-sec"><p class="bio-lead">${e(m.lead)}</p></section>`);

    if (m.glance && m.glance.length) {
      html.push(
        sec(
          "glance",
          "Life at a glance",
          `<dl class="fig-meta bio-glance">${m.glance
            .filter((x) => x && x[1])
            .map(([k, v]) => `<div><dt>${escHtml(k)}</dt><dd>${e(v)}</dd></div>`)
            .join("")}</dl>`
        )
      );
    }

    if (m.contributions && m.contributions.length) {
      html.push(sec("contrib", "Key contributions", `<ol class="accomplishments-list bio-contrib">${m.contributions.map((a) => `<li>${e(a)}</li>`).join("")}</ol>`));
    }

    if (m.works && m.works.length) {
      html.push(
        sec(
          "works",
          "Notable works, inventions and offices",
          `<div class="bio-works">${m.works
            .map(
              (w) =>
                `<div class="creation-card"><h3>${e(w.name)}</h3>${
                  w.statusLabel ? `<span class="badge badge-status ${escHtml(w.status || "")}">${e(w.statusLabel)}</span>` : w.kind ? `<span class="badge">${escHtml(w.kind)}</span>` : ""
                }${w.text ? `<p>${e(w.text)}</p>` : ""}</div>`
            )
            .join("")}</div>`
        )
      );
    }

    if (m.life && m.life.length) {
      html.push(
        sec(
          "life",
          "Life and career",
          m.life.map((c) => `${c.title ? `<h3>${e(c.title)}</h3>` : ""}${(c.paras || []).map((p) => `<p>${e(p)}</p>`).join("")}`).join("")
        )
      );
    }

    if (m.legacy && ((m.legacy.paras && m.legacy.paras.length) || (m.legacy.today && m.legacy.today.length))) {
      html.push(
        sec(
          "legacy",
          "Legacy and impact",
          (m.legacy.paras || []).map((p) => `<p>${e(p)}</p>`).join("") +
            ((m.legacy.today || []).length ? `<ul class="bio-today">${m.legacy.today.map((t) => `<li>${e(t)}</li>`).join("")}</ul>` : "")
        )
      );
    }

    const pw =
      (m.outlook || []).map((x) => `<p><strong>${escHtml(x.label)}</strong><br/>${e(x.text)}</p>`).join("") +
      ((m.principles || []).length ? `<ul class="bio-principles">${m.principles.map((p) => `<li>${e(p)}</li>`).join("")}</ul>` : "") +
      (m.quotes || [])
        .map((q) => `<blockquote class="quote-block"><p>“${e(q.text)}”</p>${q.source ? `<footer>— ${e(q.source)}</footer>` : ""}</blockquote>`)
        .join("");
    html.push(sec("words", "Principles and words", pw));

    if (m.beforeSources) html.push(m.beforeSources);

    if (m.sources && m.sources.length) {
      html.push(
        sec(
          "sources",
          "Sources",
          `<ul class="bio-sources">${m.sources
            .map(
              (s) =>
                `<li><a href="${escHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escHtml(s.label)}</a>${s.note ? ` <span>${escHtml(s.note)}</span>` : ""}</li>`
            )
            .join("")}</ul><p class="bio-source-note">Every statement on this page traces to Wikipedia, Wikidata, Wikiquote, or the curated Humanity’s Atlas record. Nothing is invented. Same standard for everyone: contributions first, neutral language.</p>`
        )
      );
    }

    if (m.related && m.related.length) {
      html.push(
        sec(
          "related",
          "Related figures",
          `<div class="related-list">${m.related
            .map((r) => `<a class="related-btn" href="${escHtml(r.href)}"><span><strong>${e(r.name)}</strong><span>${e(r.epithet || "")}</span></span><span>→</span></a>`)
            .join("")}</div>`
        )
      );
    }
    return html.join("");
  }

  function sourceLinks(src) {
    // src: {q: "Q123", w: "Wikipedia_Title", wq: true|false (wikiquote page exists)}
    const out = [];
    if (!src) return out;
    if (src.w) out.push({ label: "Wikipedia", url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(src.w.replace(/ /g, "_")).replace(/%2F/g, "/").replace(/%3A/g, ":"), note: src.w.replace(/_/g, " ") });
    if (src.q && /^Q\d+$/.test(src.q)) out.push({ label: "Wikidata", url: "https://www.wikidata.org/wiki/" + src.q, note: src.q });
    if (src.wq) out.push({ label: "Wikiquote", url: "https://en.wikiquote.org/wiki/" + encodeURIComponent((src.wq === true ? src.w : src.wq).replace(/ /g, "_")), note: "attributed quotations" });
    return out;
  }

  /**
   * The same standard for the curated 115: one model, built from the curated record plus
   * Wikidata facts (data-sources.js). deps = {CAT, STATUS, formatLifespan, sources, figures}.
   */
  function fromCurated(f, deps) {
    const CAT = deps.CAT || {}, STATUS = deps.STATUS || {};
    const Ed = deps.editorial || (typeof HumanitasEditorial !== "undefined" ? HumanitasEditorial : null);
    const src = (deps.sources || {})[f.slug] || null;
    const glance = [
      ["Lived", deps.formatLifespan(f)],
      src && src.b ? ["Born in", src.b] : null,
      src && src.d ? ["Died in", src.d] : null,
      f.eraLabel ? ["Era", f.eraLabel] : null,
      f.region ? ["Region", f.region] : null,
      f.civilization ? ["Civilization", f.civilization] : null,
      src && src.o && src.o.length ? ["Roles", src.o.join(" · ")] : null,
      src && src.e && src.e.length ? ["Education", src.e.join(" · ")] : null,
    ].filter(Boolean);
    const ph = f.philosophy || {};
    const outlook = [];
    if (ph.viewOfHumanity) outlook.push({ label: "View of humanity", text: ph.viewOfHumanity });
    if (ph.howWeOperate) outlook.push({ label: "How we should operate", text: ph.howWeOperate });
    const related = (f.relatedSlugs || [])
      .map((s) => (deps.figures || []).find((x) => x.slug === s))
      .filter(Boolean)
      .map((r) => ({ href: "/figure/" + r.slug, name: r.name, epithet: r.epithet }));
    const works = (f.creations || []).map((c) => ({
      name: c.name,
      status: c.status,
      statusLabel: STATUS[c.status] || c.status,
      text: [c.description, c.modernPresence ? "Today: " + c.modernPresence : ""].filter(Boolean).join(" "),
    }));
    return {
      raw: true,
      badges: (f.categories || []).map((c) => CAT[c] || c),
      name: f.name,
      epithet: f.epithet || "",
      lead: Ed ? Ed.trimLead(f.summary || "") : f.summary || "",
      glance,
      contributions: (f.accomplishments || []).slice(0, 6),
      works,
      life: [{ paras: f.biography || [] }],
      legacy: { paras: f.legacy ? [f.legacy] : [], today: f.todayRelevance || [] },
      outlook,
      principles: ph.corePrinciples || [],
      quotes: (ph.keyQuotes || []).map((q) => ({ text: q.text, source: q.source || "" })),
      sources: sourceLinks(src),
      related,
    };
  }

  return { render, sourceLinks, escHtml, fromCurated };
});
