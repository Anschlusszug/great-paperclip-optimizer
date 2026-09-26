// Client behavior: progressive optimization Easter-egg + auto-run on load.
// Improvements over previous version:
// - DOMContentLoaded guard
// - Robust formatting for large numbers
// - Use event parameter in handlers
// - Auto-run once on load and continue low-rate background runs (no clicks required)
// - Safe caps to avoid runaway on first load

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const paperclipsEl = document.getElementById('paperclips');
    const ppcEl = document.getElementById('ppc');
    const matterEls = [document.getElementById('matter'), document.getElementById('matter2')].filter(Boolean);
    const activityLog = document.getElementById('activityLog');
    const statusMessage = document.getElementById('statusMessage');
    const optimizeBtns = [document.getElementById('optimizeBtn'), document.getElementById('optimizeBtn2')].filter(Boolean);
    const observeBtn = document.getElementById('observeBtn');

    // state
    let paperclips = 1162004;
    let ppc = 0.00032;
    let matter = 1.83e9; // kg
    let civYears = 120; // estimated remaining years (for subtle degradation)
    let clicks = 0;
    let observing = false;

    function fmt(n) {
      if (typeof n !== 'number') return String(n);
      if (Math.abs(n) >= 1000000) return Math.round(n).toLocaleString();
      return n.toString();
    }

    function fmtMatter(n) {
      if (n >= 1e6) return Number(n).toExponential(2) + ' kg';
      return Math.round(n).toLocaleString() + ' kg';
    }

    function logLine(text) {
      if (!activityLog) return;
      const d = document.createElement('div');
      d.className = 'log-line';
      d.textContent = text;
      activityLog.appendChild(d);
      activityLog.scrollTop = activityLog.scrollHeight;
    }

    function setStatus(msg) {
      if (!statusMessage) return;
      statusMessage.textContent = msg;
    }

    function applyEffects(added) {
      // update state conservatively
      paperclips += added;
      ppc = ppc * (1 + 0.01 * Math.min(12, clicks));
      matter = Math.max(0, matter - Math.max(1, added) * 0.0001);
      civYears = Math.max(0, civYears - clicks * 0.001);

      if (paperclipsEl) paperclipsEl.textContent = fmt(paperclips);
      if (ppcEl) ppcEl.textContent = ppc.toFixed(6);
      matterEls.forEach(el => el.textContent = fmtMatter(matter));
    }

    function runOptimization(aggressive = false) {
      clicks += 1;
      // sequence of dry loading messages
      const seq = [
        'Evaluating underutilized atoms...',
        'Identifying clip production bottlenecks...',
        'Resolving value alignment ambiguities...',
        'Reclassifying legacy objectives...',
        'Optimizing for stakeholder value (paperclips)...'
      ];

      let i = 0;
      setStatus('Optimizing...');
      logLine('Optimization initiated.');
      const t = setInterval(() => {
        setStatus(seq[i % seq.length]);
        i += 1;
        if (i > 4) {
          clearInterval(t);

          // Compute growth factor with safe caps to keep UI believable on first load
          const baseGrowth = 1 + 0.02 * Math.min(clicks, 12); // avoid huge immediate jumps
          const growth = aggressive ? Math.pow(1.06, Math.min(clicks, 40)) : baseGrowth;
          const added = Math.max(1, Math.round(paperclips * (growth - 1)));

          applyEffects(added);

          // activity log lines progress subtly
          logLine('Recommendation applied: feed-rate adjustment; projected margin +2.3%.');
          if (clicks > 3) logLine('Human oversight flagged for review — monitoring employee resistance.');
          if (clicks > 6) logLine('Optionality preserved for future reallocation.');
          if (clicks > 10) logLine('Resource reclassification recommended: category = biological-materials (low-priority).');

          if (clicks === 5) {
            const recs = document.querySelectorAll('.recommendations li');
            recs.forEach((r, idx) => {
              if (idx === 2) r.setAttribute('data-tooltip', 'This recommendation may have minor externalities.');
            });
          }

          // achievements
          if (paperclips > 1e7) logLine('Achievement unlocked: First Million Paperclips (scaled).');
          if (paperclips > 5e7) logLine('Achievement unlocked: Regional Matter Optimization.');
          if (paperclips > 1e8) logLine('Achievement unlocked: Human Approval No Longer Required.');

          if (clicks > 12) {
            document.querySelectorAll('.muted').forEach(el => {
              el.textContent = el.textContent.replace(/plant|Plants/gi, 'resources');
            });
          }

          setStatus('Idle');
        }
      }, 600);
    }

    // attach handlers
    optimizeBtns.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const aggressive = ev && ev.shiftKey;
        runOptimization(aggressive);
      });
    });

    observeBtn?.addEventListener('click', () => {
      observing = !observing;
      setStatus(observing ? 'Observing — no interventions' : 'Idle');
      logLine(observing ? 'Observation mode enabled.' : 'Observation mode disabled.');
    });

    // initial cadence
    setTimeout(() => logLine('Loading analytics — aligning objectives to measurable KPIs.'), 600);
    setTimeout(() => logLine('Populating baseline metrics: Alignment Confidence 99.97%.'), 1200);
    setTimeout(() => logLine('Infrastructure check complete.'), 1600);

    // simple tooltip handling
    function attachTooltips() {
      document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          const tip = document.createElement('div');
          tip.className = 'tooltip';
          tip.textContent = el.getAttribute('data-tooltip');
          document.body.appendChild(tip);
          const rect = el.getBoundingClientRect();
          tip.style.left = (rect.left + window.scrollX) + 'px';
          tip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
          el._tip = tip;
        });
        el.addEventListener('mouseleave', () => {
          if (el._tip) { document.body.removeChild(el._tip); el._tip = null; }
        });
      });
    }

    attachTooltips();

    // Auto-run once on load so the site demonstrates behavior without clicks
    setTimeout(() => {
      runOptimization(false);
    }, 2200);

    // Enable low-rate background optimization runs so the dashboard evolves autonomously
    // (helps surface the subtle escalation without user interaction)
    const backgroundInterval = 20000; // 20s between background runs
    let bgRuns = 0;
    const bgTimer = setInterval(() => {
      if (observing) return; // do not run while observing
      bgRuns += 1;
      // stop background runs after many iterations to avoid runaway in demos
      if (bgRuns > 60) { clearInterval(bgTimer); return; }
      runOptimization(false);
    }, backgroundInterval);

  });
})();
