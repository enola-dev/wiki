---
type: Article
generated: { by: reference_agent/gemini-3.6-flash, at: 2026-08-26T02:07:30Z }
tags:
  - yubikey
  - gpg
  - ssh
  - fido2
  - smartcard
  - nixos
updated: "2026-08-26"
---

# YubiKey OpenPGP and FIDO2 Security Key Workflow

This document summarizes troubleshooting findings regarding repeated PIN prompts, smartcard session resets, and FIDO2 vs OpenPGP key workflows when using a YubiKey on Linux (NixOS).

## OpenPGP Smartcard PIN Prompt Behavior

When using a YubiKey for GnuPG (`pass`, GPG commit signing, or SSH via `gpg-agent`):

### 1. `scdaemon` and `pcscd` Conflicting Drivers

- Putting both `disable-ccid` / `pcsc-shared` AND `shared-access` in `~/.gnupg/scdaemon.conf` breaks `scdaemon` with `No SmartCard daemon`.
- **Resolution**: Use `disable-ccid` and `pcsc-shared` in `scdaemon.conf` so `scdaemon` routes card access through the system `pcscd` service without breaking parser options.

### 2. Card Timeout Invalidating PIN Cache

- Setting `card-timeout 1` in `scdaemon.conf` closes the smartcard hardware connection 1 second after every GPG operation.
- **Resolution**: Closing the smartcard connection causes YubiKey hardware to reset its authenticated session, dropping the cached PIN in `gpg-agent`. Do not set short `card-timeout` values if PIN caching is desired.

### 3. OpenPGP Card `forcesig` Setting

- If `Signature PIN` is set to `forced` on the OpenPGP card (visible via `gpg --card-status`), the YubiKey hardware enforces fresh PIN entry for every signature operation (`git commit` / `git push`) regardless of `gpg-agent` cache configuration.
- **Resolution**: Toggle `forcesig` off via `gpg --card-edit` -> `admin` -> `forcesig`.

### 4. OpenPGP Touch Policy (`UIF`) Hardware Requirement

- If OpenPGP User Interaction Flag (UIF) / Touch Policy is set to `On (fixed)` (visible via `ykman openpgp info`), the OpenPGP card standard v2.1 chip specification ties PIN verification 1:1 to every hardware touch/signature request.
- **Consequence**: `gpg-agent` cannot cache the PIN across operations when OpenPGP Touch is enabled; the card firmware demands fresh PIN authentication before accepting physical touch for each operation.

## Hardware Support for SSH FIDO2 Security Keys

To achieve **"Physical Touch per action, but PIN typed only once per session"**, standard SSH FIDO2 keys (`ed25519-sk` or `ecdsa-sk`) are preferred over OpenPGP SSH emulation.

### Firmware Version Limitations

- **`ed25519-sk`**: Requires YubiKey firmware **5.2.3 or higher**. Attempting enrollment on older firmware yields: `Key enrollment failed: requested feature not supported`.
- **`ecdsa-sk` (NIST P-256)**: Supported on **all YubiKey 5 series** firmware (including version 5.1.2). Provides 128-bit cryptographic security equivalent to Ed25519, backed by hardware side-channel protection.

### Configuration & Usage

1. Generate an `ecdsa-sk` SSH key:
   ```bash
   ssh-keygen -t ecdsa-sk -C "yubikey-titan"
   ```
2. Configure `~/.ssh/config` to use the explicit identity:
   ```text
   Host github.com
       IdentityFile ~/.ssh/id_ecdsa_sk
       IdentitiesOnly yes
   ```
3. Register `id_ecdsa_sk.pub` on GitHub. Outgoing Git pushes will trigger a green touch prompt on the YubiKey without demanding GPG PIN re-entry.

## References

- [Nix Package Manager](../programming/nix/nix.md)
