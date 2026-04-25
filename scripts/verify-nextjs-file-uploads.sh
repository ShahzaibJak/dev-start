#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/dev-start-nextjs-file-uploads-XXXXXX)"
SOURCE_APP="$TMP_DIR/source-app"
BUILT_APP="$TMP_DIR/built-app"
BUN_TMP_DIR="$ROOT_DIR/.tmp/verify-nextjs-file-uploads"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

assert_file_uploads_shape() {
  local app_dir="$1"
  local expected_name="$2"

  echo "Validating file-uploads overlay output for $expected_name"
  test -f "$app_dir/.env.schema"
  test ! -f "$app_dir/_env.schema"
  test -f "$app_dir/lib/storage.ts"
  test -f "$app_dir/app/api/uploads/presign/route.ts"
  test -f "$app_dir/components/file-upload.tsx"
  grep -q "\"name\": \"$expected_name\"" "$app_dir/package.json"
  grep -q '"@aws-sdk/client-s3"' "$app_dir/package.json"
  grep -q '"@aws-sdk/s3-request-presigner"' "$app_dir/package.json"
  grep -q 'S3_ACCESS_KEY_ID=' "$app_dir/.env.schema"
  grep -q 'S3_SECRET_ACCESS_KEY=' "$app_dir/.env.schema"
  grep -q 'S3_BUCKET=' "$app_dir/.env.schema"
  grep -q 'S3_REGION=' "$app_dir/.env.schema"
}

echo "Building CLI"
(
  cd "$ROOT_DIR"
  mkdir -p "$BUN_TMP_DIR"
  bun run build
)

echo "Scaffolding file-uploads app from source"
(
  cd "$ROOT_DIR"
  bun cli/src/index.ts -- "$SOURCE_APP" --file-uploads -y --no-install --no-git
)

assert_file_uploads_shape "$SOURCE_APP" "source-app"

echo "Scaffolding file-uploads app from built output"
(
  cd "$ROOT_DIR"
  node cli/dist/index.js "$BUILT_APP" --file-uploads --no-install --no-git
)

assert_file_uploads_shape "$BUILT_APP" "built-app"

echo "Installing generated file-uploads app dependencies"
(
  cd "$BUILT_APP"
  cp .env.schema .env
  # Fill required S3 env vars with placeholder values for build validation
  sed -i 's/^S3_ACCESS_KEY_ID=$/S3_ACCESS_KEY_ID=AKIAIOSFODNN7PLACEHOLDER/' .env
  sed -i 's/^S3_SECRET_ACCESS_KEY=$/S3_SECRET_ACCESS_KEY=wJalrXUtnFEMI_K7MDENG_bPxRfiCYPLACEHOLDER/' .env
  sed -i 's/^S3_BUCKET=$/S3_BUCKET=devstart-verify-bucket/' .env
  env TMPDIR="$BUN_TMP_DIR" bun install
)

echo "Running generated file-uploads app quality gates"
(
  cd "$BUILT_APP"
  bun run build
  bun run lint
  bun run typecheck
)

echo "nextjs/base + file-uploads verification passed"
