<p align="center">
  <h1 align="center">devstart</h1>
</p>

<p align="center">
  Scaffold production-ready Next.js apps with one command.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#what-you-get">What You Get</a> &bull;
  <a href="#extras">Extras</a> &bull;
  <a href="#contributing">Contributing</a> &bull;
  <a href="#license">License</a>
</p>

---

## Quick Start

```bash
npx devstart my-app
```

Or with extras:

```bash
npx devstart my-app --prisma --auth --github-workflows
```

Interactive mode (prompts for extras):

```bash
npx devstart my-app
```

Skip prompts with defaults:

```bash
npx devstart my-app -y
```

## What You Get

Every project starts with a production-ready base:

| Category | Tech |
|----------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Fonts | Geist Sans + Geist Mono |
| API Routes | next-ts-api (end-to-end type safety) |
| Env Validation | varlock (schema-driven, type-safe) |
| Linting | ESLint + Prettier |
| Pre-commit | Husky + lint-staged (lint, format, typecheck) |
| Theme | Light/dark toggle with next-themes |

### Shadcn/ui Components

The base template ships with these shadcn/ui components pre-installed:

`Button` `Card` `Input` `Label` `Separator`

Add more with `bunx shadcn@latest add <component>`.

## Extras

Extras are opt-in layers that compose on top of the base template.

### Prisma (`--prisma`)

Prisma 6 ORM with PostgreSQL, PrismaPg adapter, typed JSONB via `prisma-json-types-generator`, and a singleton client.

### Better Auth (`--auth`)

Full authentication system. Requires `--prisma`.

- Email/password sign-up and sign-in
- Google OAuth (optional, via env vars)
- Forgot/reset password flow
- Route protection via `proxy.ts` (Next.js 16)
- shadcn/ui forms with password show/hide toggles
- Protected dashboard page with session display

### GitHub Workflows (`--github-workflows`)

CI pipeline for GitHub Actions: lint, typecheck, build on every PR. Runs on Blacksmith for faster builds. Includes `varlock scan` for secret leak detection.

### Vercel Deploy (`--vercel-deploy`)

CD pipeline via Vercel CLI. Preview deploys on push to main, manual dispatch for production. Implies `--github-workflows`.

### DS Workflow (`--workflow`)

AI-native development workflow with 12 agent skills for Claude Code, hooks for type checking and context monitoring, and structured plans/handoffs directories.

## Composability

Extras compose freely with a few rules:

- `--auth` requires `--prisma` (auth uses Prisma as its database adapter)
- `--vercel-deploy` implies `--github-workflows` (CD builds on CI)
- Everything else is independent

Example combinations:

```bash
# Full stack
npx devstart my-app --prisma --auth --github-workflows --workflow

# API-focused
npx devstart my-app --prisma --github-workflows

# Minimal + CI
npx devstart my-app --github-workflows
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
    cli.ts              # Command definition (citty)
    index.ts            # Entry point
    commands/create.ts   # Scaffold logic
    helpers/             # Git, install, scaffold utilities
  templates/
    nextjs/
      base/             # Base Next.js template
      extras/           # Composable extras (prisma, better-auth, etc.)
  dist/                 # Build output (tsup)
scripts/                # Verification scripts
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

<a href="https://github.com/shahzaibjak/dev-start/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=shahzaibjak/dev-start" />
</a>

## License

[MIT](LICENSE)
