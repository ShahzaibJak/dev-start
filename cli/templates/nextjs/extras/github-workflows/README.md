# GitHub Workflows

Adds a GitHub Actions CI workflow for automated quality checks on every push and pull request.

## Key Files

| File | Purpose |
|---|---|
| `.github/workflows/ci.yml` | CI pipeline configuration |

## What CI Runs

- Bun setup and dependency installation
- `bun run lint` — oxlint checks
- `bun run typecheck` — TypeScript type checking
- `bun run build` — Production build verification

## Next Steps

This module is intentionally CI-only. It does not add deployment, release automation, or secrets management. Extend the workflow as your project grows.
