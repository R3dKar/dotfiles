#!/usr/bin/env bash
set -euo pipefail

area=$(hyprctl -j activewindow | jq -r '"\(.at[0]),\(.at[1]) \(.size[0])x\(.size[1])"')
grim -g "$area" - | wl-copy
