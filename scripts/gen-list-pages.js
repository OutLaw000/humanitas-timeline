#!/usr/bin/env node
/** Generates community.html, recent.html, trending.html from who.html (same header/footer/CSP-safe scripts). */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const who = fs.readFileSync(path.join(root, "who.html"), "utf8");
const headEnd = who.indexOf("</head>");
const mainStart = who.indexOf('<main class="who-page');
const mainEnd = who.indexOf("</main>") + "</main>".length;
const bodyStart = who.indexOf("<body>");
const footerStart = who.indexOf("<footer");
const footerEnd = who.indexOf("</footer>") + "</footer>".length;
const pages = [
  { file: "community.html", path: "/community", kind: "community", h1: "Community timeline", tab: "community",
    title: "Community timeline — Humanity’s Atlas",
    lead: "Search any name. If the public record is strong enough, they appear here — same biography as the 115." },
  { file: "recent.html", path: "/recent", kind: "recent", h1: "Recently explored", tab: "recent",
    title: "Recently explored — Humanity’s Atlas",
    lead: "The latest people opened on Humanity’s Atlas. Anonymous: only who was opened is kept, never by whom." },
  { file: "trending.html", path: "/trending", kind: "week", h1: "Most explored this week", tab: "week",
    title: "Most explored this week — Humanity’s Atlas",
    lead: "Ranked by unique explorers this ISO week, so one person refreshing cannot move the list." },
];
const tab = (id, href, label, cur) => `<a class="list-tab${id === cur ? " is-active" : ""}" href="${href}"${id === cur ? ' aria-current="page"' : ""}>${label}</a>`;
for (const p of pages) {
  let head = who.slice(0, headEnd);
  head = head
    .replace(/<title>[^<]*<\/title>/, `<title>${p.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${p.lead}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${p.title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${p.lead}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1https://humanitysatlas.com${p.path}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${p.title}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${p.lead}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1https://humanitysatlas.com${p.path}`);
  const header = who.slice(bodyStart, mainStart);
  const main = `<main class="who-page fig-page list-page" id="who-page">
    <a class="fig-back" href="/">← Humanity’s Atlas timeline</a>
    <p class="who-kicker">Humanity’s Atlas</p>
    <h1 class="who-nf-title">${p.h1}</h1>
    <p class="epithet who-epithet">${p.lead}</p>
    <nav class="list-tabs" aria-label="Lists">${tab("community", "/community", "Community", p.tab)}${tab("recent", "/recent", "Recently explored", p.tab)}${tab("week", "/trending", "Most explored this week", p.tab)}</nav>
    <div id="list-root" data-kind="${p.kind}"><p class="who-loading">Loading…</p></div>
    ${p.kind === "community" ? '<section class="bio-sec rubric" id="rubric"></section>' : ""}
  </main>`;
  const footer = who.slice(footerStart, footerEnd);
  const tail = `

  <script src="/list-pages.js?v=4"></script>
  <script src="https://ameriking.io/made.js?v=6" defer></script>
<script src="/logos/dna-runtime.js" defer></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, p.file), head + "</head>\n" + header + main + "\n\n  " + footer + tail);
}
console.log("wrote", pages.map((p) => p.file).join(", "));
