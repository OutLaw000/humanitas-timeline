/**
 * Tiny key-value store over the Upstash Redis REST API (free tier is enough).
 * Reads the credentials from environment variables ONLY — nothing in code.
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (or the KV_REST_API_URL / KV_REST_API_TOKEN pair
 *   that Vercel's Upstash integration injects).
 * If they are absent, `configured()` is false and every endpoint degrades gracefully.
 */
function creds() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function configured() {
  return !!creds();
}

async function pipeline(cmds) {
  const c = creds();
  if (!c) throw new Error("store-not-configured");
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch(c.url + "/pipeline", {
      method: "POST",
      headers: { Authorization: "Bearer " + c.token, "Content-Type": "application/json" },
      body: JSON.stringify(cmds),
      signal: ctl.signal,
    });
    if (!r.ok) throw new Error("store-http-" + r.status);
    const j = await r.json();
    return j.map((x) => {
      if (x && x.error) throw new Error("store-error");
      return x.result;
    });
  } finally {
    clearTimeout(t);
  }
}

async function cmd(...args) {
  return (await pipeline([args]))[0];
}

module.exports = { configured, pipeline, cmd };
