# Functional Demo Sites — Build Specification

## Goal

Turn the six Shiba Dev concept screenshots into believable, functional business websites.

The screenshot is the visual target.
The shared runtime is the behavioral contract.

Do **not** choose between visual fidelity and functionality. Both are required.

## Existing routes

- `/demos/lumina/`
- `/demos/veritas/`
- `/demos/aurora/`
- `/demos/velocity/`
- `/demos/luna/`
- `/demos/nexora/`

Shared implementation:

- `demos/worlds.js` — content + business behavior
- `demos/site.js` — interaction runtime
- `demos/site.css` — shared visual system

Reference images:

- `assets/demo-lumina.png`
- `assets/demo-veritas.png`
- `assets/demo-aurora.png`
- `assets/demo-velocity.png`
- `assets/demo-luna.png`
- `assets/demo-nexora.png`

## Critical rule

Do not rebuild six separate JavaScript applications.

Use the shared runtime and only add world-specific DOM/CSS hooks or configuration when necessary.

If a visual change can be expressed in configuration or CSS variables, do that first.

## Phase 1 — Screenshot reconstruction

For each reference image:

1. Inspect the image at native resolution.
2. Identify:
   - page background
   - header height
   - logo position
   - nav position
   - hero grid / alignment
   - headline size and line breaks
   - copy width
   - CTA style
   - image crop / focal point
   - card shapes
   - border radii
   - shadows
   - primary / secondary colors
   - visible below-the-fold elements
3. Recreate the screenshot as real HTML/CSS.
4. Do not use the screenshot itself as the final full-page background.
5. The reference image may remain visible only as temporary development aid or a contained visual asset where appropriate.
6. Preserve responsive behavior.

### Visual acceptance

At 1440px desktop width:

- screenshot the generated page
- compare side-by-side with the reference
- iterate until layout, typography, spacing, crop, and color feel materially similar
- no obvious generic-template substitutions

At 390px mobile width:

- layout must be intentionally responsive
- no horizontal overflow
- CTA remains reachable
- assistant remains usable

## Phase 2 — Functional behavior

Every demo must have:

### Header
- real anchor navigation
- primary CTA opens the business-specific conversion flow
- mobile navigation works

### Assistant
- assistant opens and closes
- intro message appears
- all suggested prompts work
- user prompt appears in chat
- matching assistant response appears
- chat remains scrollable

### Primary conversion
- CTA opens modal
- modal has exactly 3 steps
- Back works
- Continue works
- required fields are validated
- selections survive Back / Continue
- final Submit shows a clear success screen
- success screen explains this is a demo
- no network request is sent

### Secondary CTA
- scrolls to a relevant content section
- never dead-links

### Escape / close behavior
- modal closes from X
- modal closes from backdrop click
- Escape closes modal

## Business-specific acceptance

### LUMINA

Purpose:
Private clinic / healthcare enquiry.

Required primary flow:
1. service / need
2. preferred day + time + language
3. contact details
4. success = consultation request prepared

Required assistant scenarios:
- services
- consultation
- Cantonese / multilingual support

Safety:
- never diagnose
- never provide medical advice
- clearly describe staff handoff

### VERITAS LAW

Purpose:
Law-firm intake.

Required primary flow:
1. practice area + non-confidential summary
2. urgency + preferred contact level
3. contact / company details
4. success = enquiry prepared for conflict review

Required assistant scenarios:
- Hong Kong company structuring
- contract review request
- partner handoff

Safety:
- no legal advice
- no claim that engagement exists
- mention conflict / engagement review

### AURORA RESIDENCES

Purpose:
Luxury property sales.

Required primary flow:
1. residence interest + guest count
2. day + time
3. contact
4. success = private viewing request sent to scheduling

Required assistant scenarios:
- waterfront units
- Sunday viewing
- amenities

### VELOCITY X

Purpose:
Performance simulator club.

Required primary flow:
1. rig + duration
2. day + time + payment preference
3. driver details / optional member ID
4. success = bay held in demo

Required assistant scenarios:
- GT3 / Friday evening
- member points
- telemetry

### LUNA

Purpose:
Creator / artist owned platform.

Required primary flow:
1. enquiry type + brief
2. market + timing + budget
3. contact / company
4. success = enquiry prepared for team

Required assistant scenarios:
- next Asia show
- merch
- brand collaboration

### NEXORA

Purpose:
Technology company investor / partner portal.

Required primary flow:
1. access type + reason
2. organisation + role + website
3. name + business email + NDA readiness
4. success = portal request submitted for review

Required assistant scenarios:
- company product
- financial information request
- investor access

Security:
- public assistant must not expose private investor information
- secure material requires approved portal access

## Phase 3 — Make each site visually distinct

The shared runtime must not make all six pages look like reskins.

Allowed differences:

- typography scale
- hero composition
- header treatment
- card layout
- section order
- theme
- visual density
- image treatment
- CTA design
- assistant surface treatment

Keep behavior shared underneath.

Suggested visual personalities:

- LUMINA — clean, quiet, clinical luxury
- VERITAS — restrained editorial / institutional
- AURORA — luxury real-estate editorial
- VELOCITY X — dark, technical, performance
- LUNA — editorial artist / fashion / music
- NEXORA — enterprise technology / investor-grade

## Phase 4 — Main Shiba Dev integration

The landing-page demo selector already has an Open functional mockup link.

Verify:

- LUMINA → `demos/lumina/`
- VERITAS → `demos/veritas/`
- AURORA → `demos/aurora/`
- VELOCITY X → `demos/velocity/`
- LUNA → `demos/luna/`
- NEXORA → `demos/nexora/`

Do not change the selected-world interaction.

## Testing requirements

Before marking the task complete:

1. Run JavaScript syntax validation on:
   - `demos/site.js`
   - `demos/worlds.js`
   - `app.js`
2. Open all six demo routes.
3. Complete the primary conversion flow on every route.
4. Test all three assistant prompts on every route.
5. Check desktop at 1440px.
6. Check mobile at 390px.
7. Check browser console for errors.
8. Verify all reference asset paths resolve.
9. Verify Back to Shiba Dev works.
10. Confirm no real forms or network calls are made.

## Definition of done

A demo is NOT done because:
- the page renders
- the screenshot is displayed
- the buttons have hover states
- the chatbot window opens

A demo is done only when:
- it visually resembles its supplied screenshot
- it feels specific to that industry
- the assistant behaves
- the business flow completes
- the mobile version works
- there are no console errors
- the success state is visible

## Instruction to Grok

Work one world at a time.

Start with LUMINA.
Do not touch the other five until LUMINA passes visual + functional acceptance.

Once LUMINA is accepted, extract any reusable improvements into the shared runtime, then apply the same process to VERITAS, AURORA, VELOCITY X, LUNA, and NEXORA in that order.

Do not redesign Shiba Dev itself while performing this task.
Do not delete existing functional behavior to achieve visual fidelity.
Do not introduce a framework unless the current static architecture is demonstrably unable to satisfy a requirement.
