---
title: "parallel coding agents with git worktrees, tmux, and conductor"
date: 2026-07-14
description: "the workflow i use to run several agents at once, and where it still breaks"
tags: ["ai", "oh-my-pi", "conductor", "tmux", "git-worktrees", "workflow"]
draft: false
---

running several coding agents at once is the whole game for me now. the thing that makes it work is git worktrees — every agent gets its own isolated checkout of the repo, so a handful of them can run at the same time without stepping on each other's toes.

the hard part is wrangling all those worktrees. i've tried doing it from the terminal with [workmux](https://github.com/raine/workmux), worktrunk, and a few other CLIs, but honestly a GUI helps a lot. [conductor](https://www.conductor.build/) is the one that stuck — a new worktree is one click, and i can watch every agent at a glance instead of hunting through terminal tabs.

disclosure up front: one of the tools below is [back2vibing](https://back2vibing.builtby.win/), which i built myself. discount me accordingly. the problem it addresses is real whether or not you use my thing.

here's the whole loop, start to finish, before i break down the pieces:

<video src="/blog/workflow-full.mp4" autoplay loop muted playsinline width="1110" height="720" aria-label="the full loop: create a conductor workspace, sync with spotlight, open a PR, then merge and clean up the worktree and tmux session"></video>

## the setup

- [conductor](https://www.conductor.build/) - my main cockpit for all of this. creating a worktree workspace is one click and i can watch every agent side by side
- [oh-my-pi](https://github.com/can1357/oh-my-pi) - even though conductor's chat is decent, i still do most of my agent work in the terminal. i found oh-my-pi about a month ago and have been driving it ever since. it pretty much does everything i could think of before i can think of it: advisor mode, LSP, steering, etc.
- [ghostty](https://ghostty.org/) + [tmux](https://github.com/tmux/tmux) - i've tried most terminals, but i've settled on ghostty + tmux because they are super performant and handle everything i need (leader key op)
- [codex desktop app](https://openai.com/codex/) - i really like the codex desktop app, but working in worktrees through its chat interface is clunky compared to conductor and the way i run parallel agents. codex's computer use is quite good, though, so i use it for serious UI debugging
- [back2vibing](https://back2vibing.builtby.win/) - i've integrated the popular coding agents and terminals into back2vibing so they feel like one system. conductor, codex desktop, and my terminal all tell me when they're done or need me, and i can jump directly to the correct agent in a split second
- typewhisper - a voice-to-text app that mutes and pauses media while active. i still mostly type, but i do like to talk from time to time

day to day, a single change moves through all of it like this:

1. create a workspace in conductor
2. run a conductor startup command that creates a tmux session, opens ghostty, and switches to the session named after the workspace
3. run omp inside the terminal and begin prompting
4. if necessary, use the codex app shortcut in the CLI to open the workspace in the desktop app
5. use conductor's spotlight mode to sync changes to my main repo for testing, instead of recreating my entire dev setup and copying environment variables into every worktree
6. once the fix or feature is implemented, go back to conductor, create a PR, ask fable 5 to review the code, and merge it into github
7. conductor runs clean up -> deletes worktree -> then i run a conductor clean up script to remove the tmux session also.

## the models

right now, i pay for chatgpt pro ($200), claude code pro ($20), and gemini ($20) per month.
i don't have enough credits to unleash fable 5 to its limits, but 5.6 sol has been pretty much a godsend.
i have oh-my-pi set up with 5.6 sol auto for everything and advisor mode with gemini 3.5 flash. then i use fable 5 to review the code before merging to main.

## here's where my attention is cooked

we're shipping faster than ever but still agents can take between either 30 seconds or 1 hour to complete a task.
i think we're all realizing that...why don't i just fire up a couple more agents while i wait for others to finish?
it's greedy and the workflow seems fine but once you get more than 2-3 agents going at a time, it gets really hard to keep track of.

<video src="/blog/back2vibing-peeking.mp4" autoplay loop muted playsinline width="1110" height="720" aria-label="peeking at several agents running across conductor, codex desktop, and the terminal, then jumping to the one that needs attention"></video>

## the real bottleneck is my attention

the number of agents i can start is much higher than the number i can responsibly review.
once i started agentic development, i felt like i was constantly spamming cmd + tab/` to find the terminal tab my agents were running in.

i needed a tool that allowed me to focus my attention on prompting, so i built back2vibing. now i can peek all my agents working exactly where they are in conductor, codex desktop, or the terminal. whenever my agents need me, back2vibing will bring me back to the agent right away automatically.

that is why the stack feels like 10xing my productivity while also frying my attention. the code is no longer the scarce resource. keeping the goals straight, reviewing the output, and knowing when to stop starting new work are.

## where it still breaks

- worktrees isolate files, but they do not isolate ideas. two agents can make individually reasonable changes that completely disagree about how the system should work
- merge conflicts are still an everyday occurrence. even when git merges cleanly, one branch can quietly invalidate assumptions made in another
- long-running agents go stale. the longer a task runs, the more likely another branch has changed the code underneath its plan
- agents can produce code much faster than i can understand and review it. starting five agents does not give me five times the ability to verify their work

i feel like shipping has become a game of whack-a-mole as we make new features, we inevitably will cause regressions. i'm not sure if this a result of agentic coding producing slop or if we're just shipping 10x faster so there's 10x bugs.
a feature that used to take 1 month can be shipped in 2 hours.
i used to be a lot more careful around code and now it's just prompt and pray.

whether this is a good or a bad thing is still up for debate, but what is for sure is that the landscape is changing completely every couple months.

- winston
