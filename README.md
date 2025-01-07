# Installation

```bash
# Dependencies
yay -S zsh hyprland ttf-meslo-nerd ttf-terminus-nerd zsh-theme-powerlevel10k-git alacritty btop stow nvidia-dkms libva-nvidia-driver aylurs-gtk-shell-git libastal-io-git libastal-git yandex-browser pipewire pipewire-audio wireplumber xdg-desktop-portal-hyprland brightnessctl

# Initialization
stow -Rvt ~ dotfiles
```

You also should check [nvidia dirver installation page](https://wiki.hyprland.org/Nvidia/) and change `AQ_DRM_DEVICES` in `.config/hypr/nvidia.conf` to an appropriate one.
