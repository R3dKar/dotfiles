#!/usr/bin/env bash

targetWorkspace=$(python -c "print(max(1, min(10, $1 + (1 if '$2' == 'up' else -1))))")

hyprctl dispatch workspace $targetWorkspace
