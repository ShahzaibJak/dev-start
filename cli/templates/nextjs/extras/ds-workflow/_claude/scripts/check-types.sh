#!/usr/bin/env bash

set -euo pipefail

if ! command -v rg >/dev/null 2>&1; then
  exit 0
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PATTERN='(@ts-ignore|@ts-expect-error|@ts-nocheck|oxlint-disable|eslint-disable|[:<,\s]any\s*[;,>)=\]|}]|[:<,\s]any\s*$|[:<,\s]any\[)'

if rg -n --glob '!node_modules' --glob '!**/*.md' --glob '!**/*.json' "$PATTERN" "$ROOT_DIR" | rg -v 'type-ok' >/dev/null 2>&1; then
  echo "Type-safety hook found blocked patterns. Add // type-ok only for an intentional exception."
  exit 1
fi
