---
type: Concept
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-10-08T16:25:00Z }
tags:
  - linux
  - terminal
  - keyboard
  - tmux
  - kitty
  - hterm
  - ssh
sources:
  - resource: https://hterm.org/x/docs/keyboard-bindings
    title: "hterm and Secure Shell - hterm Keyboard Bindings"
  - resource: https://sw.kovidgoyal.net/kitty/conf/#shortcut-Map-a-key-combination
    title: "Kitty Terminal Keyboard Shortcuts"
  - resource: https://github.com/tmux/tmux/wiki/Modifier-Keys
    title: "tmux Modifier Keys and Extended Keys"
updated: "2026-10-08"
---

# Linux and Terminal Keyboard Bindings

Keyboard shortcuts on Linux pass through multiple translation layers—from hardware scancodes and XKB/Wayland compositors, to terminal emulators (such as Kitty or Chrome's `hterm` / Secure Shell), down to terminal multiplexers (`tmux`) and TUI applications.

## Terminal Escape Sequences and Non-ASCII Key Combinations

Traditional Unix terminals communicate keystrokes over a pseudo-terminal (PTY) byte stream using ASCII and C0 control characters (`0x00`–`0x1F`). Because legacy control characters collapse several distinct physical keys into the same byte—for example, `Tab` and `Ctrl+I` both produce `0x09` (`\t`), while `Enter` and `Ctrl+M` both produce `0x0D` (`\r`)—combinations like `Ctrl+Tab` or `Ctrl+Shift+Tab` have no standard ASCII control code.

To disambiguate modified keys without breaking legacy PTY compatibility, modern terminal emulators emit Control Sequence Introducer (CSI) sequences (such as xterm's `modifyOtherKeys` or the Kitty keyboard protocol):

- `Ctrl+Tab`: `\x1b[1;5I` (or `\x1b[27;5;9~`)
- `Ctrl+Backspace`: `\x17` (`^W`, word erase) or `\x08` (`^H`)

## Terminal Emulator Configuration

### Kitty

In `kitty.conf`, arbitrary byte sequences can be emitted for any shortcut using `send_text`:

```ini
map ctrl+tab send_text all \x1b[1;5I
map ctrl+backspace send_text all \x17
```

### Chrome Secure Shell (`nassh` / `hterm`)

Chrome's Secure Shell extension (`iodihamcpbpeioajjeobimgagajmlibd`) uses the `hterm` JavaScript terminal emulator.

#### Why `Ctrl+Tab` Fails by Default in `hterm`

In `hterm`'s built-in keymap (`hterm_keyboard_keymap.js`), pressing `Tab` (`keyCode 9`) with `Ctrl` invokes `onCtrlTab_`:

- When the `pass-ctrl-tab` preference (*"Ctrl+Tab switch tab behavior"*) is `true`, `hterm` returns `PASS`, letting Chrome switch browser tabs.
- When `pass-ctrl-tab` is `false` (the default), `hterm` returns `STRIP`, which strips the `Ctrl` modifier and sends a plain `\t` (`0x09`) to the remote host.

As a result, remote applications like `tmux` only receive a standard `Tab` character unless overridden via `hterm`'s custom `keybindings` preference.

#### Overriding Keybindings in `nassh_preferences_editor.html`

In Secure Shell's Options (`chrome-extension://iodihamcpbpeioajjeobimgagajmlibd/html/nassh_preferences_editor.html`) under **Terminal Settings → Keyboard → Keyboard bindings/shortcuts** (`keybindings`), map `Ctrl+Tab` to emit `\x1b[1;5I`:

```json
{
  "Ctrl+Tab": "'\u001b[1;5I'"
}
```

Two details are essential when configuring `hterm` `keybindings`:

- **Double-stage string parsing**: `hterm` first parses the preference as JSON (which decodes `\u001b` into the literal `ESC` byte `0x1b`), and then passes the resulting string value (`'‹ESC›[1;5I'`) to `hterm.Parser.parseKeyAction()`. String actions in `hterm` must be enclosed in nested single or double quotes (`'...'` emits the enclosed characters literally).
- **Dedicated Window vs. Browser Tab**: Chrome blocks web and extension pages from intercepting browser-level tab shortcuts (`Ctrl+Tab`, `Ctrl+W`, `Ctrl+T`, `Ctrl+N`) when running inside a standard browser tab ([crbug.com/671774](https://crbug.com/671774)). Secure Shell must run in a dedicated standalone window (its default mode when launched from the extension popup, or via `?openas=window`) for `hterm` to receive `Ctrl+Tab`.

## TMUX Key Bindings and `display-popup` Traps

### Custom Escape Sequences via `user-keys`

When a terminal emulator emits a raw CSI sequence like `\e[1;5I` for `Ctrl+Tab`, `tmux` can register that sequence as a custom `User0` key and bind it directly in `~/.tmux.conf`:

```tmux
set -s user-keys[0] "\e[1;5I"
bind-key -n User0 display-popup -E -w 95% -h 40% "tmux-window-popup.sh"
```

### Popup Disappearing Immediately (`PATH` Trap in `display-popup -E`)

A common trap when binding a key to `tmux display-popup -E "<command>"` is that the popup frame flashes briefly and immediately closes.

- **Root Cause**: The `-E` flag instructs `tmux` to close the popup automatically as soon as the command exits (regardless of exit code). Unlike interactive panes—which launch `default-command` (such as `fish`) and source interactive shell configurations—`tmux` executes `display-popup` and `run-shell` commands via non-interactive `/bin/sh` using the `tmux` server's global `PATH`. If a tool used by the popup script (such as `fzf` installed in `~/.fzf/bin` or via [Nix Package Manager](../programming/nix/nix.md) in `~/.nix-profile/bin`) is only added to `PATH` in interactive shell startup files (`~/.bashrc` or Fish's `conf.d/`), the command fails with `command not found` in milliseconds and `display-popup -E` immediately closes the popup.
- **Resolution**: Ensure both `~/.tmux.conf` (`tmux set-environment -g PATH ...`) and the popup script itself explicitly prepend user binary directories (`$HOME/.nix-profile/bin`, `$HOME/.fzf/bin`, `$HOME/.local/bin`) to `PATH`.
