# Hyprland dotfiles (WIP)

![Screenshot](/screenshots/screenshot.png)

# Installation

`zsh`, `oh-my-zsh` and `yay` should be preinstalled. `eww` is not included below as I manually built it with wayland support. Also you should enable multilib in `/etc/pacman.conf` and [nvidia DRM kernel mode setting](https://wiki.hyprland.org/Nvidia). After installation you should set `WEATHER_API_KEY` at `.config/eww/scripts/.env` and also you probably want to tweak `.config/hypr/monitors.conf`, `.config/hypr/rules.conf` and `.config/hypr/nvidia.conf` (`AQ_DRM_DEVICES` setting).

```bash
# Dependencies
yay -S hyprland cpio noto-fonts noto-fonts-emoji noto-fonts-cjk ttf-nerd-fonts-symbols \
ttf-nerd-fonts-symbols-mono ttf-meslo-nerd zsh-theme-powerlevel10k-git \
alacritty-sixel-git libsixel imagemagick btop stow nvidia-dkms libva-nvidia-driver \
lib32-nvidia-utils  pipewire python-requests python-dotenv python-aioconsole \
pacman-contrib pipewire-audio pipewire-pulse wireplumber xdg-desktop-portal-hyprland \
hyprpolkitagent qt5-wayland qt6-wayland socat rightnessctl hyprpaper slurp grim \
cliphist playerctl xdg-user-dirs arc-icon-theme arc-solid-gtk-theme nwg-look \
rofi-wayland rofi-calc yandex-browser code fastfetch cava

# Stowing
chmod +x dotfiles/.config/eww/scripts/*.py dotfiles/.config/eww/scripts/*.sh
stow -Rvt ~ dotfiles

# XDG user dirs
rm ~/.config/user-dirs.dirs
cp dotfiles/.config/user-dirs.dirs ~/.config/
xdg-user-dirs-update

# Hyprland plugins (2 of them doesn't work after hyprland update, another one is useless without broken one)
# hyprpm update
# hyprpm add https://github.com/virtcode/hypr-dynamic-cursors
# hyprpm enable dynamic-cursors
# hyprpm add https://github.com/zakk4223/hyprWorkspaceLayouts
# hyprpm enable hyprWorkspaceLayouts
# hyprpm add https://github.com/zakk4223/hyprNStack
# hyprpm enable hyprNStack
# hyprpm update

# OMZ plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autocomplete.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autocomplete
```
