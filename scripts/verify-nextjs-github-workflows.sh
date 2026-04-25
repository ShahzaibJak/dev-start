#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-github-workflows-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
DEV_LOG="$TMP_DIR/dev.log"
WORKFLOW_RELATIVE_PATH=".github/workflows/ci.yml"
EXPECTED_WORKFLOW_STEPS=(
  "bun install"
  "bun run lint"
  "bun run typecheck"
  "bun run build"
)
DISALLOWED_WORKFLOW_REFERENCES=(
  "cli/dist"
  "scripts/verify-nextjs"
  "--filter"
  "workspace"
)
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-github-workflows"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_workflow_shape() {
  local app_dir="$1"
  local expected_name="$2"
  local workflow_path="$app_dir/$WORKFLOW_RELATIVE_PATH"

  echo "Validating GitHub workflow output for $expected_name"
  test -f "$workflow_path"
  test ! -d "$app_dir/_github"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"

  for expected_step in "${EXPECTED_WORKFLOW_STEPS[@]}"; do
    grep -q "$expected_step" "$workflow_path"
  done

  for package_script in lint typecheck build; do
    grep -q "\"$package_script\"" "$app_dir/package.json"
  done

  for disallowed_reference in "${DISALLOWED_WORKFLOW_REFERENCES[@]}"; do
    if grep -q -- "$disallowed_reference" "$workflow_path"; then
      echo "Workflow unexpectedly references '$disallowed_reference'"
      exit 1
    fi
  done
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding GitHub workflow app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --base --github-workflows -y --no-install --no-git
)

assert_workflow_shape "$SOURCE_APP" "source-app"

echo "Scaffolding GitHub workflow app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --base --github-workflows --no-install --no-git
)

assert_workflow_shape "$BUILT_APP" "built-app"

echo "Installing generated GitHub workflow app dependencies"
(
  cd "$BUILT_APP"
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated GitHub workflow app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "Checking generated GitHub workflow app dev server"
(
  cd "$BUILT_APP"
  status=0
  timeout 20s bun run dev >"$DEV_LOG" 2>&1 || status=$?
  if [[ "$status" -ne 0 && "$status" -ne 124 ]]; then
    cat "$DEV_LOG"
    exit "$status"
  fi
)

echo "nextjs/base + github-workflows verification passed"
