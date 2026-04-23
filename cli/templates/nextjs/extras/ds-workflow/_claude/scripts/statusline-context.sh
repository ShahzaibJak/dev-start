#!/usr/bin/env bash

set -euo pipefail

PERCENT="${CLAUDE_CONTEXT_WINDOW_PERCENT:-0}"
printf '%s\n' "$PERCENT"
