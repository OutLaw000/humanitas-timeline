/**
 * /who — generated page for any searched name.
 * Catalog hit → figure page. Public encyclopedia record → composed profile.
 * Zero record → custom jokes that the person did not make the phylogeny.
 */
(() => {
  const esc =
    window.HumanitasWhoSearch?.esc ||
    ((s) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;"));
  const norm = window.HumanitasWhoSearch?.norm || ((s) => String(s).toLowerCase());
  const cleanQuery = window.HumanitasWhoSearch?.cleanQuery || ((s) => String(s || "").trim().slice(0, 80));
  const pickCatalog = window.HumanitasWhoSearch?.pickCatalog || (() => null);

  const root = document.getElementById("who-root");
  if (!root) return;

  function queryFromUrl() {
    const params = new URLSearchParams(location.search);
    if (params.get("q")) return cleanQuery(params.get("q"));
    const parts = location.pathname.split("/").filter(Boolean);
    const i = parts.indexOf("who");
    if (i >= 0 && parts[i + 1]) {
      return cleanQuery(decodeURIComponent(parts[i + 1]).replace(/[-_]+/g, " "));
    }
    return "";
  }

  function hashName(s) {
    let h = 2166136261;
    const n = norm(s);
    for (let i = 0; i < n.length; i++) {
      h ^= n.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function pick(arr, seed, salt) {
    return arr[(seed + salt) % arr.length];
  }

  function setMeta(title, description) {
    document.title = title;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", description.slice(0, 160));
  }

  function roastPage(name, reason) {
    const seed = hashName(name);
    const n = esc(name);
    const openers = [
      `The phylogeny keeps 110 chairs. <em>${n}</em> was offered a pamphlet and the door.`,
      `We ran <em>${n}</em> through 4,600 years of law, faith, science, and liberation. The archive answered in eleven milliseconds. That is not a compliment.`,
      `Hammurabi left a code. Nightingale left a profession. <em>${n}</em> left the search bar slightly warmer.`,
      `Greatness leaves residue: vaccines, republics, poems, trees. <em>${n}</em> left a query string.`,
      `The clerks opened the ledger. Lincoln was there. Hypatia was there. <em>${n}</em> was a blank line with confidence.`,
    ];
    const middles = [
      `Checked: the Code of Hammurabi — no. The Gettysburg Address — no. The Green Belt Movement — no. A group chat from last Tuesday — possibly.`,
      `If consequence were a mountain, <em>${n}</em> is the gift shop at the parking lot, closed, lights off, a handwritten sign that says “back never.”`,
      `History is a long hallway of statues. <em>${n}</em> is the fire extinguisher. Necessary in some buildings. Not this one.`,
      `We do not say <em>${n}</em> never lived. We say the species would not notice the difference. That is a rarer kind of immortality: total stealth.`,
      `Some names move armies. Some names move theorems. <em>${n}</em> moved the cursor and pressed Enter. Bold. Insufficient.`,
    ];
    const closers = [
      `Come back when you have a law, a hospital, a theorem, a crossing, or a tree. Until then the 110 will keep the lights on.`,
      `The timeline is not a yearbook. It is a short list of people who altered the weather of the species. Weather report for <em>${n}</em>: indoor.`,
      `There is still time. Malala was a child with a book. The door is not locked. It is simply not automatic.`,
      `If this stings, good. Sting is the first evidence you might yet do something. The archive is patient. It is not sentimental.`,
    ];
    const stamps = [
      "Finding: not in the 110. Not in the public encyclopedia. Filed under silence.",
      "Finding: no law, no lab, no liberation, no lyric that the species kept.",
      "Finding: the record did not sit up. The record did not blink.",
    ];
    if (reason === "wiki-miss") {
      stamps.unshift("Even the encyclopedia shrugged. That is a dual rejection. Prestigious, in a way.");
    }

    setMeta(
      `${name} is not in Humanitas`,
      `The Humanitas archive has no record of ${name}. The phylogeny of greatness did not keep a chair.`
    );

    root.innerHTML = `
      <p class="who-kicker who-kicker-roast">Archive reply · zero record</p>
      <p class="who-stamp">${pick(stamps, seed, 3)}</p>
      <h1 class="who-title">${n}</h1>
      <p class="who-epithet">Not important enough — and we can say that in complete sentences.</p>
      <div class="who-roast">
        <p>${pick(openers, seed, 1)}</p>
        <p>${pick(middles, seed, 7)}</p>
        <p>${pick(closers, seed, 13)}</p>
      </div>
      <ol class="who-log" aria-label="Search log">
        <li>Humanitas 110 — no match</li>
        <li>Public encyclopedia — ${reason === "wiki-miss" ? "no biographical page" : "no usable record"}</li>
        <li>Consequence residue — none filed</li>
        <li>Recommendation — search a name that dented the species</li>
      </ol>
      <div class="who-actions">
        <a class="btn btn-primary" href="/#timeline">See the 110</a>
        <a class="btn btn-ghost" href="/#thesis">Read the thesis</a>
      </div>
    `;
  }

  function catalogRedirect(f) {
    location.replace("/figure/" + f.slug);
  }

  function wikiPage(name, page) {
    const title = page.title || name;
    const desc = page.description || "A life with a public record.";
    const extract = (page.extract || "").trim();
    const rawImg = page.thumbnail?.source || page.originalimage?.source || "";
    const img = rawImg.split("?")[0];
    const wiki = page.content_urls?.desktop?.page || page.canonical || "";
    const photo = img
      ? `<figure class="fig-hero-photo"><img src="${esc(img)}" alt="${esc(title)}" referrerpolicy="no-referrer" decoding="async" onerror="this.closest('figure')&&this.closest('figure').remove()" /><figcaption>${esc(title)}${page.description ? " · " + esc(page.description) : ""} · Wikipedia</figcaption></figure>`
      : "";

    setMeta(`${title} — Humanitas lookup`, extract.slice(0, 160) || desc);

    const paras = extract
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 6)
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");

    root.innerHTML = `
      <p class="who-kicker">Generated from the public record · not one of the 110</p>
      ${photo}
      <h1 class="who-title">${esc(title)}</h1>
      <p class="who-epithet">${esc(desc)}</p>
      <section class="who-body">
        <h2>What the record says</h2>
        ${paras || "<p>A public page exists, with little prose attached.</p>"}
      </section>
      <section class="who-body">
        <h2>What Humanitas can say</h2>
        <p><em>${esc(title)}</em> left a trace the encyclopedia kept. That is more than most names. It is still not a seat among the 110 lives this phylogeny argues from — prophets, mothers of faith, Native nations, Americans, philosophers, and captains whose principles still stand.</p>
        <p>This page is composed from the public record. It is not a Humanitas biography, and it does not invent a philosophy they never wrote.</p>
      </section>
      <div class="who-actions">
        ${wiki ? `<a class="btn btn-primary" href="${esc(wiki)}" target="_blank" rel="noopener noreferrer">Read the encyclopedia article</a>` : ""}
        <a class="btn btn-ghost" href="/#timeline">See the 110</a>
      </div>
    `;
  }

  function isUsableWiki(summary, q) {
    if (!summary || summary.type === "disambiguation") return false;
    if (summary.title && /^list of /i.test(summary.title)) return false;
    const desc = (summary.description || "").toLowerCase();
    if (desc.includes("disambiguation")) return false;
    const extract = (summary.extract || "").trim();
    if (extract.length < 60) return false;
    const nq = norm(q).split(" ").filter((w) => w.length > 2);
    const hay = norm(summary.title + " " + extract);
    if (nq.length && !nq.some((w) => hay.includes(w))) return false;
    return true;
  }

  async function fetchWiki(q) {
    const searchUrl =
      "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=8&srprop=&format=json&origin=*&srsearch=" +
      encodeURIComponent(q);
    const sr = await fetch(searchUrl);
    if (!sr.ok) throw new Error("search");
    const sj = await sr.json();
    const hits = sj.query?.search || [];
    for (const hit of hits) {
      const title = hit.title;
      if (!title) continue;
      const sumUrl =
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(title.replace(/ /g, "_"));
      const r = await fetch(sumUrl, { headers: { Accept: "application/json" } });
      if (!r.ok) continue;
      const summary = await r.json();
      if (isUsableWiki(summary, q)) return summary;
    }
    return null;
  }

  async function run() {
    const q = queryFromUrl();
    const input = document.querySelector("form.who-search input[type='search']");
    if (input && q) input.value = q;

    if (!q) {
      setMeta("Search a name — Humanitas", "Look up any name. The 110, the public record, or a polite rejection.");
      root.innerHTML = `
        <p class="who-kicker">Lookup</p>
        <h1 class="who-title">Name someone.</h1>
        <p class="who-epithet">If they are in the 110, you get the Humanitas page. If the encyclopedia kept them, you get a generated record. If neither did, you get the jokes.</p>
      `;
      return;
    }

    const local = pickCatalog(q);
    if (local) {
      catalogRedirect(local);
      return;
    }

    root.innerHTML = `<p class="who-loading">Opening the archive for <em>${esc(q)}</em>…</p>`;

    try {
      const wiki = await fetchWiki(q);
      if (wiki) {
        wikiPage(q, wiki);
        return;
      }
      roastPage(q, "wiki-miss");
    } catch {
      roastPage(q, "wiki-miss");
    }
  }

  run();
})();
