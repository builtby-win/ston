---
title: Apps I Use Every Day as an AI Builder
date: 2026-03-12
tags:
  - content
  - workflow
  - tools
  - ai
status: draft
aliases:
  - AI builder stack
  - Everyday apps
---

# Apps I Use Every Day as an AI Builder

## Hook options

### Hook 1

these are the apps i use every single day as an AI builder.

not my "recommended mac apps."
not some aesthetic productivity stack.
just the actual tools i lean on to ship fast, juggle way too many AI sessions, and keep my macbook from turning into a giant pile of friction.

### Hook 2

my macbook setup is probably overkill.

but this is the exact stack i use every day to build with claude, codex, and gemini without losing my mind.

### Hook 3

if you dropped me onto a fresh macbook and told me to start building again, these are the apps i would reinstall first.

some of them are doing the heavy lifting.
some of them just save me from 100 tiny annoyances a day.
all of them have earned their spot.

## Recommended opening

if you dropped me onto a fresh macbook and told me to start building again, these are the apps i would reinstall first.

not because they are trendy.
not because they make me feel productive.
just because i actually use them every day.

some of them do the heavy lifting. some of them save me from 100 tiny annoyances. together, they make it way easier for me to build fast with AI.

## Who this is for

this is for beginner-to-intermediate builders who want to ship faster with AI without making their setup feel like a cursed mess.

## Core thesis

i use a pretty ridiculous stack every day.

it is not one of those fake "my favorite productivity apps" lists where every tool somehow changes your life and makes you feel aligned with the universe. these are just the apps i actually keep open, reach for constantly, and get mildly annoyed without.

a lot of AI workflow advice is way too abstract. people say stuff like "just use AI better" as if the model alone is the workflow. but for me the real advantage comes from the whole environment around it: terminals, coding tools, window management, hotkeys, clipboard and file utilities, and a bunch of little mac apps that remove dumb friction all day.

that is really the point of this note.

i want to show the actual tools i use, why they matter, and how they fit together when i'm building. not just which apps are good in theory, but which ones i genuinely rely on when i'm juggling AI coding sessions, writing, testing ideas, and shipping stuff.

some of these apps are obvious. some are weirdly specific. some i probably would not want to live without at this point.

## App buckets

### AI + coding

this is the core of the whole thing.

if you took away everything else and left me this bucket, i could still do a disgusting amount of damage. this is basically the layer where the actual building happens: agents, editors, terminal sessions, and the tooling i use to juggle a bunch of parallel work without losing my mind.

- `claude`
- `codex`
- `gemini cli`
- `ghostty`
- `tmux`
- `zed`
- `back2vibing`
- `conductor`

the common thread here is not just "AI coding." it is session density. i want to be able to think, prompt, review, edit, and branch out across multiple threads of work without everything collapsing into one giant terminal tab from hell.

### Mac control and window management

this bucket is all the invisible stuff that makes the rest of the stack feel snappy instead of annoying.

most people underestimate how much energy gets burned on dumb little movements: resizing windows, fixing mouse behavior, switching apps, moving between spaces, triggering shortcuts, or hunting for something you do 50 times a day. this bucket is me refusing to lose that energy for no reason.

- `bettertouchtool`
- `ice`
- `linearmouse`
- `nightshift control`
- `rectangle pro`
- `karabiner elements`
- `raycast`

none of these are sexy in isolation, but together they make my mac feel like it actually works for me instead of against me.

### Capture, handoff, and utility

this is the bucket for all the little "wait where did that go" moments.

when i am building fast, i am constantly moving screenshots, links, files, references, measurements, and little bits of context around. if that handoff layer sucks, the whole workflow gets weirdly sticky. these apps keep ideas moving.

- `dropover`
- `pixelsnap2`
- `cleanshot`
- `velja`
- `helium`

this is probably the least glamorous bucket, but it saves me from a lot of tiny annoyances that add up hard over a full day.

### System, security, and audio

this bucket is smaller, but i use both of these constantly.

they are not really "builder" apps in the loud sense, but they absolutely support the environment i work in every day. one keeps my logins and credentials sane. the other makes my mac audio actually tolerable.

- `bitwarden`
- `eqmac`

these are the kind of apps you stop noticing once they are working well, which is honestly the highest compliment.

### Builder workflow extras

this last bucket is for apps that feel a little more orbit-y around the main workflow, but still matter because they shape how i use the models and how i manage output.

- `antigravity`

this one is less about direct coding input and more about extending the way i interact with the broader AI workflow around building.

## Quick bucket logic

the easiest way to think about the whole stack is this:

- AI + coding = where the work happens
- Mac control = how i move fast without friction
- Capture + utility = how context moves around
- System + audio = background stability
- Extras = the stuff that expands the workflow a bit beyond the obvious core

it is probably overkill. but it is overkill in a way that genuinely helps.

## Strong opinions before the app-by-app breakdown

if you took away everything on my macbook and only left me the AI + coding bucket, i could still get most of my actual work done. that is easily the highest leverage part of my setup.

everything else is more like: i have spent years sanding down friction on macos until the whole machine feels weirdly dialed in. those apps matter a lot, but the AI coding stack is the part doing the most damage.

that said, a few non-AI apps are absolutely in heavy rotation.

`raycast` is probably one of my most used apps on my machine behind the AI coding tools. i use it constantly. same with `bitwarden` actually. bitwarden is not flashy at all, but i use it a ton and would be very annoyed very quickly if it disappeared.

`dropover` is also way up there. honestly it is one of the sneaky MVPs of my whole mac setup. the shelf idea sounds simple, but it solves a super real problem. macos has all these awkward little drag-and-drop gaps where something should work, but does not quite. like dragging an image out of Photos into another app. with dropover, i can throw it onto the shelf, let it actually download into the filesystem, and then move it wherever i want. insanely useful.

`pixelsnap2` is another one i use all the time. it just makes grabbing measurements and fast screenshots feel way smoother than it should. the auto-sizing stuff is really nice and makes it feel way faster than doing things manually.

also: there is probably a separate blog here about the agent skills i use all the time. that should definitely link off this post later.

## AI + coding apps

### claude

- what it is: probably still my favorite AI coding agent overall
- why i use it: it is insanely good for investigating weird bugs, understanding codebases, and planning work before i start touching stuff
- what friction it removes: it helps me get unstuck when i need taste, reasoning, or deeper diagnosis instead of just raw code output
- personal detail: if i had to rank the big three right now, claude is still at the top for me

### codex

- what it is: one of the best implementation-focused coding agents right now
- why i use it: it is really solid at doing work cleanly and not spraying tech debt everywhere
- what friction it removes: it lets me push implementation forward with less babysitting when the task is already pretty well defined
- personal detail: codex definitely gets confused sometimes, but when the task is clear it is a beast

### gemini cli

- what it is: the google-side coding agent i use heavily, especially with gemini ai pro
- why i use it: it is really good at UI and UX work, and sometimes surprisingly good at bug hunting too
- what friction it removes: it gives me another strong lane for parallel work, especially when i want interface ideas or another opinion on a problem
- personal detail: gemini is close behind claude and codex for me, but it shines in different situations

### conductor

- what it is: the feature around gemini that makes the workflow feel much stronger
- why i use it: conductor makes gemini way more usable at scale and helps the whole session orchestration feel smooth
- what friction it removes: it cuts down the chaos of managing multiple flows and makes gemini feel more serious as a daily driver
- personal detail: i honestly think conductor is the best of the orchestration-style features compared to what i get from claude and codex right now, even with the superpower plugin stuff

### zed

- what it is: my main editor and basically my vscode replacement
- why i use it: it is crazy fast, clean, and feels modern without a bunch of sluggish IDE energy
- what friction it removes: it keeps editing and navigation feeling instant, which matters a lot when i am bouncing between sessions all day
- personal detail: to me it feels like sublime text got a modern refresh and hit the gym

### ghostty

- what it is: the terminal app i live in
- why i use it: it is fast, clean, and makes having a bunch of terminal-based agent sessions open feel normal instead of cursed
- what friction it removes: it gives me a stable home base for all the CLI-heavy work i do every day
- personal detail: a lot of this whole workflow falls apart if the terminal experience sucks, so ghostty matters more than people think

### tmux

- what it is: the session manager that lets me keep a stupid amount of work alive at once
- why i use it: i do not want one fragile terminal tab to represent an entire stream of work
- what friction it removes: tmux makes parallel work actually manageable and lets me keep context around instead of constantly rebuilding it
- personal detail: if you are only using one AI coding session at a time, you are leaving a lot on the table

### back2vibing

- what it is: my own app for juggling a bunch of AI coding sessions at once
- why i use it: it is built around exactly how i like to work, which is lots of parallel sessions instead of waiting around on one agent
- what friction it removes: it turns multi-session AI coding from annoying into kind of addictive
- personal detail: back2vibing is basically the embodiment of how i think AI coding should feel

## Video adaptation plan

this post should not just become a blog. it should become one long-form video first, then get chopped into short-form after.

### Recommended format

- long-form video = "the apps i use every day as an AI builder"
- format = talking head or voiceover + live screen recordings of each app
- vibe = show the actual setup, do not just list tools like a top 10 video

### Long-form video hook

if you dropped me onto a fresh macbook and told me to start building again, these are the apps i would reinstall first.

this is not a generic productivity stack. this is the actual setup i use every day to build with claude, codex, and gemini without losing my mind.

### Long-form video structure

1. cold open with your mac desktop and a few fast cuts of the main apps
2. explain the core thesis: AI + coding does the most damage, everything else removes friction
3. go bucket by bucket
4. for each app, show a real action on screen instead of just naming it
5. end with your favorite apps plus a tease for the follow-up post on agent skills

### Best screen recording moments

- `claude`, `codex`, `gemini cli`: show real prompts, diff review, or a bug hunt
- `conductor`: show why the orchestration feels better than expected
- `zed`: show how fast it feels moving around a project
- `ghostty` + `tmux`: show session density
- `back2vibing`: show the multi-session workflow visually
- `raycast`: show how often you reach for it
- `dropover`: show the Photos -> Dropover -> app handoff flow
- `pixelsnap2`: show the auto sizing and quick measurement workflow
- `bitwarden`: mention frequent use, but avoid oversharing sensitive flows on screen

## Short-form clipping plan

the long-form recording should be the source footage for shorts, reels, and tiktoks.

### Best short-form cuts

- `3 apps i would reinstall first on a fresh macbook`
- `my real AI coding stack as a solo builder`
- `why dropover is one of the most underrated mac apps`
- `the best AI coding agents right now for different jobs`
- `why i think conductor is insanely good`
- `zed replaced vscode for me`

### Short-form structure

- 1 strong hook
- 1 tool or comparison
- 1 real proof moment on screen
- 1 opinionated close

### Example short-form hook

these 3 apps save me a stupid amount of time every single week.

or:

if you are building with AI on a mac and you are not using this app, you are making life harder than it needs to be.

## Transition to future content

there is a clean follow-up piece after this one:

- `the agent skills i use all the time`

that post can link off this one naturally because this apps post shows the environment, and the skills post shows the workflows and prompting layer inside that environment.
