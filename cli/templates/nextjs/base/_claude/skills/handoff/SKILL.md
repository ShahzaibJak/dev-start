---
name: handoff
description: "Save session progress for continuity. Writes structured handoff notes capturing completed steps, current state, decisions, and insights so the next session picks up seamlessly."
---

# Handoff

You are handing off the current work session to a future session. This preserves context so the next session can pick up exactly where you left off.

## Step 1: Identify Current Feature

Determine which feature you're currently working on from the conversation context.

If you're not sure, check which `.claude/plans/*.md` file was being worked on.

If no feature is active, tell the user: "No active feature work to hand off." and stop.

## Step 2: Assess Progress

Review the PRD at `.claude/plans/{feature-name}.md` and determine:
- Which steps are fully completed
- Which step you're currently in the middle of
- What exactly you were doing when handoff was triggered

## Step 3: Write Handoff File

Create or overwrite `.claude/handoffs/{feature-name}.md`:

```markdown
# Handoff: {Feature Name}

> Session ended: {current date/time}

## PRD
`.claude/plans/{feature-name}.md`

## Completed Steps
- [x] Step 1: {title} — {one-line summary of what was done}
- [x] Step 2: {title} — {one-line summary}

## Current Step
**Step {N}: {title}**
- What's done in this step: {describe progress within the step}
- Where I left off: {exact point — e.g., "finished the API route, still need the frontend component"}
- Immediate next action: {the very next thing the new session should do}

## Key Decisions Made
- {decision}: {rationale} — {which step this was for}
- {decision}: {rationale}

## Files Modified This Session
- `path/to/file.ts` — {what changed and why}
- `path/to/file.ts` — {what changed and why}

## Gotchas & Insights
- {anything the next session needs to know that isn't in the PRD}
- {unexpected behavior, workarounds, or important context}

## Remaining Steps
- [ ] Step {N}: {title} — {any notes from current session}
- [ ] Step {N+1}: {title}
```

## Step 4: Verify

- Re-read the handoff file you just wrote
- Make sure "Immediate next action" is specific enough that a fresh session can start without guessing
- Make sure "Key Decisions" captures anything that would be lost without conversation context

## Step 5: Notify User

Tell the user:

> **Handoff saved** to `.claude/handoffs/{feature-name}.md`
>
> **Progress**: {X}/{total} steps complete, currently on Step {N}
>
> To resume, start a new session and run:
> ```
> /start-work {feature-name}
> ```
