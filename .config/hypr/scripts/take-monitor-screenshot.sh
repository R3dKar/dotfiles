#!/usr/bin/env bash
set -euo pipefail

area=$(hyprctl -j monitors | jq -r '.[] | select(.focused) | "\(.x),\(.y) \(if .transform % 2 == 0 then .width else .height end)x\(if .transform % 2 == 0 then .height else .width end)"')
grim -g "$area" - | wl-copy
