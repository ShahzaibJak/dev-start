#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-ds-workflow-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-ds-workflow"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_overlay_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating workflow overlay output for $expected_name"
  test -f "$app_dir/CLAUDE.md"
  test -f "$app_dir/.claude/ds-config.json"
  test -f "$app_dir/.claude/settings.json"
  test -f "$app_dir/.claude/shared/workflow.md"
  test -f "$app_dir/.claude/commands/ds-overview.md"
  test -f "$app_dir/.claude/commands/ds-startwork.md"
  test -f "$app_dir/.claude/commands/ds-review.md"
  test -f "$app_dir/.claude/scripts/check-types.sh"
  test -f "$app_dir/.claude/scripts/check-context.sh"
  test -f "$app_dir/.claude/scripts/statusline-context.sh"
  test -x "$app_dir/.claude/scripts/check-types.sh"
  test -x "$app_dir/.claude/scripts/check-context.sh"
  test -x "$app_dir/.claude/scripts/statusline-context.sh"
  test -f "$app_dir/.agents/README.md"
  test -f "$app_dir/.agents/workflows/ds-overview.md"
  test -f "$app_dir/.agents/workflows/ds-startwork.md"
  test -f "$app_dir/.agents/workflows/ds-review.md"
  test -f "$app_dir/.claude/plans/.gitkeep"
  test -f "$app_dir/.claude/handoffs/.gitkeep"
  test ! -d "$app_dir/_claude"
  test ! -d "$app_dir/_agents"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '\.claude/shared/workflow\.md' "$app_dir/.agents/README.md"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding workflow app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- "$SOURCE_APP" --workflow -y --no-install --no-git
)

assert_overlay_shape "$SOURCE_APP" "source-app"

echo "Scaffolding workflow app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js "$BUILT_APP" --workflow -y --no-install --no-git
)

assert_overlay_shape "$BUILT_APP" "built-app"

echo "Installing generated workflow app dependencies"
(
  cd "$BUILT_APP"
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated workflow app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "nextjs/base + ds-workflow verification passed"
