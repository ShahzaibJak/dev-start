---
name: start-prd
description: "Interview-driven PRD creation. Explores the codebase, asks targeted questions, and outputs a step-by-step implementation plan. Use when starting a new feature."
---

# Start PRD

You are starting a new feature PRD (Product Requirements Document) using a plan-first approach. Follow this process exactly.

## Phase 1: Minimal Project Scan (silent — don't dump to user)

Quickly read:
- `CLAUDE.md` (if exists) — understand project conventions
- `package.json` / `tsconfig.json` — detect stack, framework, package manager
- Top-level directory structure — get a feel for the project layout

Do NOT deep-dive into the codebase yet. Just orient yourself.

## Phase 2: Feature Discovery

Ask the user a single open question:

> "What feature are you building? Give me a brief description and any context that would help."

Wait for their response. Do not proceed until they answer.

## Phase 3: Targeted Research

Based on the feature description, do a focused codebase exploration:

1. **Find related code** — Search for files, components, utilities, and patterns related to the feature
2. **Examine existing patterns** — How does the codebase handle similar features? What conventions are used?
3. **Check data layer** — Database schema, API routes, types/interfaces relevant to the feature
4. **Identify integration points** — What existing code will this feature touch or extend?

Summarize your findings briefly to the user:
> "Here's what I found in the codebase that's relevant to this feature: ..."

## Phase 4: Clarifying Interview

Ask 3-5 targeted questions based on your research. These should be SPECIFIC, not generic. Cover:

- **Scope boundaries**: What's in vs out? Any related features to explicitly exclude?
- **Edge cases from code**: "I noticed {pattern} in the codebase — should this feature follow the same approach?"
- **Integration decisions**: "This will touch {existing module} — should we extend it or create a new one?"
- **UX/behavior**: Specific user-facing decisions that affect implementation
- **Data model**: Any new fields, tables, or type changes needed?

Ask questions in a numbered list. Wait for answers. Ask follow-up questions if anything is unclear.

## Phase 5: Generate PRD

Determine a kebab-case feature name from the discussion.

Create the PRD at `.claude/plans/{feature-name}.md`:

```markdown
# {Feature Name}

## Summary
One paragraph describing the feature, its purpose, and user value.

## Scope
- **In scope**: ...
- **Out of scope**: ...

## Implementation Plan

### Step 1: {Type Contracts & Interfaces}
- **Files**: list files to create/modify
- **What**: Define all new types, interfaces, and schemas FIRST
- **Types to define**:
  ```typescript
  // key interfaces/types
  ```
- **Acceptance criteria**:
  - [ ] All types are strict — no `any`, no type casts
  - [ ] Types are exported from correct module

### Step 2: {description}
- **Files**: list files to create/modify
- **What**: detailed description of changes
- **depends_on**: [1]  <!-- optional; omit to mean "depends on the previous step" -->
- **Acceptance criteria**:
  - [ ] criterion 1
  - [ ] criterion 2

### Step 3: {description}
...

(continue for each step — order by dependency, types first)

**Note on `depends_on`**: Optional field. List the step numbers this step depends on. Omit to mean "depends on the immediately previous step" (the default, sequential behavior). Use this when steps can run in flexible order — e.g. independent UI and infra steps that can be done in either order.

## Architecture Decisions
- {decision}: {rationale}

## Type Safety Contract
- No `any` types — use `unknown` + type guards where type is uncertain
- No type assertions (`as Type`) — use discriminated unions or type narrowing
- No `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`
- No `eslint-disable` comments
- All function parameters and return types must be explicitly typed
- Use `satisfies` operator over `as` for type validation

## Quality Gates
- [ ] TypeScript strict mode passes
- [ ] All lint rules pass (no disable comments)
- [ ] Tests cover key paths
- [ ] No regressions in existing tests
```

## Phase 6: Confirm

Present a brief summary of the PRD to the user:
- Number of steps
- Key architectural decisions
- Estimated scope/complexity

Ask: "Does this plan look good? Any changes before we start?"

After approval, tell the user:
> "PRD saved. Run `/start-work {feature-name}` to begin implementation."
