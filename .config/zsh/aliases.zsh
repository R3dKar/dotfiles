function colorize {
  for cmd in $@; do
    alias $cmd="$cmd --color=auto"
  done
}

colorize ls grep ip

alias l="ls -l"
alias ll="ls -la"
alias lsi="img2sixel -h 300"

alias ipa="ip a"
alias ipr="ip r"

alias neofetch="fastfetch"

function launch {
  hyprctl dispatch exec "$@"
}
