#!/usr/bin/env bash
set -euo pipefail

name=""
playing="false"
paused="false"

function escapeString {
  awk '{ $1=$1; print }' <<< "$1" | tr -d '\n' | jq -Rsa '.'
}

function printData {
  json=$(printf '{ "name": %s, "playing": %s, "paused": %s }\n' "$(escapeString "$name")" "$playing" "$paused")
  jq -cM 'if (.name | length) == 0 then .playing = false else . end' <<< "$json"
}

{ playerctl -F status & playerctl -F --format 'Name {{artist}}$%${{title}}' metadata; } | while read -r line; do
  case "$line" in
    Playing)
      playing="true"
      paused="false"
    ;;
    Paused)
      playing="true"
      paused="true"
    ;;
    Stopped)
      playing="false"
      paused="false"
    ;;
    Name*)
      name=$(awk '{ $1=""; print $0 }' <<< "$line")
      [[ "$name" =~ [[:space:]].+\$%\$.+ ]] && name="${name/\$%\$/ - }" || name="${name/\$%\$/}"
    ;;
    *)
      continue
    ;;
  esac

  printData
done
