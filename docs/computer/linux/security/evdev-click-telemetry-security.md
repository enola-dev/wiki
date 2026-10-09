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
  - https://nixfiles.vorburger.ch/reference/openscreen
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

## Threat Profile Comparison

| Capability                    | Default Wayland | With Mouse udev `uaccess` |              With Scoped setgid Binary               |  With `sudo usermod -aG input`  |
| :---------------------------- | :-------------: | :-----------------------: | :--------------------------------------------------: | :-----------------------------: |
| **Keystrokes / Passwords**    |   🔒 Blocked    |      🔒 **Blocked**       | ⚠️ Exposes attack surface (helper has group `input`) | 🚨 **Exposed to all user apps** |
| **Global Mouse Clicks**       |   🔒 Blocked    | ⚠️ Readable by user apps  |          🔒 Blocked (only helper reads it)           |    ⚠️ Readable by user apps     |
| **Relative Mouse Motion**     |   🔒 Blocked    | ⚠️ Readable by user apps  |          🔒 Blocked (only helper reads it)           |    ⚠️ Readable by user apps     |
| **Synthetic Click Injection** |   🔒 Blocked    |      🔒 **Blocked**       |                      🔒 Blocked                      |           🔒 Blocked            |
| **Device Grab / Freeze**      |   🔒 Blocked    |  ⚠️ Possible via `ioctl`  |                      🔒 Blocked                      |     ⚠️ Possible via `ioctl`     |

## Architecture Decision: Targeted udev vs. Scoped setgid

When designing a secure solution, two architectures are possible:

1. **Targeted udev `uaccess` (Recommended)**: Grants dynamic ACLs on mouse event nodes exclusively to the active desktop session user.
2. **Scoped setgid Wrapper**: Creates a privileged binary (e.g. `owner = "root"`, `group = "input"`, mode `2750`) so only the helper binary runs with `input` privileges.

### Why the udev Route is the Recommended Choice

The **targeted udev route** is the definitive, recommended solution:

- **Eliminates Privileged Binaries**: Setgid/setuid binaries introduce privileged entry points on the host filesystem. With udev rules, no binary runs with elevated privileges.
- **Hardware-Level Keyboard Protection**: The setgid wrapper approach still gives the helper binary access to the full `input` group, which includes all keyboards. If the helper executable suffers from a memory corruption bug or exploitation, it could be leveraged to read keystrokes. In contrast, the udev approach enforces hardware-level exclusion (`ENV{ID_INPUT_KEYBOARD}!="1"`) in the kernel device subsystem—unprivileged userspace physically cannot open keyboard character devices.
- **Native Desktop Integration**: It uses the same systemd-logind `uaccess` seat management infrastructure that securely grants user access to video capture cards (`/dev/video*`), DRM render nodes (`/dev/dri/*`), and audio devices (`/dev/snd/*`).

## Implementation via Declarative udev Rule

In NixOS or udev rules configuration (`/etc/udev/rules.d/70-mouse-uaccess.rules`):

```udev
KERNEL=="event*", SUBSYSTEM=="input", ENV{ID_INPUT_MOUSE}=="1", ENV{ID_INPUT_KEYBOARD}!="1", TAG+="uaccess"
```

### How It Works

1. **Strict Filtering**: The rule checks `ENV{ID_INPUT_MOUSE}=="1"` and explicitly excludes any device acting as a keyboard (`ENV{ID_INPUT_KEYBOARD}!="1"`).
2. **Dynamic ACL Assignment**: When matching, udev attaches `TAG+="uaccess"`. Systemd's `systemd-logind` builtin then grants read/write POSIX ACLs (`setfacl`) on those specific mouse character devices exclusively to the currently active desktop seat user.
3. **No Keyboards Exposed**: Keyboards remain mode `0660 root:input` with no user ACLs, preventing any unprivileged user process from sniffing keystrokes.
4. **No Group Management**: The user does not need to be in the `input` group, and permissions automatically transfer across desktop login sessions without logouts or system reboots.

## References

- Implementation in NixOS: [NixOS OpenScreen Reference](https://nixfiles.vorburger.ch/reference/openscreen)
- Upstream: [OpenScreen Linux Installation & Platform Guide](https://getopenscreen.com/docs/installation/#linux)
