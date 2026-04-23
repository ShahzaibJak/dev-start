---
name: ds-setup
description: "Bootstrap the DS workflow for this project. Reviews repo structure, interviews for quality gate commands and conventions, creates config, hooks, and CLAUDE.md updates."
---

# Dev Setup

You are setting up the opinionated Claude Code dev workflow for this project. This configures plan-first development, type safety enforcement, context-aware session handoffs, and project-specific conventions.

## Phase 1: Project Review (silent — don't dump to user)

Review the project to understand what you're working with:

1. **Package/project files**: `package.json`, `tsconfig.json`, `Cargo.toml`, `go.mod`, etc.
2. **Directory structure**: `ls` the top-level and key subdirectories
3. **Existing CLAUDE.md**: Read it if it exists — note what's already configured
4. **Existing `.claude/`**: Check for existing settings, hooks, commands, plans, handoffs
5. **Quality gate scripts**: What lint/format/test/typecheck commands exist?
6. **Git config**: `.gitignore`, hooks, branch conventions
7. **Framework-specific**: Detect Next.js, SST, Prisma, monorepo tools, etc.

Build a mental model of the project before asking questions.

## Phase 2: Present Findings & Interview

Start with a brief summary:

> "Here's what I see: {stack summary — e.g., 'Next.js 15 + TypeScript monorepo with Bun, Nx, SST v3'}"

Then ask these questions (adapt based on what you found):

### Project Understanding
1. "Is there anything about the architecture I should know that isn't obvious from the code?"
2. "Any conventions or patterns the team follows that I should enforce?"

### Workflow Preferences
3. "I'll set up these workflow skills — any you want to skip?"
   - `/start-prd` — Interview-driven PRD creation before coding
   - `/start-work {feature}` — Execute work from PRD, resume from handoffs
   - `/handoff` — Save progress for session continuity
   - Type safety enforcement (no `any`, no casts, no disable comments)
   - Context-aware handoff warnings

4. "What are your quality gate commands? These are used by `/start-review` and `/start-pr`." (pre-fill from what you detected)
   - Lint: `{detected}` (e.g., `bun run lint`)
   - Format: `{detected}` (e.g., `bun run fmt`)
   - Typecheck: `{detected}` (e.g., `bun run typecheck` or `npx tsc --noEmit`)
   - Test: `{detected}` (e.g., `bun run test`)
   - Format check (non-mutating): `{detected}` (e.g., `bun run fmt --check`)

   Confirm each one — these will be saved to `.claude/ds-config.json` and used by `/start-review` before every PR.

### Code Conventions
5. "Any of these to configure?"
   - File naming convention (kebab-case, camelCase, etc.)
   - Import patterns (aliases, barrel exports, etc.)
   - Testing patterns (co-located, separate dir, etc.)
   - Component patterns (if frontend)

Wait for all answers before proceeding.

## Phase 3: Configure

### 3a. Create Directories

```bash
mkdir -p .claude/plans .claude/handoffs .claude/scripts
```

### 3b. Save Quality Gate Config

Create `.claude/ds-config.json` with the confirmed quality gate commands:

```json
{
  "qualityGates": {
    "lint": "{confirmed lint command}",
    "format": "{confirmed format command}",
    "formatCheck": "{confirmed format check command or null}",
    "typecheck": "{confirmed typecheck command}",
    "test": "{confirmed test command}"
  },
  "conventions": {
    "fileNaming": "{kebab-case|camelCase|etc}",
    "imports": "{description}",
    "testing": "{description}"
  }
}
```

This file is read by `/start-review` and `/start-pr` to know which commands to run.

### 3c. Create/Update CLAUDE.md

**IMPORTANT**: Also add `.claude/ds-config.json` to the gitignore additions (it contains local workflow config).

If CLAUDE.md exists, UPDATE it — don't overwrite. Add sections that are missing.
If it doesn't exist, create it.

The CLAUDE.md should include (adapt to project):

```markdown
# Claude Code Instructions

## Project Overview
{Brief description from interview + detected stack}

## Project Structure
{Key directories and their purpose — from your review}

## Code Location Rules
{Where different types of code belong}

## Quality Gates
```bash
# Run before commits:
{detected/confirmed commands}
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
{From interview — file naming, imports, testing, etc.}
```

### 3c. Type Safety Hook Script

Create `.claude/scripts/check-types.sh`:

```bash
#!/bin/bash
# PostToolUse hook: check for type safety violations in edited TypeScript files
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Skip if no file path or file doesn't exist
[ -z "$file_path" ] || [ ! -f "$file_path" ] && exit 0

# Only check TypeScript files
case "$file_path" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

# Skip node_modules, generated files, and declaration files
case "$file_path" in
  */node_modules/*|*.d.ts|*/generated/*|*/.next/*) exit 0 ;;
esac

violations=""

# Check for 'any' in type positions (: any, <any>, as any, any[], any;, any,)
while IFS= read -r line; do
  # Skip lines with // type-ok escape hatch
  echo "$line" | grep -q '// type-ok' && continue
  violations+="$line\n"
done < <(grep -nE ':\s*any\b|<any>|<any,|\bas\s+any\b|\bany\[\]|\bany\s*[;,)]|\bany\s*$' "$file_path" 2>/dev/null | grep -v '// type-ok')

# Check for type assertions (as SomeType) — but not 'as const' or 'as keyof'
while IFS= read -r line; do
  echo "$line" | grep -q '// type-ok' && continue
  violations+="$line\n"
done < <(grep -nP '\bas\s+(?!const\b|keyof\b|typeof\b)[A-Z][A-Za-z]+' "$file_path" 2>/dev/null | grep -v '// type-ok')

# Check for ts-ignore, ts-expect-error, ts-nocheck
ts_disables=$(grep -n '@ts-ignore\|@ts-expect-error\|@ts-nocheck' "$file_path" 2>/dev/null | grep -v '// type-ok')
[ -n "$ts_disables" ] && violations+="$ts_disables\n"

# Check for eslint-disable
eslint_disables=$(grep -n 'eslint-disable' "$file_path" 2>/dev/null | grep -v '// type-ok')
[ -n "$eslint_disables" ] && violations+="$eslint_disables\n"

if [ -n "$violations" ] && [ "$violations" != "\n" ]; then
  # Clean up empty lines from violations
  clean_violations=$(echo -e "$violations" | sed '/^$/d')
  if [ -n "$clean_violations" ]; then
    echo "TYPE SAFETY VIOLATION in $file_path:" >&2
    echo "$clean_violations" >&2
    echo "" >&2
    echo "Fix these violations:" >&2
    echo "  - Replace 'any' with proper types (use 'unknown' + type guards if uncertain)" >&2
    echo "  - Replace 'as Type' with type narrowing or 'satisfies'" >&2
    echo "  - Remove @ts-ignore/@ts-expect-error — fix the underlying type error" >&2
    echo "  - Remove eslint-disable — fix the lint issue" >&2
    echo "  - If truly unavoidable, add '// type-ok' to the line" >&2
    exit 2
  fi
fi

exit 0
```

Make it executable: `chmod +x .claude/scripts/check-types.sh`

### 3d. Context Tracking Hook Script

Create `.claude/scripts/check-context.sh`:

```bash
#!/bin/bash
# UserPromptSubmit hook: warn when context usage is high
context_file="/tmp/claude_context_pct"

if [ -f "$context_file" ]; then
  pct=$(cat "$context_file" 2>/dev/null)
  if [ -n "$pct" ] && [ "$pct" -gt 50 ] 2>/dev/null; then
    echo "CONTEXT WARNING: Session context usage is at ${pct}%. You should run /handoff now to save progress and continue in a fresh session. Do not start new steps — wrap up and hand off."
  fi
fi

exit 0
```

Make it executable: `chmod +x .claude/scripts/check-context.sh`

### 3e. Context Tracking Status Line

Create `.claude/scripts/statusline-context.sh`:

```bash
#!/bin/bash
# Status line script: tracks context usage and writes to temp file for hooks
input=$(cat)
pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0' 2>/dev/null)
total=$(echo "$input" | jq -r '.context_window.context_window_size // 0' 2>/dev/null)
cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0' 2>/dev/null)

# Write context percentage to temp file for hooks to read
echo "$pct" > /tmp/claude_context_pct

# Format cost
if command -v bc &>/dev/null && [ "$(echo "$cost > 0" | bc -l 2>/dev/null)" = "1" ]; then
  cost_fmt=$(printf '$%.2f' "$cost")
else
  cost_fmt=""
fi

# Output for status line display
if [ -n "$cost_fmt" ]; then
  echo "ctx:${pct}% | ${cost_fmt}"
else
  echo "ctx:${pct}%"
fi
```

Make it executable: `chmod +x .claude/scripts/statusline-context.sh`

### 3f. Project Hooks Configuration

Create or update `.claude/settings.json` with hooks configuration. MERGE with existing settings if the file exists — do not overwrite existing permissions or other config.

Add this hooks configuration:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/scripts/check-types.sh"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/scripts/check-context.sh"
          }
        ]
      }
    ]
  }
}
```

### 3g. Update .gitignore

Add these lines to `.gitignore` if not already present:

```
# Claude Code workflow files
.claude/plans/
.claude/handoffs/
.claude/ds-config.json
```

Do NOT gitignore `.claude/scripts/` or `.claude/settings.json` — these should be committed so the team shares the same workflow.

## Phase 4: Status Line Setup

Tell the user:

> "To enable automatic context tracking, run this command once:"
> ```
> claude /statusline ~/.claude/scripts/statusline-context.sh
> ```
> "This shows context usage in your status bar and enables automatic handoff warnings."

## Phase 5: Summary

Show the user what was created/modified:

```
CLAUDE.md — {created/updated} with project conventions and type safety rules
.claude/plans/ — PRD storage directory
.claude/handoffs/ — Session handoff storage directory
.claude/scripts/check-types.sh — Type safety enforcement hook
.claude/scripts/check-context.sh — Context usage warning hook
.claude/scripts/statusline-context.sh — Status line context tracker
.claude/settings.json — Hook configuration
.gitignore — Updated

Available skills:
  /start-prd          Start a new feature with an interview-driven PRD
  /start-work {name}  Begin or resume work on a feature
  /auto-work {name}   Autonomous iteration — unattended implementation
  /handoff            Save progress for session continuity
  /start-review       Run quality gates + review diff (read-only)
  /start-pr [msg]     Commit, run hooks, create PR (no code changes)
  /start-brief [prd]  Create a polished feature brief for stakeholders

Quality gates saved to: .claude/ds-config.json
Type safety: Enforced via hooks + CLAUDE.md rules (escape hatch: // type-ok)
Context tracking: {enabled if statusline set up, otherwise manual}
```
