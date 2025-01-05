[[ $(tty) =~ /dev/tty[1-9] ]] ; is_tty=$?

[[ $is_tty = 0 ]] && ZSH_THEME="juanghurtado"

zstyle ":omz:*" aliases no
export ZSH="$HOME/.oh-my-zsh"
source "$ZSH/oh-my-zsh.sh"

if [[ $is_tty = 1 ]]; then
  source "/usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme"
  source "$HOME/.config/zsh/p10k.zsh"
fi
