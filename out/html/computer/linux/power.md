# Power Management

## Suspend

Can't suspend machine anymore?

```
$ systemd-inhibit
WHO            UID    USER      PID  COMM            WHAT                                                     WHY                                         MODE
NetworkManager 0      root      2045 NetworkManager  sleep                                                    NetworkManager needs to turn off networks   delay
Realtime Kit   0      root      2391 rtkit-daemon    sleep                                                    Demote realtime scheduling and stop canary. delay
UPower         0      root      2588 upowerd         sleep                                                    Pause device polling                        delay
GNOME Shell    674777 vorburger 5801 gnome-shell     sleep                                                    GNOME needs to lock the screen              delay
GNOME Shell    674777 vorburger 5801 gnome-shell     sleep                                                    GNOME needs to save screen time data        delay
vorburger      674777 vorburger 6064 gsd-media-keys  handle-power-key:handle-suspend-key:handle-hibernate-key GNOME handling keypresses                   block
vorburger      674777 vorburger 6064 gsd-media-keys  sleep                                                    GNOME handling keypresses                   delay
vorburger      674777 vorburger 6065 gsd-power       sleep                                                    GNOME needs to lock the screen              delay
vorburger      674777 vorburger 5790 gnome-session-s sleep                                                    user session inhibited                      block

$ gnome-session-inhibit -l
No inhibitors

$ gsettings get org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type
'nothing'

$ gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'suspend'
```

Suspend works again.
