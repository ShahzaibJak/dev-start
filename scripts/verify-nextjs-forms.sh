#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-forms-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-forms"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_forms_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating forms overlay output for $expected_name"
  test -f "$app_dir/lib/forms/types.ts"
  test -f "$app_dir/lib/forms/validation.ts"
  test -f "$app_dir/lib/forms/index.ts"
  test -f "$app_dir/components/forms/form-renderer.tsx"
  test -f "$app_dir/components/forms/fields/text-field.tsx"
  test -f "$app_dir/components/forms/fields/select-field.tsx"
  test -f "$app_dir/components/forms/fields/date-field.tsx"
  test -f "$app_dir/components/forms/fields/index.ts"
  test -f "$app_dir/components/forms/layouts/classic-layout.tsx"
  test -f "$app_dir/components/forms/layouts/conversational-layout.tsx"
  test -f "$app_dir/components/forms/layouts/multistep-layout.tsx"
  test -f "$app_dir/components/ui/field.tsx"
  test -f "$app_dir/components/ui/textarea.tsx"
  test -f "$app_dir/components/ui/select.tsx"
  test -f "$app_dir/components/ui/checkbox.tsx"
  test -f "$app_dir/components/ui/radio-group.tsx"
  test -f "$app_dir/components/ui/switch.tsx"
  test -f "$app_dir/components/ui/calendar.tsx"
  test -f "$app_dir/components/ui/popover.tsx"
  test -f "$app_dir/app/(examples)/forms/page.tsx"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"react-hook-form"' "$app_dir/package.json"
  grep -q '"zod"' "$app_dir/package.json"
  # Ensure file field is NOT present without file-uploads
  ! test -f "$app_dir/components/forms/fields/file-field.tsx"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding forms app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --forms -y --no-install --no-git
)

assert_forms_shape "$SOURCE_APP" "source-app"

echo "Scaffolding forms app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --forms --no-install --no-git
)

assert_forms_shape "$BUILT_APP" "built-app"

echo "Installing generated forms app dependencies"
(
  cd "$BUILT_APP"
  cp .env.schema .env
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated forms app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "nextjs/base + forms verification passed"
