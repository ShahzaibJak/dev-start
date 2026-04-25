#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-zustand-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-zustand"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_zustand_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating zustand overlay output for $expected_name"
  test -f "$app_dir/lib/stores/counter.ts"
  test -f "$app_dir/lib/stores/index.ts"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"zustand"' "$app_dir/package.json"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding zustand app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --zustand -y --no-install --no-git
)

assert_zustand_shape "$SOURCE_APP" "source-app"

echo "Scaffolding zustand app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --zustand --no-install --no-git
)

assert_zustand_shape "$BUILT_APP" "built-app"

echo "Installing generated zustand app dependencies"
(
  cd "$BUILT_APP"
  cp .env.schema .env
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated zustand app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "nextjs/base + zustand verification passed"
