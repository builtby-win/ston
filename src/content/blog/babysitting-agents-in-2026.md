---
title: "babysitting agents in 2026"
date: 2026-03-13
description: "how i use ghostty, tmux, workmux, zed, claude code, codex, gemini cli, conductor, back2vibing, superpowers, and god mode together"
tags: ["ai", "claude-code", "codex", "gemini", "workflow", "tooling"]
draft: false
---

i don't think i've written a line of code in the past 3 months.
everything in the industry is moving so fast and i can't help but feel like i'm falling behind if i'm not min/maxing an autonomous coding agent that is working almost 24/7 without any human intervention, but i just don't think we are there yet.
opus 4.6, gpt-5.4, and gemini 3.1 pro are pretty insane, but i still find myself babysitting them all day.

even with insane planning using plan mode, superpowers:planning, gsd, bmad, spec-kit, etc whatever, you can really only one-shot like 90% of the entire feature, then that last 10% is still the same yak-shaving that has been around in software engineering for decades.

i used to hear all the time that the first 10% is hard, the middle 80% is easy, and the last 10% is the hardest.
to me it's changed that first 90% is trivial and the last 10% is even harder now because

1. 10x the features means 10x the bugs
2. our systems are getting exponentially complex far more than the context window of one agent can allow

we have new challenges like merging 10 different features that would each have taken weeks to build on the same day and not breaking anything or setting up a reliable testing environment so that we can trust the agent can test with.

i found that i have been spending most of my time in this last 10%, baby-sitting agents to make sure that these features get over the finish line.
so i want to share my workflow on how i manage multiple agents across many projects without losing my mind.

### the playpen: worktrees + [workmux](https://github.com/raine/workmux)/[conductor](https://www.conductor.build/)

a pattern has emerged in agentic workflows where every agent gets its own git worktree.
each agent works on its own isolated version of the codebase, so agents don't step on each other's toes.
there are many TUIs and GUIs that do this for you. i highly recommend [conductor](https://www.conductor.build/) as a GUI and [workmux](https://github.com/raine/workmux) if you're more comfortable in the terminal.

![how i use workmux and conductor to manage agents](/blog/babysitting-agents.gif)

workmux and conductor do all the heavy lifting of setting up worktrees, copying .env variables, and getting the dev environment ready for you.
i personally switch off between conductor and workmux depending on what i'm working on.

for each worktree, i either start off with opencode w/ GPT-5.4 plan mode + superpowers:planning, claude code plan mode + superpowers:planning, or gemini with conductor to plan out the feature work or bug fix.

i spend as much as my time as possible planning out the work so we can get a clear definition of done. but this is not always possible because requirements are always changing.

once we have fleshed out the plan as much as possible, we unleash our agents to begin working on the implementation.

### the baby monitor: [back2vibing](https://back2vibing.builtby.win/)

i still don't feel comfortable letting agents build out the entire plan if it's really complex because everytime i let it run automomously for 2 hours with subagents, i probably had to spend just as much time unraveling why it wasn't working after it was finished.

![floating dock demo showing the back2vibing session dock](/blog/floating-dock-demo.gif)

i like giving the agents as small as tasks as possible and letting them work on separate parts simultaneously, setting milestones to check in on their progress and verify things are working instead of letting them code everything at once.

i am still the bottleneck in my workflow and i'm okay with that for now because i feel that being able to steer and correct the agents on complex features and tasks saves me a lot of time in the last 10%.

in the background i have back2vibing, which is basically my global baby monitor. i can have 4 or 5 different agents running in their own worktree playpens simultaneously. back2vibing lets me see which one is "crying" or needs to be "fed"—usually when an agent needs my input during planning, is waiting for permission to do something, or is done.

when a baby starts crying, i jump into that specific tmux pane, change its diaper (fix the context it's missing), feed it (give it the right docs or a nudge in the right direction), and then go back to my own thing.

### the 2026 stack

you never know if an agent is going to take 1 minute or 30 minutes to finish, so you have to be ready to jump in at any time. when you multiple this timer by many agents, it can add up quickly to a lot of context switching and brain overload.

i found that using this workflow is the only way for me to address things as fast as possible without melting my brain.

- **[ghostty](https://ghostty.org) + [tmux](https://github.com/tmux/tmux)**: the foundation.
- **[workmux](https://github.com/raine/workmux)**: the playpen generator.
- **me**: the high-level pm/orchestrator and guardrails.
- **[back2vibing](https://back2vibing.builtby.win/)**: the monitor that tells me who needs help.

you can get my set up here at [dotfiles](https://github.com/builtby-win/dotfiles) and you can try out back2vibing for free at [back2vibing.builtby.win](https://back2vibing.builtby.win/).
