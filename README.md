<p align="center">
  <img src="./web/public/logo.svg" alt="ds-start" width="280" />
</p>

<p align="center">
  The AI-native Next.js starter. Type-safe and production-ready.
</p>

<p align="center">
  <a href="https://dev-start.shahzaibjak.com">Website</a> &bull;
  <a href="https://dev-start.shahzaibjak.com/docs">Docs</a> &bull;
  <a href="https://dev-start.shahzaibjak.com/features">Features</a> &bull;
  <a href="https://dev-start.shahzaibjak.com/workflow">Agentic Flow</a> &bull;
  <a href="https://dev-start.shahzaibjak.com/roadmap">Roadmap</a> &bull;
  <a href="#contributing">Contributing</a>
</p>

---

## Quick Start

```bash
npx ds-start my-app
```

Or with extras:

```bash
npx ds-start my-app --prisma --auth --github-workflows
# or with Clerk auth (no database required)
npx ds-start my-app --clerk --github-workflows
```

Interactive mode (prompts for extras):

```bash
npx ds-start my-app
```

Skip prompts with defaults:

```bash
npx ds-start my-app -y
```

## What You Get

Every project starts with a production-ready base where types flow end-to-end — from database schema through server actions to client components.

| Category | Tech | Link |
|----------|------|------|
| Framework | Next.js 16 (App Router, Turbopack) | [nextjs.org](https://nextjs.org) |
| Language | TypeScript (strict mode) | [typescriptlang.org](https://www.typescriptlang.org) |
| Styling | Tailwind CSS 4 + shadcn/ui | [tailwindcss.com](https://tailwindcss.com) · [ui.shadcn.com](https://ui.shadcn.com) |
| Fonts | Geist Sans + Geist Mono | [vercel.com/font](https://vercel.com/font) |
| API Routes | next-ts-api (end-to-end type safety) | [github](https://github.com/zahinafsar/next-ts-api) |
| URL State | nuqs (type-safe search params) | [nuqs.47ng.com](https://nuqs.47ng.com) |
| Server State | React Query (async state management) | [tanstack.com/query](https://tanstack.com/query) |
| Env Validation | varlock (schema-driven, type-safe) | [varlock.dev](https://varlock.dev) |
| Linting | oxlint + oxfmt | [oxc.rs](https://oxc.rs) |
| Type Checking | tsgo (native TypeScript compiler) | [npm](https://www.npmjs.com/package/@typescript/native-preview) |
| Testing | Vitest | [vitest.dev](https://vitest.dev) |
| Pre-commit | Husky + lint-staged (lint, format, typecheck) | [typicode.github.io/husky](https://typicode.github.io/husky) |
| Commits | commitlint + cz-git | [commitlint.js.org](https://commitlint.js.org) |
| Theme | Light/dark toggle with next-themes | [github](https://github.com/pacocoursey/next-themes) |

### Shadcn/ui Components

The base template ships with these shadcn/ui components pre-installed:

`Button` `Card` `Input` `Label` `Separator`

Add more with `bunx shadcn@latest add <component>`.

## Agentic Coding Flow

Every project ships with built-in skills that guide your AI coding assistant through a structured development cycle:

| Step | Skill | What it does |
|------|-------|-------------|
| **Plan** | `/start-prd` | Interview-driven PRD creation with implementation plan |
| **Build** | `/start-work` | Implement from a PRD, following plan steps sequentially |
| **Handoff** | `/handoff` | Save session progress for continuity across sessions |
| **Review** | `/start-review` | Run quality gates + code review (read-only) |
| **Ship** | `/start-pr` | Commit changes and create a PR |

Plus domain skills: `/next-ts-api` for type-safe APIs, `/vercel-react-best-practices` for React performance (64 rules), and `/frontend-design` for production-grade UI.

## Extras

Extras are opt-in layers that compose on top of the base template.

### [Prisma](https://www.prisma.io) (`--prisma`)

Prisma 6 ORM with PostgreSQL, PrismaPg adapter, typed JSONB via `prisma-json-types-generator`, and a singleton client.

### [Better Auth](https://www.better-auth.com) (`--auth`)

Full authentication system. Requires `--prisma`.

- Email/password sign-up and sign-in
- Google OAuth (optional, via env vars)
- Forgot/reset password flow
- Route protection via `proxy.ts` (Next.js 16)
- shadcn/ui forms with password show/hide toggles
- Protected dashboard page with session display

### [Clerk](https://clerk.com) (`--clerk`)

Managed authentication via Clerk. No database required.

- Email/password and social sign-in (configured via Clerk dashboard)
- Route protection via `proxy.ts` (Next.js 16)
- Cannot be combined with `--auth` (choose one auth provider)

### [Stripe](https://stripe.com) (`--stripe`)

Billing and subscription management with Stripe. Includes webhook handling, customer portal, and plan management. Works with both Better Auth and Clerk. Requires `--auth` or `--clerk`.

### [Email](https://resend.com) (`--email`)

Transactional email with Resend for delivery and React Email for type-safe, previewable templates. Welcome emails, password resets, and invitations.

### [File Uploads](https://aws.amazon.com/s3) (`--file-uploads`)

S3-compatible file uploads with presigned URLs, upload helpers, and a ready-made FileUpload component. Works with AWS S3, Cloudflare R2, MinIO, and Backblaze B2.

### [Zustand](https://zustand.docs.pmnd.rs) (`--zustand`)

Lightweight client state management. Provider-free, TypeScript-first stores with Redux DevTools support. Stores live in `lib/stores/`.

### GitHub Workflows (`--github-workflows`)

CI pipeline for GitHub Actions: lint, typecheck, build on every PR. Runs on [Blacksmith](https://blacksmith.sh) for faster builds. Includes `varlock scan` for secret leak detection.

### Vercel Deploy (`--vercel-deploy`)

CD pipeline via [Vercel CLI](https://vercel.com/docs/cli). Preview deploys on push to main, manual dispatch for production. Implies `--github-workflows`.

## Adding Extras to Existing Projects

Already have a Next.js project scaffolded with ds-start? Add independent extras without re-scaffolding:

```bash
ds-start add email
ds-start add file-uploads
ds-start add zustand
ds-start add github-workflows
ds-start add vercel-deploy
```

The `add` command detects conflicts, merges where possible (package.json, .gitignore, .env.schema), and prompts you for resolution on any conflicts. Dependencies are not auto-installed — run `bun install` when ready.

> **Note:** Dependent extras (prisma, auth, clerk, stripe) must be included during initial scaffold with flags.

## Composability

Extras compose freely with a few rules:

- `--auth` requires `--prisma` (auth uses Prisma as its database adapter)
- `--clerk` cannot be combined with `--auth` (choose one auth provider)
- `--vercel-deploy` implies `--github-workflows` (CD builds on CI)
- Everything else is independent

Example combinations:

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

## Development

### Prerequisites

- [Bun](https://bun.sh) v1.1+
- Node.js 18+

### Setup

```bash
git clone https://github.com/shahzaibjak/dev-start.git
cd dev-start
bun install
bun run build
```

### Commands

```bash
bun run build       # Build the CLI
bun run lint        # Lint with oxlint
bun run typecheck   # TypeScript strict check
```

### Testing locally

```bash
# Scaffold and test a project
node cli/dist/index.js init my-test-app --prisma --auth

# Run verification scripts
bun run verify:nextjs-base
bun run verify:nextjs-better-auth-prisma
```

### Project structure

```
cli/
  src/
    cli.ts                    # Main command definition (citty subcommands)
    index.ts                  # Entry point
    commands/
      create.ts               # Scaffold logic (init subcommand)
      add.ts                  # Add extras to existing projects
    helpers/
      conflict.ts             # Conflict detection, resolution, and apply
      detect-project.ts       # Project root validation
      git.ts, install.ts      # Git and dependency helpers
      scaffold.ts             # Template scaffolding utilities
    installers/               # Extensible installer pattern
  templates/
    nextjs/
      base/                   # Base Next.js template
      extras/                 # Composable extras (prisma, better-auth, etc.)
  dist/                       # Build output (tsup)
scripts/                      # Verification scripts
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

<a href="https://github.com/shahzaibjak/dev-start/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=shahzaibjak/dev-start" />
</a>

## License

[MIT](LICENSE)
