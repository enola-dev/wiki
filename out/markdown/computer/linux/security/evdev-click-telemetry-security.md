---
type: concept
tags:
  - linux
  - wayland
  - security
  - udev
  - evdev
sources:
  - https://getopenscreen.com/docs/installation/#linux
---

# Evdev Mouse Click Telemetry Security on Wayland

Wayland screen recording tools capturing mouse click telemetry can safely read evdev mouse events without exposing keyboard keyloggers to unprivileged user sessions.

## Problem & Background

Under Wayland, compositors isolate window inputs so unprivileged applications cannot snoop on global desktop events. While the FreeDesktop ScreenCast portal shares screen content and cursor coordinates as frame metadata, it intentionally does not stream mouse button presses or keyboard events.

Applications like [OpenScreen](https://getopenscreen.com/) that animate mouse clicks or render ripple effects bypass this portal limitation by reading left mouse button presses (`BTN_LEFT`) directly from the kernel `evdev` interface (`/dev/input/event*`).

## The Security Risk of the `input` Group

Because `/dev/input/event*` device nodes are owned by `root:input`, application installation guides commonly instruct users to add themselves to the group:

```bash
sudo usermod -aG input $USER
```

This presents a serious privilege leak:

- **Keylogger Vulnerability**: The `input` group applies indiscriminately to all `/dev/input/` nodes—including all physical and virtual keyboards, power buttons, and authentication keys.
- **Ambient Authority**: Once a user account joins `input`, every program executed by that user (web browsers, arbitrary npm/cargo dependencies, untrusted scripts) can open `/dev/input/` in the background and record every keystroke (passwords, encryption keys, and private messages).

## Safe Resolution via Targeted udev `uaccess`

Instead of granting persistent, wide-ranging `input` group membership to the user, access can be restricted strictly to mouse devices using systemd's dynamic device seat ACLs (`uaccess`).

### Declarative udev Rule

In NixOS or udev rules configuration (`/etc/udev/rules.d/70-mouse-uaccess.rules`):

```udev
KERNEL=="event*", SUBSYSTEM=="input", ENV{ID_INPUT_MOUSE}=="1", ENV{ID_INPUT_KEYBOARD}!="1", TAG+="uaccess"
```

### How It Works

1. **Strict Filtering**: The rule checks `ENV{ID_INPUT_MOUSE}=="1"` and explicitly excludes any device acting as a keyboard (`ENV{ID_INPUT_KEYBOARD}!="1"`).
2. **Dynamic ACL Assignment**: When matching, udev attaches `TAG+="uaccess"`. Systemd's `systemd-logind` builtin then grants read/write POSIX ACLs (`setfacl`) on those specific mouse character devices exclusively to the currently active desktop seat user.
3. **No Keyboards Exposed**: Keyboards remain mode `0660 root:input` with no user ACLs, preventing any unprivileged user process from sniffing keystrokes.
4. **No Group Management**: The user does not need to be in the `input` group, and permissions automatically transfer across desktop login sessions without logouts or system reboots.
