#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-email-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-email"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_email_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating email overlay output for $expected_name"
  test -f "$app_dir/.env.schema"
  test ! -f "$app_dir/_env.schema"
  test -f "$app_dir/lib/email.ts"
  test -f "$app_dir/emails/welcome.tsx"
  test -f "$app_dir/emails/layout.tsx"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"resend"' "$app_dir/package.json"
  grep -q '"@react-email/components"' "$app_dir/package.json"
  grep -q '"react-email"' "$app_dir/package.json"
  grep -q '"email:dev"' "$app_dir/package.json"
  grep -q 'RESEND_API_KEY=' "$app_dir/.env.schema"
  grep -q 'EMAIL_FROM=' "$app_dir/.env.schema"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding email app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --email -y --no-install --no-git
)

assert_email_shape "$SOURCE_APP" "source-app"

echo "Scaffolding email app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --email --no-install --no-git
)

assert_email_shape "$BUILT_APP" "built-app"

echo "Installing generated email app dependencies"
(
  cd "$BUILT_APP"
  cp .env.schema .env
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated email app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "nextjs/base + email verification passed"
