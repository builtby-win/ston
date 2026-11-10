---
title: "stremio setup guide: laptop, tv, phone, and torbox"
date: 2026-11-10
description: "one stremio account on every screen, torbox for streams, and the bootstrapper so you don't configure addons by hand."
tags: ["stremio", "torbox", "guide"]
draft: true
---

the one thing that will ruin your afternoon: **do not sign up with apple.**

it looks like the easy button. it isn't. an account made through apple (or facebook) has no stremio password, and the bootstrapper in step 3 wants one. its own login text literally says "if you have created your account through facebook, please use the latter," meaning you go dig your auth key out of the browser console by hand. pain in the butt.

sign up with **email and password**. write them down. you'll type them on every screen.

## 1. make the account on your laptop

grab the desktop app from [stremio.com/downloads](https://www.stremio.com/downloads) (windows, macos, linux), open it, hit sign up, email + password.

do this first. typing credentials with a tv remote is miserable and you only want to do it once.

## 2. phone and tv

same account everywhere and your addons and library follow you around.

- **android:** google play.
- **iphone:** this is the annoying one. the downloads page lists ios as a "limited version," which is just the [web app](https://blog.stremio.com/using-stremio-web-on-iphone-ipad/) on your home screen. the full app is only on [altstore pal](https://altstore.io/source/dl.strem.io/apple/altstore/source.json?app=com.stremio.pal), and that's europe, brazil and japan only.
- **tv:** the downloads page lists android tv, apple tv, samsung (2019+), lg (2020+), and sony/philips/hisense. search "stremio" in your tv's app store. fire tv isn't on the list, so i can't promise anything there.

sign in with the email + password from step 1.

## 3. torbox first, then the bootstrapper

get torbox sorted before you touch the bootstrapper:

1. make an account and pick a plan at [torbox.app](https://torbox.app).
2. copy your api key from [torbox.app/settings](https://torbox.app/settings).

now open [bootstrapper.stremaddon.net](https://bootstrapper.stremaddon.net/). it takes a preset of addons and writes it straight into your stremio account, already wired up for your debrid service. no hunting for addons, no pasting urls.

**heads up: it wipes your existing addon setup.** the page says so in bold. there's a backup button, so hit it first.

then it's:

1. **log in** with your stremio email + password (this is the step apple sign-in breaks).
2. **backup** your current config. recommended, takes a second.
3. **pick a preset.** the options are minimal, standard, full, all-in-one, http-only, no streams, and factory. factory resets the account to a fresh one.
4. **pick a language.**
5. **choose torbox** as your debrid service and paste the api key from above. you can skip this, but then you get a setup with no debrid in it.
6. **click "sync to stremio."** done.

it's the "auth key" thing from earlier: you don't need to grab one yourself if you log in with email + password, the site gets it for you. which is the whole point of not using apple.

## already signed up with apple?

you can still do it, just the hard way. the bootstrapper lets you paste an auth key instead of a password:

1. log in at [web.stremio.com](https://web.stremio.com) in a laptop browser.
2. open the developer console.
3. run `JSON.parse(localStorage.getItem("profile")).auth.key`
4. paste the output into the bootstrapper.

treat that key like a password. anyone with it is logged in as you.

## last step

open stremio on each screen, pull up something, hit play. if one device is missing the addons, it's signed into a different account. every time.
