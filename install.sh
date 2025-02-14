#!/usr/bin/env bash

# Dependencies
yay -S --needed hyprland uwsm noto-fonts noto-fonts-emoji noto-fonts-cjk
ttf-nerd-fonts-symbols ttf-nerd-fonts-symbols-mono ttf-jetbrains-mono ttf-jetbrains-mono-nerd \
kitty zsh-theme-powerlevel10k-git btop stow nvidia-dkms libva-nvidia-driver \
lib32-nvidia-utils pipewire python-requests python-dotenv python-aioconsole \
pacman-contrib pipewire-audio pipewire-pulse wireplumber xdg-desktop-portal-hyprland \
hyprpolkitagent qt5-wayland qt6-wayland socat hyprpaper hyprpicker slurp grim \
cliphist playerctl xdg-user-dirs arc-icon-theme arc-solid-gtk-theme nwg-look \
bibata-cursor-theme-bin rofi-wayland rofi-calc yandex-browser code fastfetch cava

# Stowing
chmod u+x dotfiles/.config/eww/scripts/*.py
chmod u+x dotfiles/.config/eww/scripts/*.sh
chmod u+x dotfiles/.config/hypr/scripts/*.sh
stow -Rvt ~ dotfiles

# XDG user dirs
rm ~/.config/user-dirs.dirs
cp dotfiles/.config/user-dirs.dirs ~/.config/
xdg-user-dirs-update

# OMZ plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
