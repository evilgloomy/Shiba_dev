# Shiba Dev — Grok continuation brief

This branch already repositions Shiba Dev from an "AI website / concierge" studio into an AI product engineering company.

## Branch and PR
- Branch: `revamp-capability-positioning`
- PR: #1
- Static GitHub Pages site: `index.html`, `styles.css`, `app.js`
- Do not introduce a framework unless there is a concrete need. Keep GitHub Pages deployment simple.

## Positioning rule
Shiba Dev should feel like an AI product company whose engineering capability is available to selected clients.

Primary message:
> We build AI systems that do real work.

Core capabilities:
- Agentic systems
- Digital humans and realtime voice
- Private / local AI
- AI-native SaaS and internal software
- Workflow automation and enterprise integrations
- Full-stack product engineering

Avoid reverting the company to "AI website agency", "chatbot agency", "automation agency", or generic "AI solutions".

## Existing internal technology to show

### 1. ShibaOS Core
Use as the primary proof point.

Public-safe story:
- ordinary company instruction becomes a durable Objective
- company context / research / tools can be composed
- work can be planned and delegated through bounded units
- outputs are verified before completion
- important actions can require approval
- schedules and follow-up can survive beyond one chat turn
- Head / Worker / Hybrid roles exist for portable compute
- local models remain an option
- external tools/services can be called through bounded adapters

Do not expose:
- API keys
- private repo paths
- credentials
- internal client/company data
- security-sensitive configuration

### 2. Mina
Position as the conversational interface to ShibaOS, not "a chatbot".

Current truthful status:
- English realtime voice is a candidate under active acceptance / dogfood
- character runtime, memory and LEMO are being integrated
- digital-human / voice interaction should be presented as prototype / active development until acceptance is complete

Ideal public demo:
1. User talks to Mina
2. Speech is transcribed
3. Mina understands company context
4. Mina creates / continues an Objective
5. ShibaOS calls tools / workflows
6. Mina explains the result
7. Human approves any important external action

### 3. Shiba Compute
Public story:
- owned hardware where appropriate
- local inference
- GPU workers
- bounded worker assignment
- hybrid routing between local and cloud models
- data can stay inside controlled infrastructure where required

Do not claim fully autonomous distributed infrastructure beyond what the Core actually supports.

### 4. ArtistAgent.AI
Public story:
- artist management
- approved artist knowledge / persona
- content workflows
- social drafts
- approval-controlled publishing / scheduling
- creative generation modules
- asset / content library
- eventual agent-assisted artist operations

Keep "in development" / "product layer" wording until production acceptance is real.

## Next website tasks

### A. Replace proof mockups with real media
When real screenshots or recordings are available, create:
- `assets/proof-shibaos.webp`
- `assets/proof-mina.webp`
- `assets/proof-artistagent.webp`
- `assets/proof-compute.webp`
- optional MP4/WebM demo clips

Each proof block should support either:
- image + caption, or
- muted autoplay loop with poster image and accessible fallback

Never allow missing media to break layout; keep the current CSS mock as fallback.

### B. ShibaOS hero demo
Create a 30–60 second demo showing:
- user asks an operational question
- Objective created
- evidence sources checked
- bounded reasoning / work plan
- recommendation prepared
- status = "Prepared — Not Deployed"
- human approval required

Use fictional operational data only unless explicit public-safe company data is supplied.

### C. Mina demo
Create a 20–40 second loop:
- Mina portrait / live avatar
- voice waveform
- transcript
- one safe tool call
- visible response
- status labels like "voice", "memory", "company context", "tool"

Do not fake production status. Label prototype / candidate when appropriate.

### D. ArtistAgent demo
Show an artist workspace with:
- artist profile
- content queue
- approved context
- asset library
- social draft
- human approval
- scheduled distribution

Use Cola B as the internal dogfood example if public-safe assets are available.

### E. Lead conversion
Replace mailto-only booking with a lightweight form or booking URL when available.

Required fields:
- name
- company
- email
- what are you trying to build?
- current systems / integrations
- approximate budget band

Do not ask for sensitive company information in the first form.

Suggested budget bands:
- HK$100k–250k
- HK$250k–500k
- HK$500k–1m
- HK$1m+

### F. Analytics
Add privacy-conscious analytics only when an approved provider/account is available.

Track:
- CTA clicks
- demo interactions
- language switch
- proof-section engagement
- booking conversion

Do not invent analytics IDs.

### G. SEO
Keep:
- title: Shiba Dev — AI Product Engineering & Agent Systems | Hong Kong
- H1: We build AI systems that do real work.
- schema.org structured data
- explicit Hong Kong positioning

Future pages worth adding:
- /ai-agents
- /digital-humans
- /private-ai
- /ai-mvp
- /shibaos
- /work or /case-studies

Avoid low-quality SEO pages generated only for keyword volume.

## Content system / LinkedIn

Shiba Dev LinkedIn content should be generated from actual builds.

Content sources:
- meaningful commits
- product screenshots
- demo clips
- architecture changes
- acceptance milestones
- failures / lessons that are safe to disclose
- new integrations

For each useful build event generate:
1. technical founder post
2. company LinkedIn post
3. short X post
4. 15–30 sec demo script
5. case-study paragraph
6. website changelog item

Do not auto-publish initially. Queue drafts for human approval.

Best recurring narrative:
> We already build what most companies are still discussing.

Show outcomes rather than jargon.

## Outbound lead system

Future Grok / ShibaOS workflow:
1. identify a company
2. research public information only
3. infer one concrete operational use case
4. draft a highly specific outreach message
5. attach the closest Shiba Dev proof/demo
6. human approves
7. send
8. log response / follow-up

Never mass-send generic AI spam.

## Acceptance checklist before merging this PR
- desktop layout visually checked
- mobile layout visually checked
- EN/繁中 switch checked
- all anchors still work
- no JS console errors
- no broken asset paths
- no secrets or internal company data exposed
- claims match real implementation status
- mailto CTA still works
- GitHub Pages still serves from main after merge
