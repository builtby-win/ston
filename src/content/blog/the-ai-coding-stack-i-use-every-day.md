---
title: "the ai coding stack i use every day"
date: 2026-03-15
description: "how i use ghostty, tmux, workmux, zed, claude code, codex, gemini cli, conductor, back2vibing, superpowers, and god mode together"
tags: ["ai", "claude-code", "codex", "gemini", "workflow", "tooling"]
draft: true
---

i've tried so many different apps and workflows to dial in my tools stack so i can run claude code, gemini, codex, and amp all simultaneously throughout the day.
i pay for chatgpt pro ($200/month), gemini AI Pro ($20/month), and claude code pro ($20/month)

## terminal vs GUI

i use the terminal (ghostty) and GUIs (conductor, codex app, etc.) in my workflow for different things.

i find myself gravitating back towards the terminal when i'm actively developing features because of performance and so i use my mouse less.

the two main GUI apps that i use are conductor and the codex app.

i use conductor to organize all of my work, creating new worktrees for each feature i'm working on and then using a setup script to open up my terminal and create a tmux session for that worktree. they have this really sweet spotlight testing featuer that allows you to sync your worktree with your local environment and test your code easily.

i think that the codex CLI UX is not as good as claude code or gemini. but their desktop app is really nice. i i found that you can open any directory in the codex app from the terminal using `codex app`. i usually do a lot of debugging / bug fixes in the codex app because i found that it can run reliably asynchronously without interventions.

the organization of the codex app is pretty weak as they treat each worktree as a different project and don't always default to worktrees for each worktree session so you will have sessions off of main and worktrees in the same chat or if you use codex app then the worktree will be a whole other project, so it gets pretty messy. so i like using conductor for organizing my worktrees instead.

i use GUIs for mostly set and forget tasks like organizing work and mostly work inside of the terminal.

native CLIs usually get features first like claude desktop still doesn't have /voice mode, but the CLI does. conductor ships a version of codex and claude code binary directly and you have to wait for the app to update to support these features.

tmux is the all time super hack for this phase of agentic coding.
i think that the GUIs are super great for organizing work and seeing all your work in one place, but i find myself always gravitating back towards the terminal mainly because of performance and so i use my mouse less.

i tried claude desktop, codex, conductor, crystal, emdash, and other electron/tauri webview tools but i feel like i have to click too much. i prefer to use keyboard shortcuts as much as possible because i've developed a repetitive stress injury from using my computer my whole life.

it's a lot harder to context switch across so many claude, gemini, codex sessions only in the terminal, so i've settled on using Conductor to create worktrees so that it's easier to view all the parallelized work in one place and then having a setup script that opens up my terminal and creates a tmux session for that worktree. when the feature is complete, i go back to conductor to fire off code review, making a PR, and merging it. i found conductor is really nice for organization and managing context.

i also really like the codex app, but the way they organize the worktrees is a bit confusing to me as worktrees are not default, you can make changes to the main repo and then have a worktree
in the terminal, i barely use my mouse and everything is driven by keyboard shortcuts. i have repetitive stress injury from working on the computer my whole life, so it becomes painful for me to use the mouse. i find myself clicking a lot with the mouse in the GUIs because i can't customize it or do exactly what i want as quickly.

The web views are a bit laggy when switching across different agents. It's not that fast. The one that I found is the most performant is actually the Codex app. as of writing this, i've tried letting GPT-5.4 xhigh, Opus 4.6, and

## the real point of the stack

a lot of people talk about AI coding like the magic is just picking one model and sending better prompts.

that is part of it, obviously.

but for me, the real leap happened when i stopped thinking in terms of one agent, one terminal, one task.

the whole game changed when i started treating AI coding more like parallel operations.

one session can be investigating a bug.
one session can be implementing a feature.
one session can be exploring the codebase.
one session can be fixing UI.

while all of that is happening, i still need to be able to move between sessions fast, keep context, review diffs, and not lose the plot.

that is what this stack is for.

## ghostty + tmux + workmux = the foundation

if this layer sucks, the whole workflow sucks.

### ghostty

ghostty is the terminal app i live in.

it is fast, clean, and does not make me feel like i am fighting my own terminal all day. that matters a lot when so much of this workflow is CLI-based.

### tmux

tmux is what lets me keep a stupid amount of work alive at once.

i do not want one fragile terminal tab to represent an entire stream of work. i want sessions i can keep around, jump between, and trust.

if you are only using one AI coding session at a time, i genuinely think you are leaving a lot on the table.

### workmux

workmux is a huge part of how i keep multiple tasks organized without everything collapsing into soup.

it helps turn parallel work into something deliberate instead of messy. that is the difference between "wow i have a lot of terminals open" and "i actually have a system here."

## the editors: zed and antigravity

### zed

zed is my main editor and basically my vscode replacement.

it is crazy fast, clean, and feels modern without a bunch of sluggish IDE energy. to me it feels like sublime text got a modern refresh and hit the gym.

using any editor is fine. zed is just the one that feels best to me when i am moving fast all day.

### antigravity

antigravity is really sick.

it feels especially good in the gemini ai pro world and is part of the broader way i work with agents beyond just a plain editor window. i do not think everyone needs it, but i think it fits really well into this style of workflow.

## the agents: claude code, codex, and gemini cli

these are the big three for me right now.

they are all good. they are not good at the exact same things.

that is why i like using them together instead of trying to force one tool to do everything.

### claude code

claude code is probably still my favorite overall.

it is insanely good for investigating bugs, understanding codebases, and planning work before i start touching stuff. when i need reasoning, diagnosis, or a better plan, claude is usually where i start.

### codex

codex is one of the best implementation-focused agents right now.

it is really good at doing work cleanly and not spraying tech debt everywhere. it definitely gets confused sometimes, but when the task is well-shaped, it can just go to work.

### gemini cli

gemini cli is especially strong for UI and UX work for me, and sometimes surprisingly good at bug hunting too.

it shines in different situations than claude and codex, which is exactly why i like having it in the mix.

## conductor and back2vibing = orchestration

this is where the whole thing starts feeling less like random tools and more like a real workflow.

### conductor

conductor makes gemini feel way stronger in practice.

the orchestration is excellent. honestly, i think it is the best orchestration layer out of the stuff i have used around claude, codex, and gemini so far.

### back2vibing

back2vibing is my own app for juggling a bunch of AI coding sessions at once.

it is built around exactly how i like to work, which is lots of parallel sessions instead of waiting around on one agent to finish cooking.

back2vibing is basically the embodiment of how i think AI coding should feel.

## the workflow layer: superpowers and god mode

this part matters more than people think.

the tools matter, but the way you use them matters just as much.

### superpowers

the superpowers skill setup helps make the workflow more disciplined and repeatable.

instead of every session being a random freestyle, there is more structure around planning, execution, debugging, verification, and branching work out properly.

that sounds boring, but it is actually what makes the whole thing scale.

### god mode

god mode is something i built because i wanted an even stronger way to drive this style of agentic workflow.

for me, it is part of a bigger idea: the future is not just one chat box. it is systems for coordinating multiple tools, multiple agents, and multiple streams of work in a way that still feels usable.

## why i use all of this together

the real point is not to have a giant stack for the sake of it.

the point is to remove waiting.
remove context loss.
remove terminal chaos.
remove the feeling that every task has to happen one at a time.

ghostty gives me the home base.
tmux and workmux keep sessions organized.
zed gives me a fast editor.
antigravity expands the environment.
claude code, codex, and gemini cli each give me different strengths.
conductor and back2vibing make orchestration way better.
superpowers and god mode make the workflow more intentional.

that is really the whole thing.

it is not about one magical tool.
it is about building an environment where the tools can compound.

## what i would tell most people

you do not need this entire stack on day one.

but i do think most people should think beyond "which model should i use?"

the better question is:

how do i build an environment where i can think clearly, run multiple threads of work, and keep momentum without everything turning into a mess?

that is the question that led me here.

the mac apps post is probably separate from this one, because that is a different conversation. this post is specifically about the agentic coding environment.

and if this style of workflow sounds interesting to you, check out [back2vibing](https://back2vibing.builtby.win/). a lot of how i work now came directly out of building it for myself.

- winston
