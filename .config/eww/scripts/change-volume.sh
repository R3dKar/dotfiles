#!/usr/bin/env bash
set -euo pipefail

deviceName="$1"
scrollDirection="$2"

[[ "$scrollDirection" = 'up' ]] && volumeChange='5%+' || volumeChange='5%-'

wpctl set-volume "$deviceName" "$volumeChange"
