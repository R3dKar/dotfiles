#!/usr/bin/env bash
set -euo pipefail

slurp | grim -g - - | wl-copy
