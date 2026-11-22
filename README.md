# Humanity’s Atlas

Public name of the site at [humanitysatlas.com](https://humanitysatlas.com). The repository and Vercel project remain `humanitas-timeline` / `humanitas`.

Living phylogeny of greatness and truth. Interactive timeline of **115 lives** across about **4,600 years**, with a thesis composed from their principles.

Public site: [https://humanitysatlas.com](https://humanitysatlas.com)

## What it is
Prophets, mothers of faith, Native nations, Americans, philosophers, and captains. Each life has a biography, principles, creations, and a portrait. Search any name, open the full page, or generate a thesis.

Every person — the 115, a Community entry, or a searched name — uses the same greatness-first bio (`bio.js` / `editorial.js`). Public Wikipedia, Wikidata, and Wikiquote only. Nothing is invented.

## Pages
- `/` timeline, search, thesis
- `/figure/{slug}` single life
- `/who?q=Name` lookup: the 115, a public encyclopedia record in the same bio format, or a clean not-found page if there is no biographical record
- `/community` people who pass the public auto-grade when searched
- `/recent` recently opened lives (anonymous: who, never by whom)
- `/trending` most explored this week, ranked by unique explorers
- `/classroom` printable discussion pack
- `/embed/{slug}` embeddable card

## Local
Static files. Open `index.html` or any static server from this folder.

Data: `data1.js`–`data7.js`, then `data-enrichment.js`, `data-images.js`, and `data-sources.js`. Portraits live in `images/figures/`.
