# Deploy Ask Shiba

## Option A — Cloudflare dashboard (recommended right now)

1. Open https://dash.cloudflare.com → Workers & Pages → Create Worker
2. Name it `ask-shiba`
3. Paste code from `src/index.js`
4. Settings → Variables → add secret `OPENAI_API_KEY`
5. Settings → Variables → add plain text vars:
   - `ALLOWED_ORIGINS` = `https://shiba-dev.com,https://www.shiba-dev.com`
   - `MODEL` = `gpt-4o-mini`
6. Deploy. Copy the `*.workers.dev` URL into `app.js` `ASK_SHIBA_ENDPOINT` if it is not `https://ask-shiba.shiba-dev.workers.dev`.

## Option B — GitHub Actions (needs `workflow` scope on the PAT)

Workflow template: `ci/deploy-ask-shiba.yml`  
Repo secrets: `OPENAI_API_KEY`, `CLOUDFLARE_API_TOKEN`
