# DS Workflow

## Intent
Use a plan-first workflow that stays aligned with the actual scaffolded app contract.

## Canonical Paths
- Plans: `.claude/plans/`
- Handoffs: `.claude/handoffs/`
- Quality gates: `.claude/ds-config.json`
- Codex entrypoint: `.agents/README.md`

## Required Quality Gates
```bash
bun run build
bun run lint
bun run typecheck
```

## Rules
1. Start larger work from a written plan.
2. Keep commands and docs aligned with `package.json`.
3. Leave a handoff note when work spans sessions.
4. Treat `.claude/shared/` as the shared source of truth for workflow docs.
