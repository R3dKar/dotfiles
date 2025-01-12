# Installation

```bash
# Dependencies
yay -S zsh hyprland noto-fonts noto-fonts-emoji ttf-nerd-fonts-symbols ttf-nerd-fonts-symbols-mono ttf-meslo-nerd ttf-terminus-nerd zsh-theme-powerlevel10k-git alacritty btop stow nvidia-dkms libva-nvidia-driver aylurs-gtk-shell-git libastal-io-git libastal-git yandex-browser pipewire pipewire-audio pipewire-pulse bluez bluez-utils wireplumber xdg-desktop-portal-hyprland brightnessctl

# Initialization
stow -Rvt ~ dotfiles
sudo systemctl enable --now bluetooth

# not actually sure about it. It will be tested later
# systemctl enable --user --now pipewire
```
