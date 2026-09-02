---
title: "What AI Cannot Change About Software Engineering — A Rant About the AI Productivity Paradox"
date: "2026-08-12"
summary: "How Amdahl's Law, compounding architectural drift, and human coordination put a hard mathematical ceiling on AI-driven developer throughput."
tags: ["AI", "Productivity", "Amdahl's Law", "Software Engineering"]
---

## Introduction

We live in the era of "vibecoding."

With the explosion of generative AI models, we are repeatedly told that software development is about to become 10x, 100x, or even infinitely faster. You prompt, the model writes the code, and boom—your application is supposedly running.

But if you work in professional software engineering, you have probably noticed a frustrating contradiction: despite having powerful AI assistance on our desktops every day, our projects still take months, meetings are still endless, and software releases do not happen overnight.

This is the **AI Productivity Paradox**. To understand why AI cannot simply "solve" software delivery timelines, we have to look at a fundamental rule of system architecture: **Amdahl's Law**.

---

## Amdahl's Law & The Hard Ceiling

Originally formulated by computer architect Gene Amdahl in 1967, Amdahl's Law explains the theoretical speedup of an entire task when only a portion of it is improved or parallelized.

> **Amdahl's Law**: A mathematical model used to find the maximum theoretical improvement of an entire system when only a part of it is accelerated. In parallel computing, it predicts the theoretical speedup when adding processors.

The speedup formula is:

$$\text{Speedup} = \frac{1}{(1 - P) + \frac{P}{S}}$$

Where:
- **P** is the parallelizable (speedable) portion of the work (as a fraction).
- **S** is the speedup factor applied to that portion.
- **1 - P** is the sequential portion that stays fixed and remains bound by human coordination, review, and verification.

Let's break down a typical software engineering task:
* **40% of the work ($P = 0.4$)**: Individual, deep-focus work—writing pure code, crafting tests, implementing local components. This is the portion that AI can speed up significantly—let's say by 10x ($S = 10$).
* **60% of the work ($1 - P = 0.6$)**: Inherently sequential and dependent on other humans—reading existing code, asking teammates about legacy behavior, waiting for code reviews, aligning requirements with PMs or UX designers, complying with security guidelines, and deploying/validating.

Plugging these realistic numbers into Amdahl's Law gives us:

$$\text{Speedup} = \frac{1}{0.60 + \frac{0.40}{10}} = \frac{1}{0.60 + 0.04} = \frac{1}{0.64} \approx 1.56\text{x}$$

Even though AI made your individual coding **10x faster**, your overall engineering throughput only improved by approximately **56%**. The 60% of the work that involves human-to-human communication, coordination, and verification dominates the entire process and caps the benefit you can extract.

Even if AI made your individual coding *infinitely* fast ($S \to \infty$), your theoretical maximum speedup would still be strictly bounded:

$$\text{Speedup} = \frac{1}{1 - P} = \frac{1}{0.60} \approx 1.67\text{x}$$

That is the hard ceiling Amdahl's Law puts on this scenario. If we want to move faster, accelerating the individual portion yields diminishing returns. What we actually need to do is reduce the sequential, human-dependent overhead.

This concept isn't just theory; it is a reality felt across the software industry. For a deeper dive into how this plays out in modern software teams, check out Atlassian's write-up: [How Amdahl’s Law still applies to modern-day AI inefficiencies](https://www.atlassian.com/blog/ai-at-work/how-amdahls-law-still-applies-to-modern-day-ai-inefficiencies).

---

## Theoretical Throughput Limits Across Scenarios

To visualize how Amdahl's Law constrains AI velocity across different team dynamics:

| Parallelizable Work ($P$) | AI Speedup ($S$) | Overall Throughput | Theoretical Ceiling ($S \to \infty$) |
| :--- | :--- | :--- | :--- |
| **20%** (Heavy legacy/coordination) | 10x | **1.22x** (+22%) | **1.25x** |
| **40%** (Typical engineering team) | 5x | **1.47x** (+47%) | **1.67x** |
| **40%** (Typical engineering team) | 10x | **1.56x** (+56%) | **1.67x** |
| **40%** (Typical engineering team) | 50x | **1.64x** (+64%) | **1.67x** |
| **70%** (Solo prototype / greenfield) | 10x | **2.70x** (+170%) | **3.33x** |

Notice that going from a 10x AI speedup to a 50x speedup in a typical engineering team only inches overall throughput from **1.56x** to **1.64x**. The sequential human loop is the immovable anchor.

---

## Why We Need a Human in the Loop (And Why We Can't Parallelize Everything)

If you are someone who has played with AI coding tools, or attempted to "one-shot" or vibecode an entire application from scratch without human intervention, you’ve probably noticed that 99% of the time, the result isn't quite right. It needs a human to steer, adapt, and bring **taste** to make the software actually usable.

Let me share a recent experiment that illustrated this beautifully.

During this wicked job market, I decided to use an LLM to analyze job descriptions and dynamically adapt my resume to highlight matching skills. I spent a lot of time setting up prompt templates, orchestration scripts, and compiler commands (such as automatically compiling the LaTeX `.tex` resume into a PDF and moving it to a specific directory).

For the first five job applications, the setup worked brilliantly. But by the sixth iteration, I noticed a dramatic shift: the generated resume content no longer reflected my actual experience!

Because my initial script recursively fed the *previous* run’s output back into the model for the next adaptation, a slight hallucinatory drift began compounding. By iteration 6, the resume was entirely off-track.

I solved this by making my original `.tex` resume read-only and writing a shell script to copy it to `temp.tex` for the AI to modify, discarding `temp.tex` after each run.

But think about a huge codebase: you can't make files read-only because they are meant to be modified, extended, and refactored. What happens to a codebase when an AI recursively modifies it over and over without a human closely checking, reviewing, and verifying its outputs? You get compounding architectural drift, technical debt, and eventual total system collapse.

This experiment made me realize that the "40% of the work" that belongs to you still requires deep engineering thinking and taste. You must act as the cohesive force that steers the AI in the right direction.

---

## Why I Am Not an AI Hater

Even though AI has arguably made the job search and market much noisier, I still believe it is one of the greatest achievements of the human race.

The fact that we can ask an LLM anything and have it explain a highly complex system architecture, an obscure compiler flag, or a nuanced race condition is something we easily overlook. Just three years ago, this level of instantaneous, tailored explanation wasn't possible; you had to spend hours digged in textbooks, outdated Stack Overflow threads, or wait for someone to reply on a forum.

AI is an incredibly powerful force multiplier. But as long as software engineering is a social discipline—one that requires aligning human intent, business goals, and system realities—Amdahl's Law will continue to govern our overall speed.

The real solution to the developer productivity bottleneck isn't just a better LLM. It's building better human collaboration, simpler system architectures, and faster, tighter validation loops.
