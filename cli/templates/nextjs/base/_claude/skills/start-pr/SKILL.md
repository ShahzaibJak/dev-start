---
name: start-pr
description: "Commit changes and create a PR. Handles staging, conventional commit messages, pre-commit hooks, and gh CLI PR creation. Does not modify code files."
---

# Start PR

You are committing changes and creating a PR. Do NOT modify any code files — only git and gh operations.

## Step 1: Check State

1. Run `git status` — identify staged and unstaged changes
2. If there are no changes at all, tell the user: "Nothing to commit." and stop.
3. If there are unstaged changes but nothing staged, stage all changes (`git add` the relevant files — skip `.env*`, credentials, secrets)
4. Run `git diff --cached --stat` to see what will be committed

## Step 2: Commit Message

The user's message is: $ARGUMENTS

**If a message was provided:**
- Use it as the commit message body
- Format it as a conventional commit if it isn't already (e.g., `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`)

**If no message was provided:**
- Run `git diff --cached` to read the staged changes
- Generate a minimal conventional commit message:
  - Prefix: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:` based on the nature of changes
  - Body: one concise line describing WHAT changed (not HOW)
  - Example: `feat: add user profile avatar upload`
  - Keep it under 72 characters

## Step 3: Commit

Run the commit:

```bash
git commit -m "$(cat <<'EOF'
{commit message}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

### If pre-commit hooks FAIL:
- Show the user the full error output
- Tell them what failed and what needs fixing
- Do NOT attempt to fix anything — stop here
- Tell the user: "Pre-commit hooks failed. Fix the issues above and run `/start-pr` again."

### If commit succeeds:
- Continue to Step 4

## Step 4: Create PR

First, check if `gh` CLI is available and authenticated:

```bash
gh auth status
```

**If `gh` is NOT available or not authenticated:**
- Tell the user: "Commit created successfully. `gh` CLI not configured — push and create PR manually."
- Show them the commit hash and message
- Stop here

**If `gh` IS available:**

1. Check if we're on a feature branch (not `main`/`master`):
   - If on `main`/`master`, tell the user: "You're on the main branch. Create a feature branch first." and stop.

2. Push the branch:
   ```bash
   git push -u origin HEAD
   ```

3. Check if a PR already exists for this branch:
   ```bash
   gh pr view --json number,url 2>/dev/null
   ```
   - If PR exists, tell the user: "Changes pushed. PR already exists: {url}" and stop.

4. Generate PR title and body from the branch's full diff against base:
   ```bash
   git log main..HEAD --oneline
   git diff main...HEAD --stat
   ```

   - **Title**: Short, under 70 characters, based on the overall change
   - **Body**: Use this format:

   ```markdown
   ## Summary
   - {bullet point 1}
   - {bullet point 2}

   ## Test plan
   - [ ] {how to verify this change}

   Generated with [Claude Code](https://claude.com/claude-code)
   ```

5. Create the PR:
   ```bash
   gh pr create --title "{title}" --body "$(cat <<'EOF'
   {body}
   EOF
   )"
   ```

6. Show the user the PR URL.

## Rules
- Do NOT modify any code files
- Do NOT fix pre-commit hook failures
- Do NOT amend previous commits — always create new ones
- Do NOT force push
- Do NOT commit `.env*`, credentials, or secret files — warn if they're staged
