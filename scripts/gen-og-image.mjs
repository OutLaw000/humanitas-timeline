#!/usr/bin/env node
/**
 * Share-card art for Humanity’s Atlas (1200×630).
 * Uses the real parametric DNA geometry from logo-dna.mjs at a mid-twist frame.
 * Recolor this card once a palette is chosen.
 *
 * Usage: node scripts/gen-og-image.mjs
 * Writes: og/og-card.html (render source) and prints the mid-twist SVG path.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PARAMS, primitives } from "./logo-dna.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const phase = Number(process.argv[2] ?? Math.PI * 0.90);
const prefix = "ogdna";
const { teal, gold, violet } = PARAMS.colors;

const items = primitives(phase, PARAMS);
let body = "";
for (const it of items) {
  if (it.kind === "strand") {
    body += `<path d="${it.d}" fill="url(#${prefix}-grad${it.s})" opacity="${it.opacity.toFixed(2)}"/>`;
  } else {
    const w = (it.width ?? PARAMS.rungWidth).toFixed(2);
    body += `<path d="${it.d}" fill="none" stroke="url(#${prefix}-rung)" stroke-width="${w}" stroke-linecap="round" opacity="${it.opacity.toFixed(2)}"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="${prefix}-grad0" x1="24" y1="8" x2="40" y2="56" gradientUnits="userSpaceOnUse" color-interpolation="sRGB">
      <stop offset="0%" stop-color="${teal}"/>
      <stop offset="100%" stop-color="${gold}"/>
    </linearGradient>
    <linearGradient id="${prefix}-grad1" x1="24" y1="8" x2="40" y2="56" gradientUnits="userSpaceOnUse" color-interpolation="sRGB">
      <stop offset="0%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="${violet}"/>
    </linearGradient>
    <linearGradient id="${prefix}-rung" x1="20" y1="14" x2="44" y2="50" gradientUnits="userSpaceOnUse" color-interpolation="sRGB">
      <stop offset="0%" stop-color="${teal}"/>
      <stop offset="50%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="${violet}"/>
    </linearGradient>
    <filter id="${prefix}-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.85"/>
    </filter>

  </defs>
  <g filter="url(#${prefix}-glow)" opacity="0.38">${body}</g>
  <g>${body}</g>
</svg>`;

const cormorant = "/usr/share/fonts/truetype/sand-box/google/Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf";
const outfit = "/usr/share/fonts/truetype/sand-box/google/Outfit/Outfit-VariableFont_wght.ttf";

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
@font-face {
  font-family: "Cormorant Garamond";
  src: url("file://${cormorant}") format("truetype");
  font-weight: 100 900;
  font-style: normal;
}
@font-face {
  font-family: "Outfit";
  src: url("file://${outfit}") format("truetype");
  font-weight: 100 900;
  font-style: normal;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #000; }
.card {
  width: 1200px;
  height: 630px;
  position: relative;
  overflow: hidden;
  background: #03050a;
  color: #f5f7f8;
  /* Safe zone guides are optional via ?guides=1 */
}
.veil {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 80% at 18% 50%, rgba(56, 189, 248, 0.14), transparent 58%),
    radial-gradient(ellipse 55% 70% at 88% 30%, rgba(167, 139, 250, 0.12), transparent 62%),
    radial-gradient(ellipse 50% 55% at 70% 90%, rgba(255, 184, 77, 0.07), transparent 55%),
    radial-gradient(ellipse 90% 70% at 50% 120%, rgba(10, 18, 32, 0.9), transparent 50%);
}
.stars { position: absolute; inset: 0; }
.stars i {
  position: absolute;
  width: 2px; height: 2px; border-radius: 50%;
  background: rgba(220, 235, 255, 0.55);
}
.stars i.warm { background: rgba(255, 220, 180, 0.45); width: 2.5px; height: 2.5px; }
.layout {
  position: absolute;
  /* Safe margins: 96x72 — X/iMessage crops tend to eat the outer ~8–10%. */
  top: 72px; right: 96px; bottom: 72px; left: 96px;
  display: flex;
  align-items: center;
  gap: 36px;
}
.strand {
  flex: 0 0 390px;
  width: 390px;
  height: 486px;
  filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.22))
          drop-shadow(0 0 36px rgba(167, 139, 250, 0.14));
}
.strand svg { width: 100%; height: 100%; display: block; overflow: visible; }
.copy { flex: 1; min-width: 0; padding-top: 8px; }
.wordmark {
  font-family: "Cormorant Garamond", serif;
  font-weight: 500;
  font-size: 92px;
  line-height: 0.95;
  letter-spacing: 0.015em;
  color: #f5f7f8;
  font-synthesis: none;
}
.wordmark .line2 { display: block; letter-spacing: 0.06em; }
.hairline {
  width: 56px;
  height: 2px;
  margin: 28px 0 22px;
  border-radius: 2px;
  background: linear-gradient(90deg, #7dd3fc, #f5c16c 50%, #a78bfa);
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.35);
}
.tagline {
  font-family: "Outfit", system-ui, sans-serif;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8a9ea8;
  line-height: 1.35;
}
.guides {
  display: none;
  position: absolute; inset: 0; pointer-events: none;
  border: 72px solid rgba(255, 0, 0, 0.08);
  box-shadow: inset 0 0 0 24px rgba(255, 255, 0, 0.06);
}
.guides::after {
  content: "";
  position: absolute;
  left: 96px; right: 96px; top: 72px; bottom: 72px;
  border: 1px dashed rgba(255,255,255,0.25);
}
</style>
</head>
<body>
  <div class="card" id="card">
    <div class="veil"></div>
    <div class="stars" id="stars"></div>
    <div class="layout">
      <div class="strand">${svg}</div>
      <div class="copy">
        <div class="wordmark">Humanity’s<br><span class="line2">Atlas</span></div>
        <div class="hairline"></div>
        <div class="tagline">Phylogeny of greatness</div>
      </div>
    </div>
    <div class="guides" id="guides"></div>
  </div>
  <script>
    const root = document.getElementById("stars");
    const dots = [
      [8,12],[14,28],[22,18],[31,8],[40,22],[52,14],[61,30],[73,10],
      [18,70],[27,82],[44,76],[58,88],[69,68],[81,80],[12,48],[86,42],
      [77,22],[35,62],[48,36],[90,16],[6,88],[84,58]
    ];
    dots.forEach(([x,y], i) => {
      const el = document.createElement("i");
      if (i % 5 === 0) el.className = "warm";
      el.style.left = x + "%";
      el.style.top = y + "%";
      el.style.opacity = (0.25 + (i % 4) * 0.15).toString();
      root.appendChild(el);
    });
  </script>
</body>
</html>
`;

const outDir = join(ROOT, "og");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "og-card.html"), html);
console.log("wrote og/og-card.html phase", phase.toFixed(3));
