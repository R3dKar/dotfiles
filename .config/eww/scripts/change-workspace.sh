#!/usr/bin/env bash
set -euo pipefail

function clamp {
  local low="$1"
  local high="$2"
  local target="$3"

  python -c "print(max($low,min($high,$target)))"
}

currentWorkspace="$1"
scrollDirection="$2"

[[ "$scrollDirection" = 'up' ]] && indexChange='1' || indexChange='-1'

targetWorkspace=$(clamp 1 10 $(("$currentWorkspace" + "$indexChange")))

hyprctl dispatch workspace "$targetWorkspace"
