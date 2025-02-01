#!/usr/bin/env bash
set -euo pipefail

function getMicrophoneData {
  wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | awk '{ print "{ \"volume\": ", $2, ", \"muted\": ", ($3 == "[MUTED]" ? "true" : "false"), " }" }'
}

getMicrophoneData
pactl subscribe | grep --line-buffered source | while read -r line; do
  getMicrophoneData
done
