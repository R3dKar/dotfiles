#!/usr/bin/env bash
set -euo pipefail

function getSpeakerData {
  wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk '{ print "{ \"volume\": ", $2, ", \"muted\": ", ($3 == "[MUTED]" ? "true" : "false"), " }" }'
}

getSpeakerData
pactl subscribe | grep --line-buffered sink | while read -r line; do
  getSpeakerData
done
