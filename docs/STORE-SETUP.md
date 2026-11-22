# Store setup (needed once, by the project owner)

The **Community** tab, **Recently explored** and **Most explored this week** need a small key-value store. Without it the site works normally and these pages show “Not connected yet.”

Free option: **Upstash Redis** (free tier) via the Vercel Marketplace, or directly at upstash.com.

1. Vercel dashboard → project `humanitas` → Storage / Marketplace → add **Upstash Redis** (choose the free plan).
2. Confirm these environment variables exist on the project (the integration adds them): `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`).
3. Optional but recommended: add `RATE_LIMIT_SALT` (any long random string) so hashed rate-limit keys cannot be guessed.
4. Redeploy. No code change is needed.

Stored: public Wikidata IDs, grades, a recent list, weekly unique-explorer counters (HyperLogLog), and short-lived hashed rate-limit counters. Not stored: IPs, user agents, cookies, names typed, accounts.

Local testing: `node scripts/mock-upstash.js 4399` and run the dev server with `UPSTASH_REDIS_REST_URL=http://localhost:4399 UPSTASH_REDIS_REST_TOKEN=mock-token node scripts/dev-server.js`.
