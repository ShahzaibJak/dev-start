# Project Instructions

## Workflow
- Keep plans in `.claude/plans/`.
- Use the shared workflow contract in `.claude/shared/workflow.md`.
- Keep handoff notes in `.claude/handoffs/`.
- Read `.claude/ds-config.json` before changing quality-gate commands.
- Skills are in `.claude/skills/` — use `/ds-overview` for a full list.

## Conventions
- Prefer server components until client behavior is needed.
- Keep route segments and component files in kebab-case where practical.
- Use the `@/` path alias for app imports.
- Reuse existing UI primitives before adding custom abstractions.
- Do not document commands that are not present in `package.json`.
