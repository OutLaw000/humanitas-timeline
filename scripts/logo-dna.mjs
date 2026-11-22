#!/usr/bin/env node
/**
 * Humanitas DNA strand — original parametric generator.
 *
 * Proof of authorship: this file is the source of the geometry. It does not
 * trace, import, or embed any stock icon, clip art, or third-party path data.
 * Every coordinate is computed from the parameters below and written to SVG.
 *
 * Signature ("leaning lantern"):
 *   - 2.35 turns (not an integer), so the top and bottom do not mirror
 *   - axis leans 8.5° in the plane
 *   - radius swells in the middle and tapers at the ends (lantern envelope)
 *   - strands themselves taper to points, drawn as continuous ribbons
 *   - seven rungs in a short–long rhythm with a slightly longer "key" rung
 *     just above center
 *
 * Usage: node scripts/logo-dna.mjs
 * Writes: logos/dna-strand.svg, logos/dna-strand-inline.svg, favicon.svg
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const PARAMS = {
  view: 64,
  y0: 7.0,
  y1: 57.0,
  turns: 2.35,
  leanDeg: 8.5,
  radiusEnd: 6.4,
  radiusMid: 14.6,
  strokeEnd: 0.62,
  strokeMid: 2.4,
  samples: 80,
  rungScales: [0.58, 0.8, 0.68, 1, 0.7, 0.82, 0.6],
  rungWidth: 1.7,
  rungT0: 0.13,
  rungT1: 0.87,
  staticPhase: Math.PI * 0.31,
  periodMs: 9000,
  colors: {
    teal: "#5eead4",
    gold: "#f5c16c",
    violet: "#a78bfa",
  },
};

const TAU = Math.PI * 2;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function envelope(t) {
  return Math.pow(Math.sin(Math.PI * t), 0.82);
}

function radiusAt(t, p = PARAMS) {
  return lerp(p.radiusEnd, p.radiusMid, envelope(t));
}

function widthAt(t, p = PARAMS) {
  return lerp(p.strokeEnd, p.strokeMid, envelope(t));
}

export function helixPoint(s, t, phase, p = PARAMS) {
  const lean = (p.leanDeg * Math.PI) / 180;
  const theta = t * p.turns * TAU + phase + s * Math.PI;
  const r = radiusAt(t, p);
  const yAxis = lerp(p.y0, p.y1, t);
  const xH = r * Math.cos(theta);
  const zH = r * Math.sin(theta);
  const mid = p.view / 2;
  const x = xH * Math.cos(lean) + (yAxis - mid) * Math.sin(lean) + mid;
  const y = -xH * Math.sin(lean) + (yAxis - mid) * Math.cos(lean) + mid;
  return { x, y, z: zH, t, s, w: widthAt(t, p) };
}

function fmt(n) {
  return Number(n).toFixed(2).replace(/^-0\.00$/, "0.00");
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function lerpPt(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
    w: lerp(a.w, b.w, t),
    t: lerp(a.t, b.t, t),
    s: a.s,
  };
}

function meanZ(pts) {
  return pts.reduce((s, p) => s + p.z, 0) / pts.length;
}

/**
 * Split a sampled strand into contiguous runs around z = 0.
 * Each run overlaps the crossing by one sample so seams don't show,
 * and we tag which ends are true tips (rounded) vs depth cuts (butt).
 */
function splitRuns(pts) {
  const runs = [];
  let start = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const crossed = !(a.z === 0 || b.z === 0 || (a.z < 0) === (b.z < 0));
    if (crossed) {
      const slice = pts.slice(start, i + 1); // overlap past the cut
      if (slice.length >= 2) {
        runs.push({ points: slice, capStart: start === 0, capEnd: false });
      }
      start = i - 1; // overlap the previous sample
    }
  }
  const tail = pts.slice(start);
  if (tail.length >= 2) {
    runs.push({ points: tail, capStart: start === 0, capEnd: true });
  }
  return runs;
}

/** Continuous tapered ribbon. Rounded caps only on true tips, not depth cuts. */
export function ribbonPath(points, capStart = true, capEnd = true) {
  if (points.length < 2) return "";
  const left = [];
  const right = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const w = points[i].w;
    left.push([points[i].x + nx * w, points[i].y + ny * w]);
    right.push([points[i].x - nx * w, points[i].y - ny * w]);
  }
  let d = `M${fmt(left[0][0])} ${fmt(left[0][1])}`;
  for (let i = 1; i < left.length; i++) d += `L${fmt(left[i][0])} ${fmt(left[i][1])}`;
  const last = points[points.length - 1];
  const rLast = right[right.length - 1];
  // Pointed tips (signature taper). Depth cuts close with a butt join.
  if (capEnd) {
    const tip = extendTip(points, true);
    d += `L${fmt(tip.x)} ${fmt(tip.y)}L${fmt(rLast[0])} ${fmt(rLast[1])}`;
  } else {
    d += `L${fmt(rLast[0])} ${fmt(rLast[1])}`;
  }
  for (let i = right.length - 2; i >= 0; i--) d += `L${fmt(right[i][0])} ${fmt(right[i][1])}`;
  if (capStart) {
    const tip = extendTip(points, false);
    d += `L${fmt(tip.x)} ${fmt(tip.y)}L${fmt(left[0][0])} ${fmt(left[0][1])}Z`;
  } else {
    d += `L${fmt(left[0][0])} ${fmt(left[0][1])}Z`;
  }
  return d;
}

function extendTip(points, atEnd) {
  const a = atEnd ? points[points.length - 2] : points[1];
  const b = atEnd ? points[points.length - 1] : points[0];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ext = Math.max(b.w * 0.85, 0.35);
  return { x: b.x + (dx / len) * ext, y: b.y + (dy / len) * ext };
}

function rungItems(phase, p = PARAMS) {
  const n = p.rungScales.length;
  const out = [];
  for (let k = 0; k < n; k++) {
    const t = lerp(p.rungT0, p.rungT1, n === 1 ? 0.5 : k / (n - 1));
    const scale = p.rungScales[k];
    const a0 = helixPoint(0, t, phase, p);
    const b0 = helixPoint(1, t, phase, p);
    const mx = (a0.x + b0.x) / 2;
    const my = (a0.y + b0.y) / 2;
    const ax = mx + (a0.x - mx) * scale;
    const ay = my + (a0.y - my) * scale;
    const bx = mx + (b0.x - mx) * scale;
    const by = my + (b0.y - my) * scale;
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 1.1) continue;
    const z = (a0.z + b0.z) / 2;
    const opacity = clamp(0.22 + 0.55 * (0.5 + 0.5 * (z / p.radiusMid)), 0.14, 0.8);
    out.push({
      kind: "rung",
      z,
      d: `M${fmt(ax)} ${fmt(ay)}L${fmt(bx)} ${fmt(by)}`,
      opacity,
    });
  }
  return out;
}

export function primitives(phase, p = PARAMS) {
  const items = [];
  for (let s = 0; s < 2; s++) {
    const pts = [];
    for (let i = 0; i <= p.samples; i++) pts.push(helixPoint(s, i / p.samples, phase, p));
    for (const run of splitRuns(pts)) {
      items.push({ kind: "strand", z: meanZ(run.points), d: ribbonPath(run.points, run.capStart, run.capEnd) });
    }
  }
  items.push(...rungItems(phase, p));
  items.sort((u, v) => u.z - v.z);
  return items;
}

function markupFromPrimitives(items, prefix) {
  const fillS = `url(#${prefix}-grad)`;
  const strokeR = `url(#${prefix}-rung)`;
  let out = "";
  for (const it of items) {
    if (it.kind === "strand") {
      out += `<path d="${it.d}" fill="${fillS}"/>`;
    } else {
      out += `<path d="${it.d}" fill="none" stroke="${strokeR}" stroke-width="${PARAMS.rungWidth}" stroke-linecap="round" opacity="${it.opacity.toFixed(2)}"/>`;
    }
  }
  return out;
}

function defs(prefix, { glow } = {}) {
  const { teal, gold, violet } = PARAMS.colors;
  return `
  <defs>
    <linearGradient id="${prefix}-grad" x1="18" y1="6" x2="48" y2="58" gradientUnits="userSpaceOnUse" color-interpolation="sRGB">
      <stop offset="0%" stop-color="${teal}"/>
      <stop offset="46%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="${violet}"/>
    </linearGradient>
    <linearGradient id="${prefix}-rung" x1="20" y1="14" x2="44" y2="50" gradientUnits="userSpaceOnUse" color-interpolation="sRGB">
      <stop offset="0%" stop-color="${teal}"/>
      <stop offset="50%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="${violet}"/>
    </linearGradient>
    ${
      glow
        ? `<filter id="${prefix}-glow" x="-35%" y="-35%" width="170%" height="170%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.9"/>
    </filter>`
        : ""
    }
  </defs>`;
}

export function buildSvg(opts = {}) {
  const p = PARAMS;
  const prefix = opts.prefix || "hdna";
  const glow = opts.glow !== false && !opts.simple;
  const items = primitives(p.staticPhase, p);
  const body = markupFromPrimitives(items, prefix);
  const glowStyle = glow
    ? `#${prefix}-glow-layer{animation:${prefix}-breathe 4.2s ease-in-out infinite}` +
      `@keyframes ${prefix}-breathe{0%,100%{opacity:.32}50%{opacity:.62}}` +
      `@media (prefers-reduced-motion:reduce){#${prefix}-glow-layer{animation:none!important;opacity:.32}}`
    : "";
  const style = `<style>${glowStyle}</style>`;
  const glowLayer = glow
    ? `<g id="${prefix}-glow-layer" filter="url(#${prefix}-glow)" opacity=".4">${body}</g>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.view} ${p.view}" fill="none" role="img" aria-label="Humanitas" class="humanitas-dna" data-dna-prefix="${prefix}">
  <title>Humanitas — original DNA strand</title>
  ${style}
  ${defs(prefix, { glow })}
  ${glowLayer}
  <g id="${prefix}-static">${body}</g>
  <g id="${prefix}-live" opacity="0"></g>
</svg>`;
}

export function buildInline(opts = {}) {
  return buildSvg(opts)
    .replace(/^<\?xml[^>]*>\s*/, "")
    .trim();
}

export function buildFaviconSvg() {
  const saved = { ...PARAMS };
  Object.assign(PARAMS, {
    samples: 64,
    strokeEnd: 0.85,
    strokeMid: 2.75,
    radiusEnd: 6.8,
    radiusMid: 15.0,
  });
  const prefix = "fav";
  const items = primitives(PARAMS.staticPhase, PARAMS);
  Object.assign(PARAMS, saved);
  const body = markupFromPrimitives(items, prefix);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${saved.view} ${saved.view}" fill="none">
  ${defs(prefix, { glow: false })}
  ${body}
</svg>`;
}

/**
 * Browser runtime: same math as this generator. Written to logos/dna-runtime.js
 * so the inline SVGs stay script-free (safe to place in HTML) and one file
 * can animate every .humanitas-dna mark on the page.
 */
export function buildRuntimeJs(p = PARAMS) {
  const payload = {
    view: p.view,
    y0: p.y0,
    y1: p.y1,
    turns: p.turns,
    leanDeg: p.leanDeg,
    radiusEnd: p.radiusEnd,
    radiusMid: p.radiusMid,
    strokeEnd: p.strokeEnd,
    strokeMid: p.strokeMid,
    samples: p.samples,
    rungScales: p.rungScales,
    rungWidth: p.rungWidth,
    rungT0: p.rungT0,
    rungT1: p.rungT1,
    staticPhase: p.staticPhase,
    periodMs: p.periodMs,
  };
  return `/* Humanitas DNA strand runtime
 * Generated by scripts/logo-dna.mjs — do not hand-edit; regenerate.
 * Same parametric helix used to author logos/dna-strand.svg.
 */
(function (global) {
  var P = ${JSON.stringify(payload, null, 2)};
  var TAU = Math.PI * 2;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function env(t) { return Math.pow(Math.sin(Math.PI * t), 0.82); }
  function fmt(n) { return n.toFixed(2); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function pt(s, t, phase) {
    var lean = P.leanDeg * Math.PI / 180;
    var theta = t * P.turns * TAU + phase + s * Math.PI;
    var r = lerp(P.radiusEnd, P.radiusMid, env(t));
    var yAxis = lerp(P.y0, P.y1, t);
    var xH = r * Math.cos(theta);
    var zH = r * Math.sin(theta);
    var mid = P.view / 2;
    return {
      x: xH * Math.cos(lean) + (yAxis - mid) * Math.sin(lean) + mid,
      y: -xH * Math.sin(lean) + (yAxis - mid) * Math.cos(lean) + mid,
      z: zH,
      t: t,
      s: s,
      w: lerp(P.strokeEnd, P.strokeMid, env(t))
    };
  }

  function lerpPt(a, b, t) {
    return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t), w: lerp(a.w, b.w, t), t: lerp(a.t, b.t, t), s: a.s };
  }

  function extendTip(points, atEnd) {
    var a = atEnd ? points[points.length - 2] : points[1];
    var b = atEnd ? points[points.length - 1] : points[0];
    var dx = b.x - a.x, dy = b.y - a.y;
    var len = Math.hypot(dx, dy) || 1;
    var ext = Math.max(b.w * 0.85, 0.35);
    return { x: b.x + (dx / len) * ext, y: b.y + (dy / len) * ext };
  }

  function ribbon(points, capStart, capEnd) {
    if (points.length < 2) return "";
    var L = [], R = [], i, a, b, dx, dy, len, nx, ny, w;
    for (i = 0; i < points.length; i++) {
      a = points[Math.max(0, i - 1)];
      b = points[Math.min(points.length - 1, i + 1)];
      dx = b.x - a.x; dy = b.y - a.y;
      len = Math.hypot(dx, dy) || 1;
      nx = -dy / len; ny = dx / len;
      w = points[i].w;
      L.push([points[i].x + nx * w, points[i].y + ny * w]);
      R.push([points[i].x - nx * w, points[i].y - ny * w]);
    }
    var d = "M" + fmt(L[0][0]) + " " + fmt(L[0][1]);
    for (i = 1; i < L.length; i++) d += "L" + fmt(L[i][0]) + " " + fmt(L[i][1]);
    var rLast = R[R.length - 1];
    if (capEnd) {
      var tipE = extendTip(points, true);
      d += "L" + fmt(tipE.x) + " " + fmt(tipE.y) + "L" + fmt(rLast[0]) + " " + fmt(rLast[1]);
    } else {
      d += "L" + fmt(rLast[0]) + " " + fmt(rLast[1]);
    }
    for (i = R.length - 2; i >= 0; i--) d += "L" + fmt(R[i][0]) + " " + fmt(R[i][1]);
    if (capStart) {
      var tipS = extendTip(points, false);
      d += "L" + fmt(tipS.x) + " " + fmt(tipS.y) + "L" + fmt(L[0][0]) + " " + fmt(L[0][1]) + "Z";
    } else {
      d += "L" + fmt(L[0][0]) + " " + fmt(L[0][1]) + "Z";
    }
    return d;
  }

  function runs(pts) {
    var out = [], start = 0, i, a, b, crossed, slice, tail;
    for (i = 1; i < pts.length; i++) {
      a = pts[i - 1]; b = pts[i];
      crossed = !(a.z === 0 || b.z === 0 || (a.z < 0) === (b.z < 0));
      if (crossed) {
        slice = pts.slice(start, i + 1);
        if (slice.length >= 2) out.push({ points: slice, capStart: start === 0, capEnd: false });
        start = i - 1;
      }
    }
    tail = pts.slice(start);
    if (tail.length >= 2) out.push({ points: tail, capStart: start === 0, capEnd: true });
    return out;
  }

  function meanZ(pts) {
    var s = 0, i;
    for (i = 0; i < pts.length; i++) s += pts[i].z;
    return s / pts.length;
  }

  function setGroup(el, html) {
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
    var doc = new DOMParser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg">' + html + "<" + "/svg>", "image/svg+xml");
    var root = doc.documentElement, n, next;
    for (n = root.firstChild; n; n = next) {
      next = n.nextSibling;
      el.appendChild(document.importNode(n, true));
    }
  }

  function draw(svg, prefix, phase) {
    var live = svg.querySelector("#" + prefix + "-live");
    if (!live) return;
    var items = [], s, i, n = P.samples, pts, k, run, ts, t, a, b, mx, my, ax, ay, bx, by, len, z, op, r;
    for (s = 0; s < 2; s++) {
      pts = [];
      for (i = 0; i <= n; i++) pts.push(pt(s, i / n, phase));
      run = runs(pts);
      for (i = 0; i < run.length; i++) {
        r = run[i];
        items.push({ kind: "strand", z: meanZ(r.points), d: ribbon(r.points, r.capStart, r.capEnd) });
      }
    }
    ts = P.rungScales;
    for (k = 0; k < ts.length; k++) {
      t = lerp(P.rungT0, P.rungT1, ts.length === 1 ? 0.5 : k / (ts.length - 1));
      a = pt(0, t, phase); b = pt(1, t, phase);
      mx = (a.x + b.x) / 2; my = (a.y + b.y) / 2;
      ax = mx + (a.x - mx) * ts[k]; ay = my + (a.y - my) * ts[k];
      bx = mx + (b.x - mx) * ts[k]; by = my + (b.y - my) * ts[k];
      len = Math.hypot(bx - ax, by - ay);
      if (len < 1.1) continue;
      z = (a.z + b.z) / 2;
      op = clamp(0.22 + 0.55 * (0.5 + 0.5 * (z / P.radiusMid)), 0.14, 0.8);
      items.push({ kind: "rung", z: z, d: "M" + fmt(ax) + " " + fmt(ay) + "L" + fmt(bx) + " " + fmt(by), op: op });
    }
    items.sort(function (u, v) { return u.z - v.z; });
    var h = "", gs = "url(#" + prefix + "-grad)", gr = "url(#" + prefix + "-rung)";
    for (i = 0; i < items.length; i++) {
      if (items[i].kind === "strand") h += '<path d="' + items[i].d + '" fill="' + gs + '"/>';
      else h += '<path d="' + items[i].d + '" fill="none" stroke="' + gr + '" stroke-width="' + P.rungWidth + '" stroke-linecap="round" opacity="' + items[i].op.toFixed(2) + '"/>';
    }
    setGroup(live, h); setGroup(svg.querySelector("#" + prefix + "-glow-layer"), h);
  }

  function start(svg) {
    if (!svg || svg._dnaStarted) return;
    var prefix = svg.getAttribute("data-dna-prefix");
    if (!prefix) {
      var id = svg.getAttribute("id") || "";
      prefix = id.endsWith("-root") ? id.slice(0, -5) : (id || "hdna");
    }
    var reduce = false;
    try { reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    if (reduce) return;
    var live = svg.querySelector("#" + prefix + "-live");
    var stat = svg.querySelector("#" + prefix + "-static");
    if (!live) return;
    svg._dnaStarted = true;
    if (stat) stat.setAttribute("opacity", "0");
    live.setAttribute("opacity", "1");
    var startT = null;
    function frame(now) {
      if (startT == null) startT = now;
      var phase = P.staticPhase + ((now - startT) % P.periodMs) / P.periodMs * TAU;
      draw(svg, prefix, phase);
      svg._dnaRaf = requestAnimationFrame(frame);
    }
    draw(svg, prefix, P.staticPhase);
    svg._dnaRaf = requestAnimationFrame(frame);
  }

  function enhance(root) {
    (root || document).querySelectorAll("svg.humanitas-dna").forEach(start);
  }

  var api = { enhance: enhance, start: start, params: P };
  global.HUMANITAS_DNA = api;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { enhance(document); });
  } else {
    enhance(document);
  }
})(typeof window !== "undefined" ? window : this);
`;
}

function main() {
  mkdirSync(join(ROOT, "logos"), { recursive: true });
  writeFileSync(join(ROOT, "logos/dna-strand.svg"), buildSvg({ prefix: "hdna", glow: true }));
  writeFileSync(join(ROOT, "logos/dna-strand-inline.svg"), buildInline({ prefix: "hdna", glow: true }));
  writeFileSync(join(ROOT, "favicon.svg"), buildFaviconSvg());
  writeFileSync(join(ROOT, "logos/dna-runtime.js"), buildRuntimeJs());
  console.log("wrote logos/dna-strand.svg, logos/dna-strand-inline.svg, logos/dna-runtime.js, favicon.svg");
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();

export default { PARAMS, helixPoint, primitives, ribbonPath, buildSvg, buildInline, buildFaviconSvg, buildRuntimeJs };
