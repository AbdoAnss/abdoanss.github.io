---
title: "What AI Cannot Change About Software Engineering — A Rant About the AI Productivity Paradox"
subtitle: "How Amdahl's Law and human factors put a hard ceiling on AI-driven developer productivity."
date: 2026-08-12
tags: ["AI", "Productivity", "Amdahl's Law", "Software Engineering"]
math: true
---

{{< section-label >}}Introduction{{< /section-label >}}

## Introduction

We live in the era of "vibecoding."

With the explosion of generative AI models, we are told that software development is about to become 10x, 100x, or even infinitely faster. You prompt, the AI writes the code, and boom—your application is running.

But if you work in professional software engineering, you’ve probably noticed a frustrating contradiction: despite having powerful AI assistance on our desktops every day, our projects still take months, meetings are still endless, and software releases don't happen overnight.

This is the **AI Productivity Paradox**. To understand why AI cannot simply "solve" software delivery timelines, we have to look at a fundamental rule of system architecture: **Amdahl's Law**.

---

{{< section-label >}}Amdahl's Law{{< /section-label >}}

## Amdahl's Law & The Hard Ceiling

Originally formulated by computer architect Gene Amdahl in 1967, Amdahl's Law explains the theoretical speedup of a task when only a portion of it is improved or parallelized.

{{< definition term="Amdahl's Law" icon="📈" >}}
A model used to find the maximum theoretical improvement of an entire system when only a part of it is improved. In parallel computing, it predicts the theoretical speedup when using multiple processors.
{{< /definition >}}

{{< callout type="info" title="Amdahl's Law Formula" >}}
$$Speedup = \frac{1}{(1 - P) + \frac{P}{S}}$$

Where:
- **P** is the parallelizable (speedable) portion of the work (as a fraction).
- **S** is the speedup factor applied to that portion.
- **1 - P** is the sequential portion that stays fixed.
{{< /callout >}}

Let’s break down a typical software engineering task:
* **40% of the work** is individual, deep-focus work ($P = 0.4$): writing pure code, crafting tests, designing local components. This is the portion that AI can speed up significantly—let’s say by 10x ($S = 10$).
* **60% of the work** is inherently sequential and dependent on other humans ($1 - P = 0.6$): reading existing code, asking teammates about legacy behavior, waiting for code reviews, discussing requirements with PMs or UX designers, aligning with security/compliance, and deploying/validating.

Plugging these numbers into Amdahl's Law gives us:

$$Speedup = \frac{1}{0.60 + \frac{0.40}{10}} = \frac{1}{0.60 + 0.04} = \frac{1}{0.64} \approx 1.56x$$

Even though AI made your individual coding **10x faster**, your overall throughput only improved by about **56%**. The 60% of the work that involves human-to-human communication, coordination, and validation dominates the entire process and caps the benefit you can extract.

Even if AI made your individual coding *infinitely* fast ($S \to \infty$), your theoretical maximum speedup would still be:

$$Speedup = \frac{1}{1 - P} = \frac{1}{0.60} \approx 1.67x$$

That is the hard ceiling Amdahl’s Law puts on this scenario. If we want to move faster, making the individual work faster yields diminishing returns. What we actually need to do is reduce the sequential, human-dependent overhead.

This concept isn't just theory; it is a reality felt across the industry. For a deeper dive into how this plays out in modern software teams, check out Atlassian's excellent write-up: [How Amdahl’s Law still applies to modern-day AI inefficiencies](https://www.atlassian.com/blog/ai-at-work/how-amdahls-law-still-applies-to-modern-day-ai-inefficiencies).

---

{{< section-label >}}Interactive Simulation{{< /section-label >}}

## Interactive Calculator: Amdahl's Law in Action

Use the interactive calculator below to adjust the parameters. See how changing the parallelizable fraction ($P$) and the AI speedup factor ($S$) affects your theoretical overall throughput and caps your speedup.

<style>
  .amdahl-container {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .amdahl-slider-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .amdahl-slider-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .amdahl-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-mid);
    font-family: var(--font-sans);
  }
  .amdahl-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    font-family: var(--font-mono);
  }
  .amdahl-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    background: var(--border);
    outline: none;
    margin: 8px 0;
  }
  .amdahl-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }
  .amdahl-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }
  .amdahl-help {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 2px;
  }
  .amdahl-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 4px;
  }
  .amdahl-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .amdahl-card-title {
    font-size: 13px;
    color: var(--text-dim);
    font-family: var(--font-sans);
  }
  .amdahl-card-value {
    font-size: 24px;
    font-weight: 600;
    color: var(--text);
    font-family: var(--font-mono);
  }
  .amdahl-chart-container {
    position: relative;
    height: 220px;
    margin-top: 8px;
  }
</style>

<div class="amdahl-container">
  <div class="amdahl-slider-group">
    <div class="amdahl-slider-label-row">
      <span class="amdahl-label">Parallelizable / speedable work (P)</span>
      <span class="amdahl-value" id="p-out">40%</span>
    </div>
    <input type="range" min="1" max="99" value="40" step="1" id="p-slider" class="amdahl-slider" />
    <div class="amdahl-help">e.g. solo coding time you can hand to AI</div>
  </div>

  <div class="amdahl-slider-group">
    <div class="amdahl-slider-label-row">
      <span class="amdahl-label">AI speedup on that portion (S)</span>
      <span class="amdahl-value" id="s-out">10x</span>
    </div>
    <input type="range" min="1" max="50" value="10" step="1" id="s-slider" class="amdahl-slider" />
    <div class="amdahl-help">how much faster AI makes that portion</div>
  </div>

  <div class="amdahl-results">
    <div class="amdahl-card">
      <span class="amdahl-card-title">Overall speedup</span>
      <span class="amdahl-card-value" id="speedup-out">1.56x</span>
    </div>
    <div class="amdahl-card">
      <span class="amdahl-card-title">Ceiling as S → ∞</span>
      <span class="amdahl-card-value" id="ceiling-out">1.67x</span>
    </div>
  </div>

  <div class="amdahl-chart-container">
    <canvas id="chart"></canvas>
  </div>
  <div class="amdahl-help" style="text-align: center; margin-top: -8px;">Overall speedup as AI speedup (S) increases, at the current P</div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<script>
(function() {
  const pSlider = document.getElementById('p-slider');
  const sSlider = document.getElementById('s-slider');
  const pOut = document.getElementById('p-out');
  const sOut = document.getElementById('s-out');
  const speedupOut = document.getElementById('speedup-out');
  const ceilingOut = document.getElementById('ceiling-out');

  function computeSpeedup(P, S) {
    return 1 / ((1 - P) + P / S);
  }

  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Fallback values matching custom abdoanss theme
    const fallbackAccent = isDark ? '#6ee7d8' : '#0f766e';
    const fallbackAccentDim = isDark ? 'rgba(110, 231, 216, 0.12)' : 'rgba(15, 118, 110, 0.09)';
    const fallbackTextDim = isDark ? '#94a3b8' : '#667269';
    const fallbackGridLine = isDark ? 'rgba(110, 231, 216, 0.05)' : 'rgba(17, 76, 255, 0.03)';
    
    return {
      accent: style.getPropertyValue('--accent').trim() || fallbackAccent,
      accentDim: style.getPropertyValue('--accent-dim').trim() || fallbackAccentDim,
      textDim: style.getPropertyValue('--text-dim').trim() || fallbackTextDim,
      gridLine: style.getPropertyValue('--grid-line').trim() || fallbackGridLine
    };
  }

  let chart;

  function update() {
    const P = parseInt(pSlider.value, 10) / 100;
    const S = parseInt(sSlider.value, 10);

    pOut.textContent = Math.round(P * 100) + '%';
    sOut.textContent = S + 'x';

    const speedup = computeSpeedup(P, S);
    const ceiling = 1 / (1 - P);

    speedupOut.textContent = speedup.toFixed(2) + 'x';
    ceilingOut.textContent = ceiling.toFixed(2) + 'x';

    const labels = [];
    const data = [];
    for (let s = 1; s <= 50; s++) {
      labels.push(s);
      data.push(computeSpeedup(P, s));
    }

    const colors = getThemeColors();

    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.data.datasets[0].borderColor = colors.accent;
      chart.data.datasets[0].backgroundColor = colors.accentDim;
      chart.options.scales.x.title.color = colors.textDim;
      chart.options.scales.x.ticks.color = colors.textDim;
      chart.options.scales.x.grid.color = colors.gridLine;
      chart.options.scales.y.title.color = colors.textDim;
      chart.options.scales.y.ticks.color = colors.textDim;
      chart.options.scales.y.grid.color = colors.gridLine;
      chart.options.scales.y.max = Math.min(ceiling * 1.15, 10);
      chart.update('none');
    } else {
      const ctx = document.getElementById('chart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            borderColor: colors.accent,
            backgroundColor: colors.accentDim,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              title: { display: true, text: 'AI speedup applied to parallelizable work (S)', color: colors.textDim, font: { size: 11, family: 'Bricolage Grotesque, sans-serif' } },
              ticks: { color: colors.textDim, font: { size: 11, family: 'DM Mono, monospace' }, maxTicksLimit: 6 },
              grid: { color: colors.gridLine }
            },
            y: {
              min: 1,
              max: Math.min(ceiling * 1.15, 10),
              title: { display: true, text: 'Overall speedup', color: colors.textDim, font: { size: 11, family: 'Bricolage Grotesque, sans-serif' } },
              ticks: { color: colors.textDim, font: { size: 11, family: 'DM Mono, monospace' } },
              grid: { color: colors.gridLine }
            }
          }
        }
      });
    }
  }

  pSlider.addEventListener('input', update);
  sSlider.addEventListener('input', update);
  
  // Update colors on dark/light theme switch
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  update();
})();
</script>

---

{{< section-label >}}Human in the Loop{{< /section-label >}}

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

{{< section-label >}}Perspective{{< /section-label >}}

## Why I Am Not an AI Hater

Even though AI has arguably made the job search and market much noisier, I still believe it is one of the greatest achievements of the human race.

The fact that we can ask an LLM anything and have it explain a highly complex system architecture, an obscure compiler flag, or a nuanced race condition is something we easily overlook. Just three years ago, this level of instantaneous, tailored explanation wasn't possible; you had to spend hours digged in textbooks, outdated Stack Overflow threads, or wait for someone to reply on a forum.

AI is an incredibly powerful force multiplier. But as long as software engineering is a social discipline—one that requires aligning human intent, business goals, and system realities—Amdahl's Law will continue to govern our overall speed.

The real solution to the developer productivity bottleneck isn't just a better LLM. It's building better human collaboration, simpler system architectures, and faster, tighter validation loops.
