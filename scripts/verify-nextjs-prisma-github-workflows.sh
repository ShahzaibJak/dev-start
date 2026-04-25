#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-prisma-github-workflows-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
DEV_LOG="$TMP_DIR/dev.log"
WORKFLOW_RELATIVE_PATH=".github/workflows/ci.yml"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-prisma-github-workflows"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_overlay_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating Prisma + GitHub workflows output for $expected_name"
  test -f "$app_dir/.env.schema"
  test ! -f "$app_dir/_env.schema"
  test -f "$app_dir/prisma/schema.prisma"
  test -f "$app_dir/prisma.config.ts"
  test -f "$app_dir/lib/prisma.ts"
  test -f "$app_dir/$WORKFLOW_RELATIVE_PATH"
  test ! -d "$app_dir/_github"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"db:generate"' "$app_dir/package.json"
  grep -q '"db:migrate"' "$app_dir/package.json"
  grep -q '"db:studio"' "$app_dir/package.json"
  grep -q '@prisma/client' "$app_dir/package.json"
  grep -q '@prisma/adapter-pg' "$app_dir/package.json"
  grep -q '"prisma"' "$app_dir/package.json"
  grep -q 'DATABASE_URL=postgresql://' "$app_dir/.env.schema"
  grep -q 'provider = "postgresql"' "$app_dir/prisma/schema.prisma"
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

echo "Scaffolding Prisma + GitHub workflows app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --prisma --github-workflows -y --no-install --no-git
)

assert_overlay_shape "$SOURCE_APP" "source-app"

echo "Scaffolding Prisma + GitHub workflows app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --prisma --github-workflows --no-install --no-git
)

assert_overlay_shape "$BUILT_APP" "built-app"

echo "Preparing Prisma environment"
(
  cd "$BUILT_APP"
  cp .env.schema .env
)

echo "Installing generated Prisma + GitHub workflows app dependencies"
(
  cd "$BUILT_APP"
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running Prisma + GitHub workflows generated-app setup contract"
(
  cd "$BUILT_APP"
  bun run db:generate
  test -f generated/prisma/client.ts
)

echo "Running Prisma + GitHub workflows generated-app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "Checking generated Prisma + GitHub workflows app dev server"
(
  cd "$BUILT_APP"
  status=0
  timeout 20s bun run dev >"$DEV_LOG" 2>&1 || status=$?
  if [[ "$status" -ne 0 && "$status" -ne 124 ]]; then
    cat "$DEV_LOG"
    exit "$status"
  fi
)

echo "nextjs/base + prisma + github-workflows verification passed"
