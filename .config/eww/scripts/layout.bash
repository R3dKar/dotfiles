#!/usr/bin/env bash

hyprctl devices -j | jq ".keyboards[] | select(.main) | .active_keymap" | tr -d \"

socat -u UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock - |
  stdbuf -o0 awk -F '>>|,' -e '/^activelayout>>/ {print $3}'
