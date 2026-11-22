# Store setup (needed once, by the project owner)

The **Community** tab, **Recently explored** and **Most explored this week** need a small key-value store. Without it the site works normally and these pages show “Not connected yet.”

Free option: **Upstash Redis** (free tier) via the Vercel Marketplace, or directly at upstash.com.

1. Vercel dashboard → project `humanitas` → Storage / Marketplace → add **Upstash Redis** (choose the free plan).
2. Confirm these environment variables exist on the project (the integration adds them): `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`).
3. Optional but recommended: add `RATE_LIMIT_SALT` (any long random string) so hashed rate-limit keys cannot be guessed.
4. Redeploy. No code change is needed.

## Grok voice (Listen)

Listen uses **Ara**, the warm Grok female voice from the xAI Text-to-Speech API (`POST https://api.x.ai/v1/tts`). Browser `speechSynthesis` is robotic; this path is not.

1. Create an API key at [console.x.ai](https://console.x.ai/team/default/api-keys).
2. Vercel dashboard → project `humanitas` → Settings → Environment Variables → add `XAI_API_KEY` for Production (and Preview if you want it there).
3. Redeploy. Do not commit the key.

Scripts are baked by `node scripts/gen-speak.js` into `api/_lib/speak.json` (do not eval the timeline data files on the server). Without `XAI_API_KEY`, Listen shows “Grok voice isn’t connected yet.”

Stored: public Wikidata IDs, grades, a recent list, weekly unique-explorer counters (HyperLogLog), and short-lived hashed rate-limit counters. Not stored: IPs, user agents, cookies, names typed, accounts.

Local testing: `node scripts/mock-upstash.js 4399` and run the dev server with `UPSTASH_REDIS_REST_URL=http://localhost:4399 UPSTASH_REDIS_REST_TOKEN=mock-token node scripts/dev-server.js`.
