# Installation

```bash
# Dependencies
yay -S zsh hyprland ttf-meslo-nerd ttf-terminus-nerd zsh-theme-powerlevel10k-git alacritty btop stow nvidia-dkms libva-nvidia-driver aylurs-gtk-shell-git libastal-io-git libastal-git yandex-browser pipewire pipewire-audio pipewire-pulse bluez bluez-utils wireplumber xdg-desktop-portal-hyprland brightnessctl upower

# Initialization
stow -Rvt ~ dotfiles
sudo systemctl enable --now bluetooth
sudo systemctl enable --now upower

# not actually sure about it. It will be tested later
# systemctl enable --user --now pipewire
```
