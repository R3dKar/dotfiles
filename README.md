# Hyprland dotfiles

![Screenshot](/screenshots/screenshot.png)

# Installation

```bash
# Dependencies
yay -S zsh hyprland cpio noto-fonts noto-fonts-emoji ttf-nerd-fonts-symbols \
ttf-nerd-fonts-symbols-mono ttf-meslo-nerd zsh-theme-powerlevel10k-git \
alacritty-sixel-git libsixel imagemagick btop stow nvidia-dkms libva-nvidia-driver \
aylurs-gtk-shell-git libastal-io-git libastal-git pipewire pipewire-audio \
pipewire-pulse wireplumber xdg-desktop-portal-hyprland \
hyprpolkitagent qt5-wayland qt6-wayland brightnessctl swww slurp grim \
cliphist playerctl calc yandex-browser code fastfetch cava

# Initialization
stow -Rvt ~ dotfiles
hyprpm update
hyprpm add https://github.com/virtcode/hypr-dynamic-cursors
hyprpm enable dynamic-cursors
```
