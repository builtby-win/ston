---
title: "stremio setup guide: laptop, tv, phone, and torbox"
date: 2026-11-10
description: "get stremio running on every screen, grab your auth key with the bootstrapper, and hook up torbox."
tags: ["stremio", "torbox", "guide"]
draft: true
---

this is the setup i'd walk a friend through. one account, every screen, torbox doing the heavy lifting.

## 0. read this before you sign up

**do not use "sign in with apple."**

it looks easier. it isn't. the account ends up behind a hidden relay email, and the bootstrapper in step 2 needs a plain email + password to log in. you'll hit a wall and have to untangle it later.

make the account with **email and password**. save them somewhere. you'll use them on every device.

## 1. install stremio everywhere

grab it from [stremio.com/downloads](https://www.stremio.com/downloads).

- **laptop:** mac / windows / linux app. install, open, sign up with email + password.
- **phone:** ios app store or android play store. sign in with the same email + password.
- **tv:** android tv / google tv / fire tv / apple tv builds exist. install from your tv's app store and sign in with the same account.

same account on all three means addons and library sync everywhere. set it up once and the rest just inherit it.

> tip: typing an email + password on a tv remote is miserable. do the signup on the laptop first, then only type credentials once on the tv.

## 2. get your auth key with the bootstrapper

open [bootstrapper.stremaddon.net](https://bootstrapper.stremaddon.net/).

1. log in with the same stremio email + password from step 0 (this is why apple sign-in breaks things).
2. grab your **auth key** from the page.
3. keep it private. it's basically a login token for your account. don't paste it in screenshots or discord.

<!-- TODO(winston): confirm exact button labels / screenshot of the bootstrapper page -->

## 3. set up torbox

1. make an account at [torbox.app](https://torbox.app) and pick a plan.
2. copy your **api key** from the torbox settings page.
3. install a torbox-compatible addon in stremio and paste your torbox api key when it asks.

<!-- TODO(winston): which addon / how you use the bootstrapper to push it (torrentio, comet, mediafusion, etc.) -->

because the addon lives on your stremio account, it shows up on the laptop, phone, and tv without redoing anything.

## checklist

- [ ] account made with email + password (not apple)
- [ ] stremio installed + signed in on laptop, phone, tv
- [ ] auth key grabbed from the bootstrapper
- [ ] torbox api key added to your addon
- [ ] play something on each screen to confirm

if something breaks, nine times out of ten it's a device signed into a different account.
