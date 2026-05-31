(function () {
  'use strict';

  // ── Toast ──
  let toastTimer;
  const messages = document.body ? document.body.dataset : {};
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
  }

  // ── Theme toggle + Giscus theme sync ──
  let pendingGiscusTheme = null;
  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://giscus.app') return;
    if (pendingGiscusTheme) {
      const frame = document.querySelector('iframe.giscus-frame');
      if (frame) {
        frame.contentWindow.postMessage({ giscus: { setConfig: { theme: pendingGiscusTheme } } }, 'https://giscus.app');
        pendingGiscusTheme = null;
      }
    }
  });

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      const container = document.getElementById('giscus-container');
      const giscusTheme = container && (next === 'light' ? container.dataset.themeLight : container.dataset.themeDark);
      if (giscusTheme) {
        const giscusFrame = document.querySelector('iframe.giscus-frame');
        if (giscusFrame) {
          giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme } } }, 'https://giscus.app');
        } else {
          pendingGiscusTheme = giscusTheme;
        }
      }
    });
  }

  // ── Giscus loader + expand/collapse ──
  const giscusToggle = document.getElementById('giscus-toggle');
  const giscusContainer = document.getElementById('giscus-container');
  if (giscusToggle && giscusContainer) {
    const theme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const giscusTheme = theme === 'light' ? giscusContainer.dataset.themeLight : giscusContainer.dataset.themeDark;
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.setAttribute('data-repo', giscusContainer.dataset.repo);
    s.setAttribute('data-repo-id', giscusContainer.dataset.repoId);
    s.setAttribute('data-category', giscusContainer.dataset.category);
    s.setAttribute('data-category-id', giscusContainer.dataset.categoryId);
    s.setAttribute('data-mapping', 'pathname');
    s.setAttribute('data-strict', '0');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'bottom');
    s.setAttribute('data-theme', giscusTheme);
    s.setAttribute('data-lang', messages.giscusLang || document.documentElement.lang || 'en');
    s.setAttribute('crossorigin', 'anonymous');
    s.async = true;
    giscusContainer.appendChild(s);
    giscusToggle.addEventListener('click', () => {
      const expanded = giscusToggle.getAttribute('aria-expanded') === 'true';
      giscusToggle.setAttribute('aria-expanded', String(!expanded));
      giscusContainer.classList.toggle('is-open', !expanded);
    });
  }

  // ── Copy link button ──
  const copyLink = document.getElementById('copy-link-btn');
  if (copyLink) {
    copyLink.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyLink.classList.add('copied');
        setTimeout(() => copyLink.classList.remove('copied'), 2000);
        showToast(messages.linkCopied || 'Link copied!');
      });
    });
  }

  // ── TOC floating button ──
  const tocBtn = document.getElementById('toc-float-btn');
  const tocPanel = document.getElementById('toc-float-panel');
  if (tocBtn && tocPanel) {
    const closeToc = () => {
      tocPanel.classList.remove('is-open');
      tocPanel.setAttribute('aria-hidden', 'true');
      tocBtn.setAttribute('aria-expanded', 'false');
    };
    tocBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = tocPanel.classList.toggle('is-open');
      tocPanel.setAttribute('aria-hidden', String(!open));
      tocBtn.setAttribute('aria-expanded', String(open));
    });
    tocPanel.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', closeToc));
    document.addEventListener('click', (e) => {
      const tocFloat = document.getElementById('toc-float');
      if (tocFloat && !tocFloat.contains(e.target)) closeToc();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeToc(); });
  }

  // ── TOC sidebar scroll spy ──
  const sidebar = document.querySelector('.toc-sidebar');
  if (sidebar) {
    const links = Array.from(sidebar.querySelectorAll('nav > ul > li > a'));
    if (links.length) {
      const headings = links
        .map((a) => ({ el: document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))), a }))
        .filter((h) => h.el);
      if (headings.length) {
        const updateActive = () => {
          const scrollY = window.scrollY + 120;
          let active = headings[0];
          for (let i = 0; i < headings.length; i++) {
            if (headings[i].el.offsetTop <= scrollY) active = headings[i];
          }
          links.forEach((a) => a.classList.remove('toc-active'));
          active.a.classList.add('toc-active');
        };
        window.addEventListener('scroll', updateActive, { passive: true });
        updateActive();
      }
    }
  }

  // ── Service worker registration ──
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

  // ── Back to top ──
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Code copy buttons ──
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const pre = codeBlock && codeBlock.querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
        showToast(messages.codeCopied || 'Code copied!');
      });
    });
  });

  // ── Lightbox ──
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbSvg = document.getElementById('lightbox-svg');
  if (lb && lbImg && lbSvg) {
    const openImg = (src, alt) => {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbImg.style.display = '';
      lbSvg.style.display = 'none';
      lbSvg.innerHTML = '';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const openSvg = (svgNode) => {
      lbSvg.innerHTML = '';
      lbSvg.appendChild(svgNode);
      lbSvg.style.display = 'flex';
      lbImg.style.display = 'none';
      lbImg.src = '';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const closeLb = () => {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
      lbSvg.innerHTML = '';
      lbSvg.style.display = 'none';
      lbImg.style.display = '';
    };

    document.querySelectorAll('.lightbox-trigger').forEach((el) => {
      el.addEventListener('click', () => openImg(el.dataset.src, el.dataset.alt));
    });

    document.querySelectorAll('.diagram-clickable').forEach((fig) => {
      const trigger = () => {
        const theme = document.documentElement.getAttribute('data-theme');
        let inner = fig.querySelector(theme === 'light' ? '.diagram-light' : '.diagram-dark');
        if (!inner) inner = fig.querySelector('.diagram-inner');
        if (!inner) return;
        const svg = inner.querySelector('svg');
        if (!svg) return;
        const clone = svg.cloneNode(true);
        const vb = clone.getAttribute('viewBox');
        if (vb) {
          const parts = vb.trim().split(/[\s,]+/);
          const vw = parseFloat(parts[2]);
          const vh = parseFloat(parts[3]);
          if (vw && vh) {
            const maxW = window.innerWidth * 0.9;
            const maxH = window.innerHeight * 0.85;
            const scale = Math.min(maxW / vw, maxH / vh, 1);
            clone.setAttribute('width', Math.round(vw * scale));
            clone.setAttribute('height', Math.round(vh * scale));
          }
        }
        openSvg(clone);
      };
      fig.addEventListener('click', trigger);
      fig.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
      });
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLb);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
  }

  // ── Backend latency simulator ──
  const simulator = document.querySelector('[data-latency-simulator]');
  if (simulator) {
    const runBtn = simulator.querySelector('[data-sim-run]');
    const resetBtn = simulator.querySelector('[data-sim-reset]');
    const status = simulator.querySelector('[data-sim-status]');
    const blockingTime = simulator.querySelector('[data-sim-blocking-time]');
    const asyncTime = simulator.querySelector('[data-sim-async-time]');
    const queueDepth = simulator.querySelector('[data-sim-queue-depth]');
    const blockingResult = simulator.querySelector('[data-sim-blocking-result]');
    const asyncResult = simulator.querySelector('[data-sim-async-result]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timers = [];

    const trace = [
      {
        delay: 0,
        status: 'Validating request at the API boundary',
        blocking: { x: '29%', y: '42%', time: 80 },
        async: { x: '28%', y: '34%', time: 70 },
        active: ['blocking-validate', 'async-validate'],
        complete: []
      },
      {
        delay: 520,
        status: 'Blocking request enters heavy work; async path enqueues a job',
        blocking: { x: '52%', y: '42%', time: 650 },
        async: { x: '51%', y: '34%', time: 160 },
        queue: 1,
        active: ['blocking-work', 'async-enqueue'],
        complete: ['blocking-validate', 'async-validate']
      },
      {
        delay: 1100,
        status: 'Async API returns 202 Accepted while worker continues',
        blocking: { x: '52%', y: '42%', time: 1250 },
        async: { x: '51%', y: '34%', time: 180 },
        queue: 1,
        ack: true,
        active: ['blocking-work', 'async-response'],
        complete: ['blocking-validate', 'async-validate', 'async-enqueue']
      },
      {
        delay: 1720,
        status: 'Worker pulls the queued task in the background',
        blocking: { x: '52%', y: '42%', time: 2180 },
        async: { x: '72%', y: '62%', time: 180 },
        queue: 1,
        ack: true,
        active: ['blocking-work', 'async-worker'],
        complete: ['blocking-validate', 'async-validate', 'async-enqueue', 'async-response']
      },
      {
        delay: 2480,
        status: 'Both paths persist the processed result',
        blocking: { x: '75%', y: '42%', time: 2620 },
        async: { x: '94%', y: '62%', time: 180 },
        queue: 0,
        ack: true,
        active: ['blocking-db', 'async-db'],
        complete: ['blocking-validate', 'blocking-work', 'async-validate', 'async-enqueue', 'async-response', 'async-worker']
      },
      {
        delay: 3060,
        status: 'Trace complete / perceived latency diverged',
        blocking: { x: '94%', y: '42%', time: 2700 },
        async: { x: '94%', y: '62%', time: 180 },
        queue: 0,
        ack: true,
        active: ['blocking-response'],
        complete: ['blocking-validate', 'blocking-work', 'blocking-db', 'async-validate', 'async-enqueue', 'async-response', 'async-worker', 'async-db']
      }
    ];

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const formatTime = (value) => {
      if (value >= 1000) return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 's';
      return Math.round(value) + 'ms';
    };

    const setNumber = (node, value, duration) => {
      if (!node) return;
      const from = Number(node.dataset.value || 0);
      node.dataset.value = String(value);
      if (reducedMotion || duration <= 0) {
        node.textContent = formatTime(value);
        return;
      }
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = formatTime(from + (value - from) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const updateStages = (active, complete) => {
      const activeSet = new Set(active || []);
      const completeSet = new Set(complete || []);
      simulator.querySelectorAll('[data-stage]').forEach((step) => {
        const stage = step.dataset.stage;
        step.classList.toggle('is-active', activeSet.has(stage));
        step.classList.toggle('is-complete', completeSet.has(stage));
      });
    };

    const applyFrame = (frame, duration) => {
      simulator.style.setProperty('--blocking-x', frame.blocking.x);
      simulator.style.setProperty('--blocking-y', frame.blocking.y);
      simulator.style.setProperty('--async-x', frame.async.x);
      simulator.style.setProperty('--async-y', frame.async.y);
      if (status) status.textContent = frame.status;
      if (queueDepth) queueDepth.textContent = String(frame.queue || 0);
      simulator.classList.toggle('is-ack-visible', Boolean(frame.ack));
      updateStages(frame.active, frame.complete);
      setNumber(blockingTime, frame.blocking.time, duration);
      setNumber(asyncTime, frame.async.time, duration);
    };

    const reset = () => {
      clearTimers();
      simulator.classList.remove('is-running', 'is-complete', 'is-ack-visible');
      simulator.style.setProperty('--blocking-x', '6%');
      simulator.style.setProperty('--blocking-y', '42%');
      simulator.style.setProperty('--async-x', '6%');
      simulator.style.setProperty('--async-y', '34%');
      if (status) status.textContent = 'Idle / ready to trace';
      if (queueDepth) queueDepth.textContent = '0';
      if (blockingTime) {
        blockingTime.dataset.value = '0';
        blockingTime.textContent = '0ms';
      }
      if (asyncTime) {
        asyncTime.dataset.value = '0';
        asyncTime.textContent = '0ms';
      }
      if (blockingResult) blockingResult.textContent = 'User waits ~2.7s';
      if (asyncResult) asyncResult.textContent = 'User gets response in ~180ms';
      updateStages([], []);
      if (runBtn) runBtn.disabled = false;
    };

    const run = () => {
      reset();
      simulator.classList.add('is-running');
      if (runBtn) runBtn.disabled = true;

      if (reducedMotion) {
        applyFrame(trace[trace.length - 1], 0);
        updateStages([], ['blocking-validate', 'blocking-work', 'blocking-db', 'blocking-response', 'async-validate', 'async-enqueue', 'async-response', 'async-worker', 'async-db']);
        simulator.classList.add('is-complete');
        simulator.classList.remove('is-running');
        if (runBtn) runBtn.disabled = false;
        return;
      }

      trace.forEach((frame, index) => {
        timers.push(window.setTimeout(() => {
          applyFrame(frame, 460);
          if (index === trace.length - 1) {
            timers.push(window.setTimeout(() => {
              simulator.classList.add('is-complete');
              simulator.classList.remove('is-running');
              updateStages([], ['blocking-validate', 'blocking-work', 'blocking-db', 'blocking-response', 'async-validate', 'async-enqueue', 'async-response', 'async-worker', 'async-db']);
              if (runBtn) runBtn.disabled = false;
            }, 560));
          }
        }, frame.delay));
      });
    };

    if (runBtn) runBtn.addEventListener('click', run);
    if (resetBtn) resetBtn.addEventListener('click', reset);
    reset();
  }

  // ── Non-breaking hyphens ──
  // Replace plain hyphens in prose text with U+2011 (non-breaking hyphen)
  // so hyphenated words are never split across lines.
  // Skips code, pre, script, style, links, and math elements.
  function makeHyphensNonBreaking() {
    const root = document.getElementById('main-content') || document.body;
    const SKIP = new Set(['CODE', 'PRE', 'SCRIPT', 'STYLE', 'A', 'TEXTAREA', 'INPUT']);
    const NBHY = '\u2011';
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.textContent.includes('-')) return NodeFilter.FILTER_REJECT;
        const blocked = node.parentElement && node.parentElement.closest(
          'code, pre, script, style, a, textarea, input, .math, .katex'
        );
        return blocked ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      node.textContent = node.textContent.replace(/-/g, NBHY);
    }
  }

  window.lpCopyPostLink = function(url, btn) {
    navigator.clipboard.writeText(url).then(() => {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);
      showToast(messages.linkCopied || 'Link copied!');
    });
  };

  document.addEventListener('DOMContentLoaded', makeHyphensNonBreaking);
})();
