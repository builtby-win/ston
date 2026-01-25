---
title: "claude code is going to lose (at this rate)"
date: 2026-01-24
description: "maybe the start of searching for profitability?"
tags: ["ai", "claude-code", "gemini", "opinion", "tooling"]
draft: false
---

the best things in life are free. the next best things in life are startups lighting money on fire to get users.

for the last month of 2025, i decided to bite the bullet and upgrade my $20/month claude code plan to the $100/month claude max plan. this turned out to be one of the greatest return on investment i've ever gotten. $100 for $2k of credits in one month. i was genuinely blown away with the quality of opus 4.5 and how much i was able to build, but after my subscription ended, i decided to shop around just to play around with the other models.

![claude max actual usage](/blog/claude-max-usage.png)

**figure 1: my actual claude code usage across december to january**

- 2025-12-24 → 2026-01-12: $1,612.73 total over 19 days
- $84.84/day average
- **$2,545/month extrapolated**
- $100 subscription cost = **2,445% ROI**

i downgraded from max back to pro and loaded up chatgpt plus and google ai pro to get access to codex w/ chatgpt 5.2 and gemini cli w/ gemini 3 pro/flash.

the difference is staggering because claude code is basically unusable compared to codex and gemini at the $20/month.

## so what's going on?

since the start of 2026, claude code has kind of just become shitty at least at a non-enterprise level.

this is echoed a million times over on the [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/) about usage limits becoming extremely tight and most people are ridiculous to expect a $20/month plan should let them build facebook in a one shot prompt, but there is something genuinely wrong with claude code.

i don't know if it's them tightening up the bootstraps or claude code is running into some serious, serious AI slop tech debt, but i can't even get through 30 minutes of vibe coding on claude without absolutely decimating my 5 hour limit while on gemini i can literally code the entire day and only hit the limit a couple times.

and it's not just claude code. the batch API got [severely nerfed on jan 21](https://www.reddit.com/r/ClaudeAI/comments/1qkodm0/batch_api_timing_out_consistently_for_24_hours/). my friend and i were relying on batch for parsing emails in [areyougo.ing](https://areyougo.ing) and we literally can't use the batch API anymore as it takes 8-9 hours to finish a batch as opposed to 1-2 minutes from before. we now have to pivot off the batch API to use synchronous calls one by one, increasing costs 2x compared to the batch api. we went to anthropic FOR the batching and better rate limits in the first place, and now we're scrambling to find alternatives.

## is this the start of enshittification?

if anthropic is tightening this hard, will gemini and openai follow suit?

my prediction is alot of devs are going to flock to gemini in the next few weeks because the gemini limits are ridiculously generous. i paid $100 for a year of goole ai pro, which gives me huge limits in antigravity & gemini CLI, + 2tb of google drive storage, and more google stuff.

my friend and i did a 12 hour hackathon last week and we both only ran into gemini limits at the end of the 12 hour hackathon... all of this on the $20 a month plan.

but both of us found that this weekend that gemini servers are getting absolutely slammed.

![gemini servers getting slammed](/blog/gemini-servers-slammed.png)

maybe google will start tightening up its bootstraps and push people to pay for their google AI ultra plan as well? i think it would be wise for google to use its war chest to completely overtake anthropic while claude code is getting some bad press.

## google might eat anthropic's lunch

claude code with opus 4.5 is sooooo good, but after playing around with gemini for almost a month... i'm frankly blown away at the quality of code generated combined with the extremely generous limits.

gemini built this entire [blog](https://github.com/builtby-win/ston), the marketing site for [back2vibing](https://back2vibing.builtby.win), and most of the UI for [areyougo.ing](https://areyougo.ing). all on the $20 plan... it's a serious powerhouse.

but even with its unlimited money reserves, google's struggling to keep up with demand. people have an unquenchable thirst for cheap AI coding models.

so i wouldn't put all my eggs in one basket right now. things are changing moment to moment. in the next 3 months, this entire landscape could shift.

## $20/month tier shootout (as of jan 2026)

**Claude Pro** — Opus 4.5 | Limit: 30min opus or 1hr sonnet | CLI: Plan Mode + Opus 🔥

**ChatGPT Plus** — Codex (GPT 5.2) | Limit: ~3 days of hardcore coding | CLI: OpenCode + Codex ✅

**Google AI Pro** — Gemini 3 Pro | Limit: ~12 hour hackathon, limit resets daily | CLI: Gemini + Conductor 👨‍🍳😘

## things change fast in this space

personally i'm going to pay for the max again because i bought the annual plan for $200 and don't think it's worth staying on the pro plan anymore. (maybe this is their tactic to make $20 plan so horrible we're all forced to upgrade to the $100 plan 😂) but if i was forced to pick one $20 subscription, it would be gemini without question.

i'm even considering paying for gemini AI ultra for $250 a month because i actually think it's so insanely good at UI compared to Opus 4.5...

i still think claude code has the best UX for any CLI but gemini + conductor and opencode + codex is getting pretty friggin good.

there's no such thing as a free lunch, but it looks like everyday the menu is changing.

- winston
