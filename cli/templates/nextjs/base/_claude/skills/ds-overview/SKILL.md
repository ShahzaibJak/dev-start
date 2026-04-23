---
name: ds-overview
description: "Explain the Dev Setup workflow system. Summarizes philosophy, available skills, typical flow, key files, type safety enforcement, and context tracking."
---

# DS Overview

You are explaining the Dev Setup (DS) workflow system to the user. Present this overview clearly and concisely.

---

Print the following, adapting any details based on whether this project has been set up (check for `.claude/ds-config.json`):

---

## Dev Setup (DS) — Opinionated Claude Code Workflow

A plan-first, type-safe development workflow with automatic session continuity.

### Philosophy

1. **Plan before you code.** Every feature starts with a PRD — not a blank file. The interview process forces you to think through scope, edge cases, and architecture before writing a single line. This eliminates throwaway code and rework.

2. **Type safety is non-negotiable.** `any` is a bug waiting to happen. Type casts hide mismatches. Disable comments sweep problems under the rug. This workflow enforces strict types at two layers — Claude follows the rules by instruction, and a hook catches anything that slips through. The only escape hatch is `// type-ok`, which is intentionally ugly so it stands out in review.

3. **Context is finite, progress is not.** Claude's context window is a hard limit. Instead of fighting it — cramming everything in until quality degrades — this workflow embraces session boundaries. The handoff system writes structured state to disk so a fresh session picks up exactly where the last one left off, with zero knowledge loss. Work in focused sprints, not marathon sessions.

4. **Review and ship are separate from building.** `/start-review` is read-only — it tells you what's wrong without touching anything. `/start-pr` handles git mechanics without touching code. This separation prevents "just one more fix" spirals and keeps each step auditable.

5. **Configuration lives with the project.** Every project is different. `/ds-setup` interviews you once, saves your quality gates and conventions, and every other skill reads from that config. Team members get the same workflow by pulling the repo.

### Skills

| Skill | What it does | Modifies code? |
|-------|-------------|----------------|
| `/ds-setup` | Bootstrap the workflow for this project — reviews repo, interviews you, creates config + hooks + CLAUDE.md | Yes (config only) |
| `/ds-overview` | This overview | No |
| `/start-prd` | Interview-driven PRD creation — explores code, asks targeted questions, outputs a step-by-step plan | No (creates plan file) |
| `/start-work {feature}` | Implement from PRD, resume from handoffs — follows the plan step by step | Yes |
| `/auto-work {feature}` | Autonomous iteration — picks next step, implements, verifies, commits, or escalates | Yes |
| `/handoff` | Save session progress — completed steps, current state, decisions, insights — for the next session | No (creates handoff file) |
| `/start-review` | Run quality gates (lint, typecheck, test, format) + review diff for issues — strictly read-only | No |
| `/start-pr [msg]` | Commit changes, run pre-commit hooks, create PR — no code modifications | No (git/gh only) |
| `/start-brief [prd]` | Create a polished feature brief website for stakeholders | Yes (standalone app) |

### Typical Flow

```
/ds-setup                    <- one-time project setup
    |
/start-prd                   <- plan the feature
    |
/start-work my-feature       <- implement step by step
    |
  (context warning at 50%)   <- automatic detection
    |
/handoff                     <- save progress
    |
  (new session)
    |
/start-work my-feature       <- resume where you left off
    |
  (all steps complete)
    |
/start-review                <- verify quality gates + review changes
    |
/start-pr                    <- commit + create PR
```

### Key Files (per project)

| File | Purpose | Committed? |
|------|---------|------------|
| `CLAUDE.md` | Project conventions + type safety rules | Yes |
| `.claude/ds-config.json` | Quality gate commands + conventions | No |
| `.claude/settings.json` | Hook configuration | Yes |
| `.claude/scripts/check-types.sh` | Type safety enforcement hook | Yes |
| `.claude/scripts/check-context.sh` | Context usage warning hook | Yes |
| `.claude/plans/{feature}.md` | PRD files | No |
| `.claude/handoffs/{feature}.md` | Session handoff state | No |

### Type Safety

Enforced at two layers:

- **CLAUDE.md rules** — Claude follows these by instruction (primary enforcement)
- **PostToolUse hook** — `check-types.sh` blocks any `Edit`/`Write` that introduces violations (safety net)

Rules:
- No `any` -> use `unknown` + type guards or proper types
- No `as Type` -> use type narrowing, discriminated unions, or `satisfies`
- No `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` -> fix the type error
- No `eslint-disable` -> fix the lint issue
- Escape hatch: `// type-ok` (for genuinely unavoidable cases like third-party mismatches)

### Context Tracking

- **Status line** shows `ctx:{pct}%` and writes usage to a temp file
- **UserPromptSubmit hook** reads the temp file and warns Claude when context exceeds 50%
- **`/start-work`** instructions also tell Claude to be proactively context-aware
- When triggered: run `/handoff` -> start new session -> `/start-work {feature}` to resume

---

If this project hasn't been set up yet, tell the user:

> "This project doesn't have DS configured yet. Run `/ds-setup` to get started."
