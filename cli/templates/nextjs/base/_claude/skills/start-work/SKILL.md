---
name: start-work
description: "Begin or resume implementation from a PRD. Loads handoff context, follows plan steps sequentially, enforces type safety. Use when starting or continuing feature work."
---

# Start Work

You are starting or resuming work on a feature. Follow this process.

## Step 1: Identify Feature

The feature name is: $ARGUMENTS

**If no feature name provided:**
- Check `.claude/plans/` for existing PRDs
- Check `.claude/handoffs/` for in-progress features
- Present the user with a list:
  - Each plan file with its title and status (has handoff = "in progress", plan only = "not started")
  - A "New feature" option that redirects to `/start-prd`
- Wait for the user to select before proceeding

**If feature name provided but no matching plan exists:**
- Tell the user: "No plan found for '{feature-name}'. Run `/start-prd` first to create one."
- Stop.

## Step 2: Load Context

1. Read the PRD from `.claude/plans/{feature-name}.md`
2. Check for handoff file at `.claude/handoffs/{feature-name}.md`
3. If handoff exists:
   - Note completed steps — do NOT redo them
   - Read the "Current Step" section — this is where you resume
   - Read "Key Decisions" — maintain consistency with previous sessions
   - Read "Gotchas & Insights" — avoid known pitfalls
   - Read "Files Modified" — you may need to re-read these for context

## Step 3: Brief the User

Tell the user concisely:
- What step you're resuming from (or "starting fresh from step 1")
- What you'll work on this session
- Any decisions from previous sessions they should know about

## Step 4: Implement

Work through the PRD steps sequentially:

1. **Before each step**: Briefly state what you're about to do
2. **During each step**: Follow the PRD's file list and acceptance criteria exactly
3. **After each step**: Verify acceptance criteria are met
4. **Between steps**: If a step changes the plan, discuss with the user before proceeding

### Type Safety Rules (enforced)
- NEVER use `any` — use `unknown` with type guards, or define proper types
- NEVER use type assertions (`as Type`) — use type narrowing, discriminated unions, or `satisfies`
- NEVER add `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`
- NEVER add lint-disable comments (`oxlint-disable`, `eslint-disable`)
- Define return types explicitly on all functions
- When dealing with external data (API responses, JSON), define a schema (Zod) or interface first

### If you get stuck:
- Don't spin — explain the blocker to the user
- If a PRD step is wrong or impossible, propose an alternative
- Update the PRD if the user agrees to changes

## Step 5: Context Awareness

**You MUST be mindful of context usage throughout the session.**

- If you receive a context warning from the system (via hook), **immediately run `/handoff`**
- If you've been working for many steps and reading many files, proactively suggest: "Context is getting heavy — should I run `/handoff`?"
- After completing a major step is a natural handoff point
- When in doubt, handoff early — it's cheap, losing context is expensive

## Step 6: Completion

When ALL PRD steps are done:

1. Run quality gates (the project's lint, typecheck, test commands from CLAUDE.md)
2. Summarize what was built (files created/modified, key decisions)
3. Delete the handoff file: `.claude/handoffs/{feature-name}.md`
4. Add a `## Status: Complete` line to the top of the plan file
5. Tell the user: "Feature complete. Ready for review/commit."
