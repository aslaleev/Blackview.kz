# Technical Plan

## Design summary

Build a one-page Russian-language landing site for a video surveillance company as a greenfield frontend app using React, TypeScript, and Vite. The page will present the offer, catalog, calculator, pricing, trust blocks, FAQ, and lead capture in a single scrollable experience with anchor navigation. All editable business content will live in centralized config/data files, while pricing formulas will live in a dedicated calculator domain module.

## Assumptions

- Placeholder company name, contacts, metrics, prices, reviews, projects, and media will be used in the first version.
- The first release is fully frontend-only with no live CRM, Telegram, or email integration.
- Calculator output is indicative and based on configurable coefficients rather than validated commercial pricing.

## Architecture

### App structure

- `src/main.tsx` bootstraps the app.
- `src/App.tsx` composes the full landing page.
- `src/components/sections/*` contains top-level sections such as hero, about, catalog, calculator, pricing, trust, FAQ, contact CTA, and footer.
- `src/components/ui/*` contains reusable UI primitives such as buttons, section headers, cards, badges, stat items, accordion items, and form fields.
- `src/data/*` stores typed editable content collections.
- `src/config/site.ts` stores brand and contact configuration.
- `src/domain/calculator/*` stores calculator types, defaults, constants, and pricing functions.
- `src/styles/*` stores global theme tokens and layout styling.

### Rendering flow

1. `App.tsx` imports config and structured content.
2. Navigation anchors map to section ids.
3. Static sections render from centralized data arrays.
4. Calculator section manages local form state and calls domain pricing helpers on every relevant change.
5. Lead form can optionally receive calculator payload and render a summary before submission.

## Data flow

### Static content flow

- Brand/contact data comes from `src/config/site.ts`.
- Page collections come from `src/data/*.ts`.
- Sections receive only the content they render, keeping content ownership explicit and editable.

### Calculator flow

- User adjusts a unified input model containing camera counts, camera type, resolution, add-ons, archive settings, installation, site visit, and rental term.
- The UI passes the input model into a pure calculation function such as `calculateEstimate(input)`.
- The function returns a normalized output object with:
  - total camera count
  - equipment subtotal
  - installation subtotal
  - purchase total
  - rental monthly total
  - rental full-period total
  - human-readable pricing notes
- The calculator result is shown immediately in the page and can be passed into the lead form payload.

## Data model notes

### Core config entities

- `SiteConfig`
  - companyName
  - tagline
  - phone
  - email
  - address
  - businessHours
  - messengers
  - privacyPolicyLabel
  - privacyPolicyHref

- `CompanyMetric`
  - label
  - value
  - caption

- `CameraCategory`
  - id
  - title
  - description
  - useCase
  - image
  - ctaLabel

- `PriceRow`
  - id
  - service
  - unit
  - price
  - note

- `ProjectCase`
  - id
  - title
  - objectType
  - task
  - scope
  - cameraCount
  - timeline
  - image

- `Testimonial`
  - id
  - author
  - companyOrContext
  - text

- `FaqItem`
  - id
  - question
  - answer

- `VideoExample`
  - id
  - title
  - scenario
  - preview

### Calculator entities

- `CalculatorInput`
  - outdoorCameraCount
  - indoorCameraCount
  - formFactor
  - resolution
  - audioEnabled
  - nightVisionEnabled
  - continuousRecording
  - archiveDays
  - installationRequired
  - siteVisitRequired
  - rentalMonths

- `CalculatorResult`
  - totalCameras
  - equipmentCost
  - installationCost
  - purchaseCost
  - rentalMonthlyCost
  - rentalPeriodCost
  - notes

## Interface contracts

### Calculator contract

- `calculateEstimate(input: CalculatorInput): CalculatorResult`
- `getDefaultCalculatorInput(): CalculatorInput`
- `formatCurrency(value: number): string`

### Lead form contract

- `LeadRequestPayload`
  - name
  - phone
  - preferredContactMethod
  - message
  - calculatorSnapshot optional

- `submitLead(payload: LeadRequestPayload): Promise<{ ok: boolean }>`

Implementation note:
- Initial implementation can use a local fake async adapter so the form UX is ready for future real integrations.

## New and modified files

### Planned project files

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/config/site.ts`
- `src/data/companyMetrics.ts`
- `src/data/cameraCatalog.ts`
- `src/data/pricing.ts`
- `src/data/projects.ts`
- `src/data/testimonials.ts`
- `src/data/faq.ts`
- `src/data/videos.ts`
- `src/data/navigation.ts`
- `src/domain/calculator/types.ts`
- `src/domain/calculator/constants.ts`
- `src/domain/calculator/calculateEstimate.ts`
- `src/domain/calculator/defaults.ts`
- `src/lib/format.ts`
- `src/lib/lead.ts`
- `src/components/ui/*`
- `src/components/sections/*`
- `src/styles/global.css`
- `src/styles/theme.css`

## Test strategy

- Unit test calculator formulas and edge cases:
  - only outdoor cameras
  - only indoor cameras
  - large archive depth
  - rental comparison against purchase output
  - installation/site-visit toggles
- Unit test formatting helpers if they contain custom behavior.
- Component-level smoke tests for:
  - rendering major sections
  - FAQ accordion interaction
  - calculator recomputation when inputs change
- Manual responsive verification on mobile, tablet, and desktop breakpoints.

## Security and performance

- Sanitize future external links and form submission adapters through typed interfaces.
- Keep the first release dependency set small to avoid bundle bloat.
- Optimize media with placeholders or compressed assets to preserve landing-page performance.
- Avoid storing sensitive secrets in frontend config since the first version is static.

## Rollout plan

1. Initialize the frontend app scaffold and base styles.
2. Build centralized config/data modules with placeholder business content.
3. Implement the full landing layout and anchor navigation.
4. Implement and test the calculator domain logic.
5. Connect calculator UI and lead form payload flow.
6. Add responsive polish, placeholders, and basic QA.

## Risks and mitigations

- Risk: Placeholder business content could leak into release.
  Mitigation: Keep all brand and contact values in one config file for a final replacement pass.

- Risk: Pricing formulas may be interpreted as exact commercial offers.
  Mitigation: Label results as indicative and keep coefficients easy to adjust.

- Risk: Greenfield setup may drift without conventions.
  Mitigation: Lock the initial folder structure and typed interfaces early in implementation.

- Risk: Media-heavy sections could hurt performance.
  Mitigation: Start with optimized placeholders and lazy-load heavier visuals where helpful.

## Open questions

- Final company name, contacts, messenger links, legal address, and brand assets still need to replace placeholders before production use.
- If the user later wants admin-friendly editing without code changes, a CMS or JSON-driven content pipeline would need a future phase outside current scope.
