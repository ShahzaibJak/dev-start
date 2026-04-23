# {project-name}

Production-ready Next.js, wired in from the start.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** — App Router with Turbopack
- **React 19** — Server and client components
- **TypeScript** — Strict mode
- **Tailwind CSS 4** — Utility-first styling
- **shadcn/ui** — Accessible component primitives
- **next-ts-api** — End-to-end type-safe API routes
- **Husky + lint-staged** — Pre-commit quality gates (ESLint + Prettier)

## Scripts

| Script | Description |
|---|---|
| `bun run dev` | Start dev server with Turbopack |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |
| `bun run typecheck` | TypeScript type checking |
| `bun run precommit` | Run lint-staged (called by Husky) |

## Project Structure

```
app/                  # Next.js App Router pages and API routes
  api/                # API route handlers (next-ts-api)
  layout.tsx          # Root layout
  page.tsx            # Landing page
components/
  ui/                 # shadcn/ui components
lib/
  api.ts              # Type-safe API client (next-ts-api)
  utils.ts            # Utility functions
types/                # Generated types (next-ts-api)
```

## AI Workflow

This project includes a `CLAUDE.md` with stack conventions, quality gates, and available skills. If the `ds-workflow` extra is installed, plans and handoffs live in `.claude/plans/` and `.claude/handoffs/`.

## Adding Components

```bash
bunx shadcn@latest add button
```

Components are placed in `components/ui/`. Import them with the `@/` path alias:

```tsx
import { Button } from "@/components/ui/button";
```
