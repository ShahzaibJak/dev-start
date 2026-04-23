#!/usr/bin/env bash

set -euo pipefail

PERCENT="${CLAUDE_CONTEXT_WINDOW_PERCENT:-}"

if [[ -z "$PERCENT" ]]; then
  exit 0
fi

if [[ "$PERCENT" =~ ^[0-9]+$ ]] && (( PERCENT >= 50 )); then
  echo "Context usage is ${PERCENT}%. Consider summarizing state or writing a handoff."
fi
