#!/usr/bin/env bash
set -euo pipefail

function getWorkspacesData {
  workspaceWindows=$(hyprctl -j workspaces | jq 'map({key: .id | tostring, value: .windows}) | from_entries')
  seq 1 10 | jq --argjson windows "$workspaceWindows" --slurp -Mc 'map(tostring) | map({id: ., windows: ($windows[.]//0)})'
}

getWorkspacesData
socat -u "UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do
  getWorkspacesData
done
