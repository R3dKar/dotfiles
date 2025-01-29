#!/usr/bin/env bash

artist=""
title=""
playing="false"
paused="false"

function escape_string {
  awk '{ $1=$1; print }' <<< "$1" | tr -d '\n' | jq -Rsa .
}

function print_data {
  printf '{ "artist": %s, "title": %s, "playing": %s, "paused": %s }\n' "$(escape_string "$artist")" "$(escape_string "$title")" "$playing" "$paused"
}

{ playerctl -F status & playerctl -F metadata; } | while read -r line; do
  case $line in
    Playing)
      playing="true"
      paused="false"
      print_data
    ;;
    Paused)
      playing="true"
      paused="true"
      print_data
    ;;
    Stopped)
      playing="false"
      paused="false"
      print_data
    ;;
    *)
      if [[ $line =~ [^[:space:]]:artist ]] ; then
        artist=$(awk '{ $1=$2=""; print $0 }' <<< "$line")
        print_data
      elif [[ $line =~ [^[:space:]]:title ]] ; then
        title=$(awk '{ $1=$2=""; print $0 }' <<< "$line")
        print_data
      fi
    ;;
  esac
done
