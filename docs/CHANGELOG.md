# CHANGELOG — Orbity Frontend (v2 track)

> This log summarizes intentional, pedagogical steps taken to structure the frontend.
> The app may not run between early steps; clarity and architecture first.

## Day 1 — Manifest & Scope
- Introduced top-level goals (typed contracts via Zod, resilient HTTP, OIDC with httpOnly cookies, CSP).
- Added high-level service coverage: catalog, search, pricing, inventory, cart, checkout, orders, customer/consents, auth.

## Day 2 — Strict Tooling & Lint Fixes
- Enforced quality gates: TypeScript **strict** (safety flags), ESLint **v9 flat config** (with `@next/eslint-plugin-next`, `eslint-plugin-import`, `@eslint/js`, `globals`, `@typescript-eslint/parser`), Prettier, and Husky + lint-staged pre-commit.
- Standardized scripts and fixed TS/JSX lint issues (e.g., replaced `React.ReactNode` with typed `ReactNode` in `layout.tsx`) to ensure `pnpm typecheck` and `pnpm lint` pass cleanly.