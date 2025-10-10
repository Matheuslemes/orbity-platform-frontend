# CHANGELOG — Orbity Frontend (v2 track)

> This log summarizes intentional, pedagogical steps taken to structure the frontend.
> The app may not run between early steps; clarity and architecture first.

## Day 1 — Manifest & Scope
- Introduced top-level goals (typed contracts via Zod, resilient HTTP, OIDC with httpOnly cookies, CSP).
- Added high-level service coverage: catalog, search, pricing, inventory, cart, checkout, orders, customer/consents, auth.

## Day 2 — Strict Tooling & Lint Fixes
- Enforced quality gates: TypeScript **strict** (safety flags), ESLint **v9 flat config** (with `@next/eslint-plugin-next`, `eslint-plugin-import`, `@eslint/js`, `globals`, `@typescript-eslint/parser`), Prettier, and Husky + lint-staged pre-commit.
- Standardized scripts and fixed TS/JSX lint issues (e.g., replaced `React.ReactNode` with typed `ReactNode` in `layout.tsx`) to ensure `pnpm typecheck` and `pnpm lint` pass cleanly.

## Day 3 (update) — Deep Space Blue theme & Home fix
- **Theme:** switched palette to a deep space blue scheme (`--orbity-*`) and subtle nebula/starfield background in `src/styles/globals.css`. Kept accessible contrast and consistent cyan/blue accents.
- **Layout:** ensured global styles are imported from `src/styles/globals.css` in `src/app/layout.tsx`.
- **Home:** resolved runtime error `Can't resolve './page.module.css'`:
  - (A) Preferred: simplified `src/app/page.tsx` to use global utilities (`.container`, `.card`, `.btn`) — no CSS module required; or
  - (B) Alternative: recreated `src/app/page.module.css` with minimal classes.
- **Type safety polish:** no functional changes, just strict TS consistency kept across the HTTP layer from previous step.
