#!/usr/bin/env bash
set -euo pipefail

hyprctl -j monitors | jq '.[] | select(.focused) | .activeWorkspace.id'

socat -u "UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - |
  stdbuf -o0 awk -F '>>|,' '/^workspace>>/ { print $2 } /^focusedmon>>/ { print $3 }'
