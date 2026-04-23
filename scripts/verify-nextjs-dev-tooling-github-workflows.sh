#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-dev-tooling-github-workflows-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
DEV_LOG="$TMP_DIR/dev.log"
WORKFLOW_RELATIVE_PATH=".github/workflows/ci.yml"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-dev-tooling-github-workflows"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_overlay_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating dev-tooling + GitHub workflows output for $expected_name"
  test -d "$app_dir/.husky"
  test -f "$app_dir/.husky/pre-commit"
  test -x "$app_dir/.husky/pre-commit"
  test -f "$app_dir/$WORKFLOW_RELATIVE_PATH"
  test ! -d "$app_dir/_husky"
  test ! -d "$app_dir/_github"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"prepare": "husky"' "$app_dir/package.json"
  grep -q '"precommit": "lint-staged"' "$app_dir/package.json"
  grep -q '"lint-staged"' "$app_dir/package.json"
  grep -q '"husky"' "$app_dir/package.json"
  grep -q 'bun install' "$app_dir/$WORKFLOW_RELATIVE_PATH"
  grep -q 'bun run lint' "$app_dir/$WORKFLOW_RELATIVE_PATH"
  grep -q 'bun run typecheck' "$app_dir/$WORKFLOW_RELATIVE_PATH"
  grep -q 'bun run build' "$app_dir/$WORKFLOW_RELATIVE_PATH"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding dev-tooling + GitHub workflows app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- "$SOURCE_APP" --base --dev-tooling --github-workflows -y --no-install --no-git
)

assert_overlay_shape "$SOURCE_APP" "source-app"

echo "Scaffolding dev-tooling + GitHub workflows app from built output with git initialized"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js "$BUILT_APP" --base --dev-tooling --github-workflows --no-install
)

assert_overlay_shape "$BUILT_APP" "built-app"

echo "Installing generated dev-tooling + GitHub workflows app dependencies"
(
  cd "$BUILT_APP"
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Checking Husky install contract"
(
  cd "$BUILT_APP"
  test -d .git
  test -f .husky/_/h
  test "$(git config --get core.hooksPath)" = ".husky/_"
  bun run precommit
)

echo "Running generated dev-tooling + GitHub workflows app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "Checking generated dev-tooling + GitHub workflows app dev server"
(
  cd "$BUILT_APP"
  status=0
  timeout 20s bun run dev >"$DEV_LOG" 2>&1 || status=$?
  if [[ "$status" -ne 0 && "$status" -ne 124 ]]; then
    cat "$DEV_LOG"
    exit "$status"
  fi
)

echo "nextjs/base + dev-tooling + github-workflows verification passed"
