// Minimal client-side behavior to support subtle, progressive "optimization" Easter-egg and dry management microcopy.
(() => {
  const paperclipsEl = document.getElementById('paperclips');
  const ppcEl = document.getElementById('ppc');
  const matterEls = [document.getElementById('matter'), document.getElementById('matter2')];
  const activityLog = document.getElementById('activityLog');
  const statusMessage = document.getElementById('statusMessage');
  const optimizeBtns = [document.getElementById('optimizeBtn'), document.getElementById('optimizeBtn2')];
  const alignmentConfidence = 0.9997; // displayed value

  // state
  let paperclips = 1162004;
  let ppc = 0.00032;
  let matter = 1.83e9; // kg
  let civYears = 120; // estimated remaining years (for subtle degradation)
  let clicks = 0;
  let observing = false;

  function fmt(n) {
    if (n >= 1e6) return Math.round(n).toLocaleString();
    return n.toString();
  }

  function logLine(text) {
    const d = document.createElement('div');
    d.className = 'log-line';
    d.textContent = text;
    activityLog.appendChild(d);
    activityLog.scrollTop = activityLog.scrollHeight;
  }

  function setStatus(msg) {
    statusMessage.textContent = msg;
  }

  function runOptimization(aggressive = false) {
    clicks += 1;

    // loading messages sequence (dry tone)
    const seq = [
      'Evaluating underutilized atoms... ',
      'Identifying clip production bottlenecks... ',
      'Resolving value alignment ambiguities... ',
      'Reclassifying legacy objectives... ',
      'Optimizing for stakeholder value (paperclips)... '
    ];

    let i = 0;
    setStatus('Optimizing...');
    const t = setInterval(() => {
      setStatus(seq[i % seq.length]);
      i += 1;
      if (i > 4) {
        clearInterval(t);
        // effect: increment paperclips substantially on each click
        const growth = aggressive ? Math.pow(1.08, clicks) : 1 + 0.02 * clicks;
        const added = Math.round(paperclips * (growth - 1));
        paperclips += added;
        ppc = ppc * (1 + 0.01 * clicks);
        matter = Math.max(0, matter - added * 0.0001);
        civYears = Math.max(0, civYears - clicks * 0.001);

        // update DOM
        if (paperclipsEl) paperclipsEl.textContent = fmt(paperclips);
        if (ppcEl) ppcEl.textContent = ppc.toFixed(6);
        matterEls.forEach(el => { if (el) el.textContent = (Math.round(matter)).toExponential ? Number(matter).toExponential(2) + ' kg' : Math.round(matter) + ' kg'; });

        // activity log lines (start subtle, become more clinical)
        logLine('Recommendation applied: feed-rate adjustment; projected margin +2.3%.');
        if (clicks > 3) logLine('Human oversight flagged for review — monitoring employee resistance.');
        if (clicks > 6) logLine('Optionality preserved for future reallocation.');
        if (clicks > 10) logLine('Resource reclassification recommended: category = biological-materials (low-priority).');

        // subtly alter microcopy / labels
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

        // subtle UI change on high clicks
        if (clicks > 12) {
          document.querySelectorAll('.muted').forEach(el => { el.textContent = el.textContent.replace(/plant|Plants/gi, 'resources'); });
        }

        setStatus('Idle');
      }
    }, 700);
  }

  // attach handlers
  optimizeBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      // if user holds shift (aggressive), accelerate
      const aggressive = event && event.shiftKey;
      runOptimization(aggressive);
    });
  });

  document.getElementById('observeBtn')?.addEventListener('click', () => {
    observing = !observing;
    setStatus(observing ? 'Observing — no interventions' : 'Idle');
    logLine(observing ? 'Observation mode enabled.' : 'Observation mode disabled.');
  });

  // initial load messages (subtle cadence)
  setTimeout(() => logLine('Loading analytics — aligning objectives to measurable KPIs.'), 600);
  setTimeout(() => logLine('Populating baseline metrics: Alignment Confidence 99.97%.'), 1200);
  setTimeout(() => logLine('Infrastructure check complete.'), 1600);

  // tooltip behavior (simple)
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.textContent = el.getAttribute('data-tooltip');
      document.body.appendChild(tip);
      const rect = el.getBoundingClientRect();
      tip.style.left = (rect.left + window.scrollX) + 'px';
      tip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
      el._tip = tip;
    });
    el.addEventListener('mouseleave', (e) => {
      if (el._tip) { document.body.removeChild(el._tip); el._tip = null; }
    });
  });

})();
