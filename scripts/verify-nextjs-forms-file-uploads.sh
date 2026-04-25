#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-forms-file-uploads-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-forms-file-uploads"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_forms_file_uploads_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating forms + file-uploads overlay output for $expected_name"
  # Core forms files
  test -f "$app_dir/lib/forms/types.ts"
  test -f "$app_dir/lib/forms/validation.ts"
  test -f "$app_dir/components/forms/form-renderer.tsx"
  test -f "$app_dir/components/forms/fields/index.ts"
  # File field should be present
  test -f "$app_dir/components/forms/fields/file-field.tsx"
  # File uploads extra files
  test -f "$app_dir/components/file-upload.tsx"
  test -f "$app_dir/lib/storage.ts"
  # FieldType should include "file"
  grep -q '"file"' "$app_dir/lib/forms/types.ts"
  # Component map should include file
  grep -q 'file: FileField' "$app_dir/components/forms/fields/index.ts"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"react-hook-form"' "$app_dir/package.json"
  grep -q '"@aws-sdk/client-s3"' "$app_dir/package.json"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding forms + file-uploads app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- init "$SOURCE_APP" --forms --file-uploads -y --no-install --no-git
)

assert_forms_file_uploads_shape "$SOURCE_APP" "source-app"

echo "Scaffolding forms + file-uploads app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js init "$BUILT_APP" --forms --file-uploads --no-install --no-git
)

assert_forms_file_uploads_shape "$BUILT_APP" "built-app"

echo "Installing generated forms + file-uploads app dependencies"
(
  cd "$BUILT_APP"
  cp .env.schema .env
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated forms + file-uploads app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "nextjs/base + forms + file-uploads verification passed"
