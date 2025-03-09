# Hyprland Nordic dotfiles (WIP)

![Screenshot](/screenshots/screenshot.jpg)

Hugely inspired by https://www.reddit.com/r/unixporn/comments/1iwahge/dwm_remade_my_configuration/#lightbox

# Installation

`zsh` and `yay` should be preinstalled. `eww` is not included in installation script as I manually built it with wayland support. Also you should enable multilib in `/etc/pacman.conf` and [nvidia DRM kernel mode setting](https://wiki.hyprland.org/Nvidia). After installation you should set `WEATHER_API_KEY` at `.config/eww/scripts/.env` and also you probably want to tweak `.config/hypr/monitors.conf`, `.config/hypr/rules.conf` and `.config/hypr/environment.conf` (`AQ_DRM_DEVICES` setting).

```bash
git clone https://github.com/R3dKar/dotfiles.git
./dotfiles/install.sh
```
