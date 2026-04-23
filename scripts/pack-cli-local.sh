#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLI_DIR="$ROOT_DIR/cli"
TMP_ROOT="$ROOT_DIR/.tmp/pack-cli-local"
NPM_CACHE_DIR="$TMP_ROOT/npm-cache"
NPM_TMP_DIR="$TMP_ROOT/npm-tmp"
NODE_REAL_PATH="$(node -e "process.stdout.write(process.execPath)")"
NODE_BIN_DIR="$(dirname "$NODE_REAL_PATH")"
NODE_PREFIX_DIR="$(dirname "$NODE_BIN_DIR")"
NPM_CLI_PATH="$NODE_PREFIX_DIR/lib/node_modules/npm/bin/npm-cli.js"
INSTALL_GLOBAL=true

usage() {
  cat <<'EOF'
Usage: bash scripts/pack-cli-local.sh [--pack-only]

Builds the CLI, creates an npm tarball from cli/, and installs it globally by default.

Options:
  --pack-only   Build and pack the CLI, but skip the global npm install step
EOF
}

for arg in "$@"; do
  case "$arg" in
    --pack-only)
      INSTALL_GLOBAL=false
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      usage >&2
      exit 1
      ;;
  esac
done

echo "Building CLI"
(
  cd "$ROOT_DIR"
  bun run build
)

mkdir -p "$NPM_CACHE_DIR" "$NPM_TMP_DIR"

if [[ ! -f "$NPM_CLI_PATH" ]]; then
  echo "Unable to locate npm-cli.js at $NPM_CLI_PATH" >&2
  exit 1
fi

echo "Packing CLI tarball"
TARBALL_NAME="$(
  cd "$CLI_DIR"
  TMPDIR="$NPM_TMP_DIR" npm_config_cache="$NPM_CACHE_DIR" \
    node "$NPM_CLI_PATH" pack .
)"
TARBALL_PATH="$CLI_DIR/$TARBALL_NAME"

echo "Created $TARBALL_PATH"

if [[ "$INSTALL_GLOBAL" == "true" ]]; then
  echo "Installing tarball globally"
  TMPDIR="$NPM_TMP_DIR" npm_config_cache="$NPM_CACHE_DIR" \
    node "$NPM_CLI_PATH" install -g "$TARBALL_PATH" --force
  echo "Installed devstart globally from $TARBALL_PATH"
else
  echo "Skipped global install"
fi
