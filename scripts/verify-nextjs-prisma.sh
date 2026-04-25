#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-prisma-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
DEV_LOG="$TMP_DIR/dev.log"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-prisma"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_overlay_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating Prisma overlay output for $expected_name"
  test -f "$app_dir/.env.schema"
  test ! -f "$app_dir/_env.schema"
  test -f "$app_dir/prisma/schema.prisma"
  test -f "$app_dir/prisma.config.ts"
  test -f "$app_dir/lib/prisma.ts"
  test -f "$app_dir/.oxlintrc.json"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"db:generate"' "$app_dir/package.json"
  grep -q '"db:migrate"' "$app_dir/package.json"
  grep -q '"db:studio"' "$app_dir/package.json"
  grep -q '@prisma/client' "$app_dir/package.json"
  grep -q '@prisma/adapter-pg' "$app_dir/package.json"
  grep -q '"prisma"' "$app_dir/package.json"
  grep -q 'DATABASE_URL=postgresql://' "$app_dir/.env.schema"
  grep -q 'provider = "postgresql"' "$app_dir/prisma/schema.prisma"
  grep -q 'output   = "../generated/prisma"' "$app_dir/prisma/schema.prisma"
  grep -q 'migrations' "$app_dir/prisma.config.ts"
  grep -q 'datasource' "$app_dir/prisma.config.ts"
  grep -q 'generated/\*\*' "$app_dir/.oxlintrc.json"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding Prisma app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --prisma -y --no-install --no-git
)

assert_overlay_shape "$SOURCE_APP" "source-app"

echo "Scaffolding Prisma app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --prisma --no-install --no-git
)

assert_overlay_shape "$BUILT_APP" "built-app"

echo "Preparing Prisma environment"
(
  cd "$BUILT_APP"
  cp .env.schema .env
)

echo "Installing generated Prisma app dependencies"
(
  cd "$BUILT_APP"
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running Prisma setup contract"
(
  cd "$BUILT_APP"
  bun run db:generate
  test -f generated/prisma/client.ts
)

echo "Running generated Prisma app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "Checking generated Prisma app dev server"
(
  cd "$BUILT_APP"
  status=0
  timeout 20s bun run dev >"$DEV_LOG" 2>&1 || status=$?
  if [[ "$status" -ne 0 && "$status" -ne 124 ]]; then
    cat "$DEV_LOG"
    exit "$status"
  fi
)

echo "nextjs/base + prisma verification passed"
