# Implementation Tasks

## Summary

- Total tasks: 22
- Parallelizable tasks: 7
- MVP scope tasks for P1 stories: 14
- Suggested execution order:
  1. Complete Preparation and Foundation
  2. Build US-1 and US-2 sections to establish page structure
  3. Implement US-3 calculator domain and UI
  4. Add US-5 trust blocks and US-6 lead capture flow
  5. Finish US-4 pricing block and final QA/polish

## Dependency sketch

- Foundation tasks unblock all story work.
- US-1 should land before the rest of the visual sections because it defines page shell and anchor navigation.
- US-3 depends on Foundation data types and layout primitives.
- US-6 depends on the shared CTA/button patterns and partially on US-3 for calculator snapshot submission.
- US-5 and US-4 can proceed after Foundation in parallel with parts of US-3.

## Phase 1: Preparation

- [x] [T001] Create the React + TypeScript + Vite project scaffold in `package.json`, `tsconfig.json`, `vite.config.ts`, and `index.html`
- [x] [T002] [P] Add the application entrypoint and root mount in `src/main.tsx`
- [x] [T003] [P] Establish theme tokens and global reset styles in `src/styles/theme.css` and `src/styles/global.css`

## Phase 2: Foundation

- [x] [T004] Define brand configuration and navigation anchors in `src/config/site.ts` and `src/data/navigation.ts`
- [x] [T005] [P] Create typed shared UI primitives for buttons, section headings, badges, and cards in `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Badge.tsx`, and `src/components/ui/Card.tsx`
- [x] [T006] [P] Compose the landing page shell with anchor navigation and section order in `src/App.tsx`
- [x] [T007] Create typed content collections for metrics, camera catalog, pricing, projects, testimonials, FAQ, and videos in `src/data/companyMetrics.ts`, `src/data/cameraCatalog.ts`, `src/data/pricing.ts`, `src/data/projects.ts`, `src/data/testimonials.ts`, `src/data/faq.ts`, and `src/data/videos.ts`

## Phase 3: US-1 Быстро понять предложение компании [P1]

Verification:
- Confirm the first screen clearly communicates sale, installation, and rental.
- Confirm at least two CTAs are visible on desktop and mobile.
- Confirm there is no horizontal scroll at narrow mobile widths.

- [x] [T008] [US1] Implement the hero section copy, CTA cluster, and trust highlights in `src/components/sections/HeroSection.tsx`
- [x] [T009] [US1] Implement the about/company section with service overview and editable metrics in `src/components/sections/AboutSection.tsx` and `src/data/companyMetrics.ts`
- [x] [T010] [US1] Wire hero and about sections into the landing composition in `src/App.tsx`

## Phase 4: US-2 Изучить решения и типы камер [P1]

Verification:
- Confirm all required camera categories are represented.
- Confirm each card shows title, short description, scenario, and CTA.
- Confirm the block remains readable on mobile and in two-column or single-column responsive states.

- [ ] [T011] [US2] Expand the editable camera catalog data with required categories and use cases in `src/data/cameraCatalog.ts`
- [ ] [T012] [US2] Build the responsive camera catalog section and card rendering in `src/components/sections/CatalogSection.tsx`
- [ ] [T013] [US2] Connect catalog anchors and CTA targets in `src/App.tsx` and `src/data/navigation.ts`

## Phase 5: US-3 Рассчитать стоимость проекта [P1]

Verification:
- Confirm recalculation happens whenever any calculator field changes.
- Confirm both purchase and rental values are shown together.
- Confirm edge cases for only outdoor cameras, only indoor cameras, and large archive depth are covered by tests.

- [ ] [T014] [US3] Define calculator input/output types and configurable pricing constants in `src/domain/calculator/types.ts` and `src/domain/calculator/constants.ts`
- [ ] [T015] [US3] Implement calculator defaults and pure estimate logic in `src/domain/calculator/defaults.ts` and `src/domain/calculator/calculateEstimate.ts`
- [ ] [T016] [P] [US3] Add currency formatting and lead submission adapter contracts in `src/lib/format.ts` and `src/lib/lead.ts`
- [ ] [T017] [US3] Build the calculator form UI and result summary block in `src/components/sections/CalculatorSection.tsx`
- [ ] [T018] [US3] Add calculator unit tests for main formula branches and edge cases in `src/domain/calculator/calculateEstimate.test.ts`
- [ ] [T019] [US3] Wire calculator state and section anchor into the page in `src/App.tsx`

## Phase 6: US-5 Получить подтверждение надёжности компании [P1]

Verification:
- Confirm projects, testimonials, videos, and FAQ render from centralized data.
- Confirm FAQ answers expand/collapse correctly.
- Confirm trust content covers daytime, nighttime, and indoor scenarios.

- [ ] [T020] [P] [US5] Fill editable trust content collections in `src/data/projects.ts`, `src/data/testimonials.ts`, `src/data/videos.ts`, and `src/data/faq.ts`
- [ ] [T021] [US5] Build the projects, testimonials, and video examples sections in `src/components/sections/ProjectsSection.tsx`, `src/components/sections/TestimonialsSection.tsx`, and `src/components/sections/VideoExamplesSection.tsx`
- [ ] [T022] [US5] Build the FAQ accordion section in `src/components/sections/FaqSection.tsx`

## Phase 7: US-6 Оставить заявку из любой ключевой точки страницы [P1]

Verification:
- Confirm CTA paths from hero, calculator, and other key sections lead to a visible lead form.
- Confirm calculator submissions include a snapshot payload when started from the calculator.
- Confirm footer exposes phone, email, address, schedule, messengers, and privacy link.

- [ ] [T023] [US6] Implement the lead form section and local submit flow in `src/components/sections/LeadSection.tsx` and `src/lib/lead.ts`
- [ ] [T024] [US6] Build the footer with contacts, messenger links, and privacy policy in `src/components/sections/Footer.tsx` and `src/config/site.ts`
- [ ] [T025] [US6] Connect CTA targets and calculator-to-form snapshot handoff in `src/App.tsx`, `src/components/sections/HeroSection.tsx`, and `src/components/sections/CalculatorSection.tsx`

## Phase 8: US-4 Посмотреть примерные цены без калькулятора [P2]

Verification:
- Confirm the pricing block is editable through centralized data.
- Confirm service names are understandable without technical jargon.

- [ ] [T026] [P] [US4] Populate editable pricing rows in `src/data/pricing.ts`
- [ ] [T027] [US4] Build the compact pricing section in `src/components/sections/PricingSection.tsx`
- [ ] [T028] [US4] Add the pricing section to the landing composition and navigation in `src/App.tsx` and `src/data/navigation.ts`

## Phase 9: Finalization

Verification:
- Run the project test suite and fix failures.
- Verify responsive layout across mobile, tablet, and desktop widths.
- Check that all placeholder business values remain centralized and easy to replace.

- [ ] [T029] [P] Add section-level smoke tests for rendering, calculator interaction, and FAQ behavior in `src/App.test.tsx` and `src/components/sections/FaqSection.test.tsx`
- [ ] [T030] Audit responsive spacing, repeated CTA consistency, and anchor scrolling behavior in `src/App.tsx`, `src/styles/global.css`, and `src/styles/theme.css`
- [ ] [T031] Document placeholder replacement points and final delivery notes in `README.md` and `src/config/site.ts`
