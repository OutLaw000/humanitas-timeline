#!/usr/bin/env node
/** Writes api/_lib/speak.json: slug → spoken script for Grok TTS (Ara). */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

global.window = {};
for (let i = 1; i <= 7; i++) require(path.join(root, "data" + i + ".js"));
require(path.join(root, "data-enrichment.js"));

const MAX_CHARS = 1400;

function formatYear(y) {
  if (y == null || Number.isNaN(Number(y))) return "";
  return y < 0 ? String(Math.abs(y)) + " BCE" : String(y) + " CE";
}

function formatLifespan(f) {
  const b = formatYear(f.birthYear);
  if (!b) return "";
  if (f.deathYear == null) return b + " to the present";
  return b + " to " + formatYear(f.deathYear);
}

function spokenName(f) {
  return String(f.name || "")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scriptFor(f) {
  const parts = [];
  const name = spokenName(f) || f.slug;
  parts.push(name + ".");
  if (f.epithet) parts.push(f.epithet + ".");
  const life = formatLifespan(f);
  if (life) parts.push("Lived " + life + ".");
  if (f.summary) parts.push(String(f.summary).trim());
  const acc = (f.accomplishments || []).slice(0, 4);
  if (acc.length) parts.push("Accomplishments. " + acc.join(". ") + ".");
  const bio = (f.biography || []).slice(0, 2).join(" ").trim();
  if (bio) parts.push(bio);
  const pr = ((f.philosophy && f.philosophy.corePrinciples) || []).slice(0, 3);
  if (pr.length) parts.push("Principles. " + pr.join(". ") + ".");
  const q = f.philosophy && f.philosophy.keyQuotes && f.philosophy.keyQuotes[0];
  if (q && q.text) {
    const said = String(q.text).replace(/^[.…]+/, "").trim();
    if (said) parts.push("In their own words. " + said);
  }
  if (f.legacy) parts.push(String(f.legacy).trim());
  return parts.filter(Boolean).join(" [pause] ").slice(0, MAX_CHARS);
}

const out = {};
for (const f of window.HUMANITAS.figures) {
  out[f.slug] = scriptFor(f);
}

const dest = path.join(root, "api", "_lib", "speak.json");
const json = JSON.stringify(out);
fs.writeFileSync(dest, json);
console.log(Object.keys(out).length, "speak scripts", Buffer.byteLength(json), "bytes");
