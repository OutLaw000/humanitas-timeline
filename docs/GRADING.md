# Community grading

Searching for a name on Humanity’s Atlas can add that person to the **Community** timeline automatically. There is no approval queue and no admin page. The decision is a score computed **on the server** from public records, against **one config file**:

`config/grading.config.json` — the rubric, the gates, the threshold (`60`) and every rate limit. Change numbers there and nowhere else.

## What is scored (100 points)

| Signal | Max | Source | How |
| --- | --- | --- | --- |
| Language editions | 30 | Wikidata sitelinks | 0.5 per Wikipedia language edition |
| Recorded achievements | 32 | Wikidata P166 / P39 / P800 | 3 per award (cap 12), 4 per office held (cap 12), 2 per notable work (cap 8) |
| Article depth | 13 | English Wikipedia | size of the article, full marks at 80,000 bytes |
| Readership longevity | 25 | Wikimedia pageviews | **median** monthly views over 60 months, log scale; a median cannot be lifted by a news spike; thin or short histories are capped |

Never inputs: politics, party, sentiment, tone of coverage, recent news volume, who searched, or how many times.

## Gates (a person is blocked before scoring)

- Not a human (Wikidata `instance of` ≠ human).
- Fictional characters and other blocked classes (`blockedInstanceOf`).
- No English Wikipedia article.
- Living people need ≥ 20 language editions (≥ 8 for people who have died) and a minimum median readership, so living private individuals with low notability can never qualify.

## Safeguards

- **Server-side only.** `POST /api/explore` accepts exactly `{ "qid": "Q…" }` or `{ "slug": "…" }` (curated figure). Any other field, including a client-supplied score, is ignored. Content type, body size and ID format are validated.
- **Dedupe by Wikidata QID.** One Community entry per QID; re-searching only refreshes the cached grade.
- **Rate limits** per anonymous client key and globally (see `limits`), plus caps on fresh gradings and community additions per hour/day and a maximum size.
- **No PII.** No IP address, user agent, cookie, query text or account is stored. Rate-limit counters use a salted one-way hash of the IP, expire within an hour, and are never written to any list. Weekly “explorers” are counted with a HyperLogLog, which cannot be reversed to individuals.
- **Neutral profiles.** A Community profile is rendered by the same greatness-first component as the 115 curated figures (see `docs/EDITORIAL.md`).

## Calibration (live Wikimedia data, rubric v1)

Famous figures score 80–100 and pass. Borderline cases fail (Bob Ross 54.9, Peter Navarro 53.5, Kimbal Musk 41), a common name scores 6.6, and fictional characters and groups are blocked.

Changing the rubric changes **future** grades only; cached grades expire after 7 days (pass) / 2 days (fail).
