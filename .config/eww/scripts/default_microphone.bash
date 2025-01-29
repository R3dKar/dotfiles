#!/usr/bin/env bash

function get_microphone_data {
  wpctl get-volume @DEFAULT_AUDIO_SOURCE@ | awk '{ print "{ \"volume\": "$2", \"muted\": "($3 == "[MUTED]" ? "true" : "false")" }" }'
}

get_microphone_data
pactl subscribe | grep --line-buffered source | while read -r line; do
  get_microphone_data
done
