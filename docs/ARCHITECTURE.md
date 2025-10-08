# Architecture & Conventions

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict)
- **Data**: @tanstack/react-query for caching, retries (policy at hooks-level)
- **Validation**: Zod schemas per domain
- **Styling**: custom dark-first theme (CSS tokens `--orbity-*`)
- **Quality**: ESLint, Prettier, Husky + lint-staged

## Project Layout (essentials)