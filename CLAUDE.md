# Claude Code Instructions

## Project Overview
Bun monorepo containing `devstart`. The repo is in template-rebuild mode: the CLI/package structure stays in place while shipped app templates are removed and rebuilt from real baselines.

## Project Structure
```
cli/                          # devstart package (workspace)
  src/
    cli.ts                    # Main command definition (citty)
    index.ts                  # Entry point
    commands/create.ts        # Current scaffold gate / rebuild-state behavior
    helpers/                  # git, install, package-json, scaffold utilities
    installers/               # Extensible installer pattern (index barrel + versions)
  templates/                  # Rebuild markers for future template families
  dist/                       # Build output (tsup)
```

## Code Location Rules
- CLI commands go in `cli/src/commands/`
- Shared utilities go in `cli/src/helpers/`
- New installers go in `cli/src/installers/` and register in `installers/index.ts`
- Reintroduced template files go in `cli/templates/{template}/base/` or `extras/`
- Dotfiles in templates use underscore prefix (`_gitignore`, `_env.schema`) — npm strips dotfiles on publish

## Quality Gates
```bash
# Run before commits:
bun run lint        # oxlint
bun run typecheck   # tsc --noEmit
bun run build       # tsup
```

## Type Safety Rules (enforced)
- NEVER use `any` type — use `unknown` + type guards, or define proper types
- NEVER use type assertions (`as Type`) — use type narrowing, discriminated unions, or `satisfies`
- NEVER add `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck` comments
- NEVER add `eslint-disable` comments
- ALL function parameters and return types must be explicitly typed
- For external data, define Zod schemas or TypeScript interfaces FIRST
- Use `satisfies` operator over `as` for type validation
- Escape hatch: append `// type-ok` to a line ONLY when absolutely unavoidable (third-party API mismatch, etc.)

## Conventions
- **File naming:** kebab-case for all files and directories
- **Imports:** Relative imports with `.js` extensions (ESM). No path aliases in CLI source.
- **Exports:** Named exports for helpers/utilities. No default exports except entry points.
- **Functions:** Named function declarations for exported functions. Async/await throughout.
- **CLI framework:** citty for command definitions, consola for logging/prompts
- **Template policy:** Do not hand-wave template files into place. Rebuild from a real app baseline, then layer project-specific changes intentionally.
- **Error handling:** Throw errors, let them propagate. Defensive checks with early returns.
- **Commit style:** Conventional commits via commitlint + commitizen (cz-git)
- **Versioning:** Changesets
