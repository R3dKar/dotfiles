#!/usr/bin/env bash
set -euo pipefail

hyprctl -j devices | jq -r '.keyboards[] | select(.main) | .active_keymap'

socat -u "UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - |
  stdbuf -o0 awk -F '>>|,' '/^activelayout>>/ { print $3 }'
