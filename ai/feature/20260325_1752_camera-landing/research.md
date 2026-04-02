# Research

## Repository state

- The repository is effectively empty at this stage.
- Only the feature specification exists: `ai/feature/20260325_1752_camera-landing/spec.md`.
- There is no existing frontend framework, component system, data layer, or build tooling to reuse.

## Resolved uncertainties

### Which technical baseline should the first implementation use?

Decision:
- Use a small greenfield frontend stack based on React, TypeScript, and Vite.

Why:
- The project is a single-page marketing site with interactive calculator logic.
- React keeps content sections modular and makes later extension to forms/integrations straightforward.
- TypeScript lowers the risk of breaking centralized content structures and pricing formulas.
- Vite provides a lightweight setup for a one-page site without introducing unnecessary framework complexity.

### How should editable content be organized?

Decision:
- Keep brand data, contacts, and reusable business constants in a dedicated config file.
- Keep page content collections such as catalog cards, projects, testimonials, FAQ, videos, pricing rows, and company metrics in centralized typed data files.

Why:
- The specification explicitly requires easy editing of texts and structured content.
- Centralized data files reduce the chance of future content edits touching UI logic.

### How should calculator logic be structured?

Decision:
- Put calculation rules in an isolated domain module separate from page components and content data.

Why:
- The specification requires formulas to be changeable without rewriting landing page content.
- Isolated pricing logic is easier to test independently.

## Constraints and implications

- Brand assets, final company name, and real contacts are still unknown, so the first version should use placeholders from config.
- No backend is required in scope, so the lead form should submit into local UI state or a no-op handler prepared for future integration.
- Because the repo has no prior conventions, the technical plan must define a clear initial folder structure that tasks can implement directly.

## Recommended implementation posture

- Build the first release as a static SPA.
- Prefer local media placeholders or lightweight image/video placeholders that can be replaced later.
- Design the form submission contract so Telegram, email, or CRM can be connected later without changing the UI component API.
