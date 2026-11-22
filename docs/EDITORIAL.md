# One bio standard

Every person — the 115 curated figures, Community entries and any searched name — is rendered by the same component (`bio.js`) in the same order, from the same rules (`editorial.js`):

1. **Lead** — neutral and contribution-first. For searched people it is composed from Wikidata offices (P39) and occupations (P106), e.g. “45th and 47th President of the United States; business magnate, investor and real estate entrepreneur”.
2. **Life at a glance** — born/died, place, era, roles, citizenship, education, field.
3. **Key contributions** — 3–6 items: offices held, founded/created/released/awarded items, honours, notable works.
4. **Legacy and impact** — from recorded awards or neutral article text.
5. **Notable works, inventions and offices** — Wikidata only.
6. **Principles and quotes** — Wikiquote, attributed, only lines that state a principle.
7. **Sources** — Wikipedia, Wikidata, Wikiquote links on every entry (the 115 via `data-sources.js`).

## Rules (heuristic, no AI, no invented facts)

Every sentence is copied from Wikipedia/Wikidata/Wikiquote (or curated data); nothing is generated. Negative-event vocabulary (bankruptcy, scandal, conviction, indictment, impeachment, controversy, lawsuit, fraud, allegation, arrest…), attributed opinion, polls, party affiliation and loaded adjectives are filtered out of leads and highlights; a highlight about an organisation that is the subject of a negative-event sentence is dropped too. The same filters apply to everyone, whatever their politics.

## Known limits

Keyword heuristics cannot understand every sentence. A neutral-looking sentence can occasionally slip through or a good one can be dropped, and a sentence’s subject can be misjudged when it is read alone. Wikipedia itself remains one click away on every profile. Edit the vocabulary in `editorial.js` to tune it.
