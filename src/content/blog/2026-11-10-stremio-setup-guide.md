---
title: "how to set up stremio: the best way to stream in 2026"
date: 2026-11-10
description: "one stremio account on every screen, torbox for streams, and the bootstrapper so you never configure addons by hand. about 15 minutes."
tags: ["stremio", "torbox", "guide"]
draft: true
---

i've wasted a lot of time over the years working around blocked websites and patched methods. then a mutual friend showed me stremio + torbox earlier this year and it changed how i watch everything.

so now it's my turn to change your life.

**quick tldr:** stremio is a client you can install on your phone, tablet, laptop, or tv. on its own it plays whatever sources you point it at, through addons. some addons can stream torrents straight into stremio, but then the traffic is tied directly to your connection. that's where a debrid service comes in. torbox downloads the stream on its servers and you stream from torbox instead of from other peers.

set up once and it works on every device. start to finish it takes about 15 minutes.

> i use a torbox referral link in this guide. if you sign up through it, i get a little credit. you can go to [torbox.app](https://torbox.app) directly instead and nothing changes for you.

## 1. make a stremio account

sign up at [web.stremio.com](https://web.stremio.com) and install the app for your laptop from [stremio.com/downloads](https://www.stremio.com/downloads).

**do not use "sign in with apple" or "sign in with google."**

it looks easier. it isn't. those accounts have no stremio password, and the bootstrapper in step 3 wants one. you'd have to log in on the web, open the dev tools and dig out an auth key by hand. slightly annoying. email + password takes ten seconds.

always sign in with the same stremio account. the setup lives on the account, so once it's done it's done everywhere.

## 2. make a torbox account

1. sign up at [torbox.app](https://torbox.app/subscription?referral=da3a3cb3-f505-42f4-bdac-a1f4f74d6600) (referral link) and pick a plan. the free one is fine to try it out, but you'll want the $3/month plan to stream more than a show or two a day.
2. copy your **api key** from [torbox.app/settings](https://torbox.app/settings) and stash it in your notes app. you'll need it in a minute.

## 3. run the bootstrapper

this is the last step. open [bootstrapper.stremaddon.net](https://bootstrapper.stremaddon.net/).

it takes a preset of addons and writes it into your stremio account, already wired up for torbox. **it wipes your existing addon setup**, so hit the backup button first if you've customized anything.

**1. log in** with the same stremio email + password from step 1. the email and password boxes are the simple route. the auth key box is the annoying one.

![bootstrapper login with email and password vs auth key](/blog/stremio-bootstrapper-login.png)

**2. pick the standard preset.**

![standard preset selected](/blog/stremio-bootstrapper-preset.png)

**3. the rest of the settings are straightforward.** the one thing you need is the debrid step: pick torbox and paste your api key.

![picking torbox and pasting the api key](/blog/stremio-bootstrapper-debrid.gif)

don't skip this. the bootstrapper itself warns that without a debrid key "you will be torrenting" and to review your country's policies first.

**4. you don't need the rpdb key or anything else.**

**5. press bootstrap account.**

**6. open stremio on your computer and check the addons tab.** you should see a list of addons installed.

## 4. use it

search for a show and hit play. then install stremio on your tv and every other device and sign in with the same account. the addons come with it.

## note for ios

the stremio iphone app isn't a real native app. it's the [web version](https://blog.stremio.com/using-stremio-web-on-iphone-ipad/), so for video formats it can't play you need an external video player. their guide covers it. the full native app is only on [altstore pal](https://altstore.io/source/dl.strem.io/apple/altstore/source.json?app=com.stremio.pal), which is europe, brazil and japan only.

## disclaimer

this is a setup guide for stremio and torbox, not a content recommendation. i don't host or link to any content. stremio works fine with legal sources (public domain, your own library, free legal addons), and you're responsible for following your local laws and only watching things you have the rights to.
