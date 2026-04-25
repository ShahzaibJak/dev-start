#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-stripe-clerk-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-stripe-clerk"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_stripe_clerk_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating Stripe + Clerk overlay output for $expected_name"
  test -f "$app_dir/.env.schema"
  test ! -f "$app_dir/_env.schema"
  test -f "$app_dir/lib/billing.ts"
  test -f "$app_dir/app/billing/page.tsx"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"stripe"' "$app_dir/package.json"
  grep -q 'PricingTable' "$app_dir/app/billing/page.tsx"
  grep -q 'hasPlan' "$app_dir/lib/billing.ts"
  grep -q 'hasFeature' "$app_dir/lib/billing.ts"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding Stripe + Clerk app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --clerk --stripe -y --no-install --no-git
)

assert_stripe_clerk_shape "$SOURCE_APP" "source-app"

echo "Scaffolding Stripe + Clerk app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --clerk --stripe --no-install --no-git
)

assert_stripe_clerk_shape "$BUILT_APP" "built-app"

echo "Preparing Stripe + Clerk environment"
(
  cd "$BUILT_APP"
  cp .env.schema .env
)

echo "Installing generated Stripe + Clerk app dependencies"
(
  cd "$BUILT_APP"
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated Stripe + Clerk app quality gates"
(
  cd "$BUILT_APP"
  # Clerk's ClerkProvider validates publishable key format at build/SSR time,
  # so `next build` requires real Clerk keys. Typecheck and lint are sufficient
  # to verify template correctness without valid API keys.
  #
  # next-ts-api types are normally generated during `next build`. Since we skip
  # build, create a stub types file so typecheck can resolve the import.
  mkdir -p types
  echo 'export type ApiRoutes = Record<string, never>' > types/next-ts-api.ts
  bun run lint
  bun run typecheck
)

echo "nextjs/base + clerk + stripe verification passed"
