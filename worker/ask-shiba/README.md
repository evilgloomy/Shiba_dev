# Ask Shiba Worker

OpenAI proxy for the Ask Shiba FAB on shiba-dev.com.

## Deploy

```bash
cd worker/ask-shiba
npx wrangler login
printf '%s' "$OPENAI_API_KEY" | npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

Copy the `*.workers.dev` URL into `app.js` as `ASK_SHIBA_ENDPOINT`.


> **Paused (2026-09-21):** Landing Ask Shiba is scripted again — no OpenAI API. Revisit when ShibaOS API + Shiba Compute host the site.
