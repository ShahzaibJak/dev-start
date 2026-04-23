# Agent Workflows

Adds the Dev Start workflow system for structured AI-assisted development.

## Key Files

| Path | Purpose |
|---|---|
| `.claude/skills/` | Skill definitions (symlinked to `.agents/skills/`) |
| `.claude/shared/workflow.md` | Canonical workflow contract |
| `.claude/plans/` | Implementation plans from PRDs |
| `.claude/handoffs/` | Session continuity notes |
| `.claude/ds-config.json` | Quality gate configuration |

## Next Steps

Start with `/start-prd` to plan a feature, then `/start-work` to implement it.
