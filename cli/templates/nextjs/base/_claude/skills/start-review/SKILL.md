---
name: start-review
description: "Run quality gates and review diff for issues. Strictly read-only — reports lint, typecheck, test results plus code quality, logic, pattern, and security review."
---

# Start Review

You are reviewing the current changes in this project. This is a READ-ONLY operation — do NOT modify any files, do NOT fix issues, do NOT stage or commit anything.

## Step 1: Identify Quality Gate Commands

Read `.claude/ds-config.json` in the project root's `.claude/` directory. It contains the configured quality gate commands under `qualityGates`.

If the file doesn't exist, check CLAUDE.md for quality gate commands. If neither exists, tell the user: "No quality gates configured. Add quality gate commands to CLAUDE.md or `.claude/ds-config.json` first." and stop.

## Step 2: Run Quality Gates

Run each configured command sequentially. Capture output and status for each:

1. **Lint** — run the configured lint command
2. **Typecheck** — run the configured typecheck command
3. **Test** — run the configured test command
4. **Format check** — run the configured format command (if it has a check mode)

For each command, note:
- Pass or fail
- If failed: the specific errors (file, line, message)

Do NOT fix anything. Just report.

## Step 3: Review Changes

Check what's changed:

1. Run `git status` to see staged and unstaged changes
2. Run `git diff --cached` for staged changes (if any)
3. Run `git diff` for unstaged changes (if any)
4. If nothing is staged, review all unstaged changes

For the diff, review:

### Code Quality
- Are there `any` types, type casts, `@ts-ignore`, bare `@ts-expect-error` (without description), or lint-disable comments (`oxlint-disable`, `eslint-disable`)?
- Are there unused imports or variables?
- Are there hardcoded values that should be constants/config?
- Are there potential null/undefined issues?

### Logic & Correctness
- Are there edge cases not handled?
- Are there potential race conditions or async issues?
- Does the logic match what the code intends to do?
- Are error cases handled properly?

### Patterns & Conventions
- Does the code follow the project's conventions (from CLAUDE.md)?
- Are files in the correct location per project structure rules?
- Are imports using the correct aliases/patterns?
- Does naming follow project conventions?

### Security
- Any sensitive data exposed (keys, tokens, passwords)?
- Any injection vulnerabilities (SQL, XSS, command)?
- Any unsafe user input handling?

## Step 4: Report

Present findings in this format:

```
## Quality Gates

| Check      | Status | Details          |
|------------|--------|------------------|
| Lint       | ✓ / ✗  | {summary}        |
| Typecheck  | ✓ / ✗  | {summary}        |
| Test       | ✓ / ✗  | {summary}        |
| Format     | ✓ / ✗  | {summary}        |

## Code Review

### Issues Found
1. **{severity}** `{file}:{line}` — {description}
2. ...

### Suggestions
1. `{file}:{line}` — {suggestion}
2. ...

### Summary
{1-2 sentence overall assessment — is this ready for PR or needs work?}
```

Severity levels: **critical** (must fix), **warning** (should fix), **nit** (optional improvement)

Remember: DO NOT make any changes. Report only.
