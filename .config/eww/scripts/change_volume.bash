#!/usr/bin/env bash

[[ $2 = up ]] && sign="+" || sign="-"

wpctl set-volume $1 5%$sign
