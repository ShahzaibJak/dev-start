# ds-start

Scaffold AI-native, end-to-end type-safe Next.js apps with production-ready tooling — in one command.

## Quick Start

```bash
npx ds-start my-app
```

With extras:

```bash
npx ds-start my-app --prisma --auth --github-workflows
# or with Clerk auth (no database required)
npx ds-start my-app --clerk --github-workflows
```

Skip prompts with defaults:

```bash
npx ds-start my-app -y
```

## Why ds-start?

**End-to-end type safety** — Types flow from your database schema through server actions to client components. [Prisma](https://www.prisma.io) generates types from your DB, [next-ts-api](https://github.com/zahinafsar/next-ts-api) ensures your API routes and clients share the same contract, and [varlock](https://varlock.dev) validates environment variables at build time. No `any`, no runtime surprises.

**Agentic coding flows** — Every project ships with built-in skills for AI coding assistants. A structured development cycle — `/start-prd` to plan, `/start-work` to build, `/handoff` to preserve context, `/start-review` to verify, `/start-pr` to ship — so your AI assistant understands your project conventions out of the box.

**Production-ready tooling** — Not a toy starter. You get strict TypeScript, ESLint + Prettier, Husky pre-commit hooks running lint + format + typecheck, and GitHub Actions CI — all wired up and working from the first commit.

## What's Included

### Base Template

| Category | Tech | Link |
|----------|------|------|
| Framework | Next.js 16 (App Router, Turbopack) | [nextjs.org](https://nextjs.org) |
| Language | TypeScript (strict mode) | [typescriptlang.org](https://www.typescriptlang.org) |
| Styling | Tailwind CSS 4 + shadcn/ui | [tailwindcss.com](https://tailwindcss.com) · [ui.shadcn.com](https://ui.shadcn.com) |
| Fonts | Geist Sans + Geist Mono | [vercel.com/font](https://vercel.com/font) |
| API Routes | next-ts-api (end-to-end type safety) | [github](https://github.com/zahinafsar/next-ts-api) |
| Env Validation | varlock (schema-driven, type-safe) | [varlock.dev](https://varlock.dev) |
| Linting | ESLint + Prettier | [eslint.org](https://eslint.org) · [prettier.io](https://prettier.io) |
| Pre-commit | Husky + lint-staged | [typicode.github.io/husky](https://typicode.github.io/husky) |
| Theme | Light/dark toggle with next-themes | [github](https://github.com/pacocoursey/next-themes) |

Ships with `Button`, `Card`, `Input`, `Label`, and `Separator` from shadcn/ui. Add more with `bunx shadcn@latest add <component>`.

### Agentic Coding Flow

Every project includes skills that guide your AI coding assistant through a structured development cycle:

| Step | Skill | What it does |
|------|-------|-------------|
| Plan | `/start-prd` | Interview-driven PRD creation with implementation plan |
| Build | `/start-work` | Implement from a PRD, following plan steps sequentially |
| Handoff | `/handoff` | Save session progress for continuity across sessions |
| Review | `/start-review` | Run quality gates + code review (read-only) |
| Ship | `/start-pr` | Commit changes and create a PR |

Plus domain skills: `/next-ts-api` for type-safe APIs, `/vercel-react-best-practices` for performance (64 rules), and `/frontend-design` for production-grade UI.

### Extras

Opt-in layers that compose on top of the base.

**[Prisma](https://www.prisma.io)** (`--prisma`) — Prisma 6 ORM with PostgreSQL, PrismaPg adapter, typed JSONB via `prisma-json-types-generator`, and a singleton client.

**[Better Auth](https://www.better-auth.com)** (`--auth`) — Full auth system with email/password, Google OAuth, forgot/reset password, route protection via `proxy.ts`, and shadcn/ui forms. Requires `--prisma`.

**[Clerk](https://clerk.com)** (`--clerk`) — Managed authentication via Clerk. No database required. Route protection via `proxy.ts`. Cannot be combined with `--auth`.

**GitHub Workflows** (`--github-workflows`) — CI pipeline: lint, typecheck, build on every PR. Runs on [Blacksmith](https://blacksmith.sh) for faster builds. Includes `varlock scan` for secret leak detection.

**Vercel Deploy** (`--vercel-deploy`) — CD pipeline via [Vercel CLI](https://vercel.com/docs/cli). Preview deploys on push, manual dispatch for production. Implies `--github-workflows`.

## Composability

Extras compose freely with a few rules:

- `--auth` requires `--prisma` (auth uses Prisma as its database adapter)
- `--clerk` cannot be combined with `--auth` (choose one auth provider)
- `--vercel-deploy` implies `--github-workflows` (CD builds on CI)
- Everything else is independent

```bash
# Full stack with Better Auth
npx ds-start my-app --prisma --auth --github-workflows

# Clerk auth (no database needed)
npx ds-start my-app --clerk --github-workflows

# API-focused
npx ds-start my-app --prisma --github-workflows

# Minimal + CI
npx ds-start my-app --github-workflows
```

## Links

- [GitHub](https://github.com/ShahzaibJak/dev-start)
- [Contributing](https://github.com/ShahzaibJak/dev-start/blob/main/CONTRIBUTING.md)
- [Issues](https://github.com/ShahzaibJak/dev-start/issues)

## License

[MIT](https://github.com/ShahzaibJak/dev-start/blob/main/LICENSE)
