function colorize {
  for cmd in $@; do
    alias $cmd="$cmd --color=auto"
  done
}

colorize ls grep ip

alias l="ls -l"
alias ll="ls -la"

alias ipa="ip a"
alias ipr="ip r"

alias neofetch="fastfetch"
