#!/usr/bin/env bash

function get_speaker_data {
  wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk '{ print "{ \"volume\": "$2", \"muted\": "($3 == "[MUTED]" ? "true" : "false")" }" }'
}

get_speaker_data
pactl subscribe | grep --line-buffered sink | while read -r line; do
  get_speaker_data
done
