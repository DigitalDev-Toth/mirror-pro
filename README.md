MIRROR PRO - APPLICATION
===

GET IT
---
- `$ git clone --recursive git@github.com:DigitalDev-Toth/mirror-workspace.git`

HOW TO USE IT
---
In root project folder:

- Build DLL with vendor libraries:
```
make dll
```
- Build application in development mode:
```
make build
```
- Build application in production mode:
```
make build e=production
```
- Work with `webpack-dev-server` and `HMR`:
```
make wds
```

ACCESS
---
Every service has its own pair of ports:
- Nginx:
```
HTTP: localhost:8018
HTTPS: localhost:8028
```
- Apache httpd:
```
HTTP: localhost:8038
HTTPS: localhost:8048
```
- Webpack dev server:
```
HTTP: localhost:8058
HTTPS: localhost:8068
```

SNAPSHOTS
---
#### WINDOWING
![windowing](https://lh3.googleusercontent.com/l6sZOgN0raLRjvLa4lOCeBVFwuaNDwpxwwgj4PE5Tu-7S1srepkLZOO_IdAentdoWPq7ht0TvUexNQ45WvVxHgChTRdO3syxDEmtYyGII-Pe14djasEfnSIDR0oqR2nrt_a2hjvQ0xcj9CO3y-Cad864Xk6I2tLEgzt1mx0xfbky7kvkNHmO5KOzclvmvNPAtdFLybu9Fwn1jstwFxLPwQR26GauKnKj60bHjU0YM2_I8raCmOcfIxS3KBAWH1pzRMnC1_kuVE6X2t7LHY5TILHa7ZTj59gC41KghXFtF_fs4neD1w9C-1AjKFOsw_O-dpxzU3gr45FsBH2KRVS0sKcPmRha-Qj-B1vqvcHyy9LzEMpq95F-S-SX4zQZGZGGhtW7hGPHOX_m5aLHWecgcZUi8gj3DSRUY5W2WpTzR_SM9VPT931rQZMOyeOBnASOHGNXWHbYH5z6Y4EIO2gk3WKOznlQ4uFgX5c3Oi2fgAYxZTbK3LC6JSz4FqDkhmMQDeb886491EVFT6v_IekdD8Cd_HpSKNrBpwOIuaPh5JIysiKnCNbp3fFvFNmxulKtXTNFBGMS=w1227-h670)
#### PRESETS
![presets](https://lh3.googleusercontent.com/8drcCJgchl8OA2nW9o4VymvDtlZxsMLDCvUVVp9ygShxtRgQdOsqRg-m1XSyvYq7P5k9sV7ya5q8L6fztD7KPSQsrz9fcP_93lp1vkkc2lPzlrdISiOlzwVnwcQvYqHi4YPcKYXAU3iWYd7XcVr6TdGW7M9ftJscIRDjmSeLDp8YYkB6FHzLN6TpAenKVbxLkpLGC5gWjVrpWnXiB2m6vPQaXu7DiwcdNQGW5cQLT4gucYuLUISJUEWNkIKvAId22D8ZgPL7ZuByxTyN1eks1iWnPIhboUsZAyxfpKCGDIA3CfYJGKewPWYwGKVl5RRBnA5i9tPYrWUxnVCntxvwOVHtSX06ONgaPP4DN1AdMUUOS5-oCuRYeFZMWsLTqpw4j85yUbrOyczQXc3hjPegnovRqKlGiEeURs3YfPJv0qm1a5bGkNwXBsckQfZKr-L_AdTEEGuN2iohIJhmrtL2P1h6XKQpi3o2Jyz5lBr4G0D5Pe-IoHa1R6mQ4TH9yXVCkX2_T5b4GdHbIGwOYO5wj3IP24jcG2iNtHcw4hf_ezryc3OdTabun8Cq4b5FiH2AbG78q-xh=w1227-h670)
#### ZOOM
![zoom](https://lh3.googleusercontent.com/GcWnvYR5z0erPy4K0BqKdjEiwlg1RqBA3XQV8VsKwKna3cJgRq_IIyQm2vqLcBRzwVPq394edk2xJDETxmqmzct8-Bi3fhy-0p77JV7rxsQ3bOh32N5Tcjg3WJHSO49U3W7aiCSJpClC9_M9Gkfgku_ux-kCzK_uDtEwuzUVpY2U5mbLRZU3OZrZR-uAV2QBLEZbK3FUTLZweuF4D9B69m2Va0YOB6UpUcl_DlAc9BFJ3Gm_hbiHXYxg4lrOImlMbIXQh5yoqtWdpLLaDTBVk_rhdj6AOkjmU5VKMEHIznaqzSehs8zXyq_Ip3aP6myd9chFklARYLN9i9hcLNu0kLHx7e1Nw1SoBxzKvQzzPEaz1Vs5b5L-NB0UOzl2fIbumgk9WHSHv8sWC-lJgkzizJPxz8Egxxac7j6JnSUqTQe_tVvBOb2jwxNdqBjSezrKRoOO9xpxKXTUqAhjWiHV-W6rzHKIywkUSEm-nfxMLOuGwvbuduQpvjlGwRBAqvDYR1MiiLf6fH8EN5SwAwcpukIXTr3slsYf2S8b0XEVCNy0osKxccSkXgt4FlYgn_b-SKBMd46c=w1227-h670)
#### PAN
![pan](https://lh3.googleusercontent.com/B7c_3hDFvTg_MoAQ3SauTb8Mb55-P7Agw6lonzDdgvWw4TDSPlAA92-6X95SFknWoaqxrv7CEHVm6kWRcGeqHtv8Rv-Qnhmu3FfSaLoye4btxHbkKKxyeG9TbjVNNiiRKnMk3Tz_W1g4uWjDn_V2FPjCzZ-YaJGGZrA6ZIAM8SJGrgNFVv0y_X98Fw6fV1oYsW2QlsgLohWxS4_U8Keg6XymHb16WG_Nk6wzUegRHuqdAUkw2yvCM6Dc_sQvlhH1l0a0WjQ17S1p8ztYiI4MjyYdTMpnHDHBjDJZBwQH3UKMM9LjXGrHioeMTHJi92OTBx-5dr82-KC5w5kFH9j31ufNw4ZLVpkt1nXoh37Q3Iwn9MyKWHaUu_3vi1xUN0rHDJJRuwCnlMJ2NIatawKUVpFPutcHZCd8R6308GNwUrcdUZr0-VZCE1f0F3IlcStzcKdl_69V6bxDY7BU0IW6Eo9luKkqUFCRcCPwmkoLwwXMXREB_xbN-sgA0Et9n8xrDsj6N_yAUqvJekucOd8qSMGxP-Quje8H2z-T1MC2wZgijUNDlmy82mWmIybALWaCS9jJ121Y=w1227-h670)
#### ROTATION
![rotation](https://lh3.googleusercontent.com/NuFbL3yyc6nh2t2zaztzMFXABkFwNJsSvB8FEZNzzeqEhAqtEPyVX0jYKlxr71SfWy7LFySdSWw9o0QHdtT3dcnSv8Xlx_NAdHzO-JREr4PG2dv5RjGhvpzd3RlN1IWZQRpHZ0n38QB9EjlIZ55PSLfGnm4RWHjmgpz7dlpJt5WGAQ97uYj5JXEVLqf3NaGD44LWknC-8AriNVNl3DNJxJkE6fVN2WMQrSH4C0FA5Rcz9IbeHEAAm2FYta3m2xan2Rq4XPjfnaEMkbU6nXRJKSOT0-FTcZlWnmhhtDkVMHSFkrmW0G9VwW-Kg7HgcVHQomQMcYzP_L13tw4FjPKEMoTM_ORShwgCJsaIC_J8Sb1U7e1UdB-hNKVjkd1dpDrvBkP7dd0ketA3mIinhjMqnOLJorLBw3jl3IsQT9BfrO7wvVF4jkvRGpRTSMQ0jcjfv1qAHg6GiENM3VCt6njAkbp8uUr-CReZk8LafLs_syvlw1Cunr9siv5H09L975x7wXhtoymK4puwHzZSnaiihUpxhD-ZRp4TrN6oKCg4zl8NJ0lDaFatS0Hso8gUQ1NeIXV7S8AX=w1227-h670)

TODO
---
- Make a demo in toth server
- Improve documentation
- Add unit tests
- Add integration/functional tests

***
© [Toth](http://www.toth.life) - all rights reserved
