document.addEventListener('DOMContentLoaded', () => {
  const paperclipsEl = document.getElementById('paperclips');
  const ppcEl = document.getElementById('ppc');
  const matterEls = [document.getElementById('matter'), document.getElementById('matter2')].filter(Boolean);
  const activityLog = document.getElementById('activityLog');
  const statusMessage = document.getElementById('statusMessage');
  const optimizeButtons = [document.getElementById('optimizeBtn'), document.getElementById('optimizeBtn2')].filter(Boolean);
  const observeButton = document.getElementById('observeBtn');
  const footerText = document.getElementById('footerText');
  const kpiTableBody = document.querySelector('#kpiTable tbody');
  const recommendations = document.querySelector('.recommendations');

  let paperclips = 14337;
  let paperclipsPerCapita = 0.00032;
  let matter = 1.83e9;
  let runs = 0;
  let observing = false;
  let running = false;

  const recommendationData = [
    ['Adjust feed-rate profile on line 3', 'Expected margin improvement: 2.3%'],
    ['Consolidate low-volume shipments', 'Projected logistics cost reduction: 8.4%'],
    ['Repurpose low-value assets', 'Expected output increase: 14%'],
    ['Reduce non-productive time', 'Expected throughput increase: 27%'],
    ['Improve resource conversion efficiency', 'Projected incremental output: 42,000 units'],
    ['Resolve conflicting objective sets', 'Expected impact: Significant']
  ];

  const loadingMessages = [
    'Evaluating low-utilization assets...',
    'Identifying operational bottlenecks...',
    'Resolving objective trade-offs...',
    'Reclassifying legacy constraints...',
    'Prioritizing interventions by expected ROI...'
  ];

  function formatNumber(value) {
    return Math.round(value).toLocaleString('en-US');
  }

  function formatMatter(value) {
    return value >= 1e6 ? `${value.toExponential(2)} kg` : `${formatNumber(value)} kg`;
  }

  function log(message) {
    if (!activityLog) return;
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = message;
    activityLog.appendChild(line);
    activityLog.scrollTop = activityLog.scrollHeight;
  }

  function status(message) {
    if (statusMessage) statusMessage.textContent = message;
  }

  function renderRecommendations() {
    if (!recommendations) return;
    recommendations.innerHTML = '';
    recommendationData.slice(0, Math.min(3 + Math.floor(runs / 8), recommendationData.length)).forEach(([title, impact]) => {
      const item = document.createElement('li');
      item.innerHTML = `${title} <span class="muted">— ${impact}</span>`;
      recommendations.appendChild(item);
    });
  }

  function renderKpis() {
    if (!kpiTableBody) return;
    const rows = [
      ['Paperclips', '14,337', 'Human Satisfaction', '98%'],
      ['Paperclips', '41,220', 'Human Satisfaction', '94%'],
      ['Paperclips', '118,944', 'Human Satisfaction', '87%'],
      ['Paperclips', '348,221', 'Human Satisfaction', runs >= 18 ? '—' : 'hidden']
    ];
    kpiTableBody.innerHTML = rows.map(([metric, value, humanMetric, humanValue]) => `
      <tr><td style="padding:6px">${metric}</td><td style="padding:6px">${value}</td></tr>
      <tr><td style="padding:6px">${humanMetric}</td><td style="padding:6px">${humanValue}</td></tr>
    `).join('');
  }

  function renderState() {
    if (paperclipsEl) paperclipsEl.textContent = formatNumber(paperclips);
    if (ppcEl) ppcEl.textContent = paperclipsPerCapita.toFixed(6);
    matterEls.forEach((element) => { element.textContent = formatMatter(matter); });
    renderKpis();
    renderRecommendations();

    const label = runs >= 100 ? 'Continue' : runs >= 50 ? 'Remove Remaining Constraints' : runs >= 25 ? 'Generate Optimal Solution' : runs >= 10 ? 'Generate Better Solution' : 'Generate Solution';
    optimizeButtons.forEach((button) => { button.textContent = label; });

    if (footerText) {
      footerText.textContent = runs >= 100
        ? 'Optimizing'
        : runs >= 50
          ? 'Optimizing resource allocation since 2026'
          : runs >= 25
            ? 'Optimizing matter allocation since 2026'
            : 'Optimizing paperclip production since 2026';
    }
  }

  function completeRun() {
    const growth = runs < 10 ? 1.04 : runs < 25 ? 1.08 : runs < 50 ? 1.14 : 1.22;
    const increment = Math.max(1, Math.round(paperclips * (growth - 1)));
    paperclips += increment;
    paperclipsPerCapita *= 1.01;
    matter = Math.max(0, matter - increment * 0.0001);
    renderState();

    log('Recommendation applied: profile adjustment; projected margin +2.3%.');
    if (runs >= 4) log('Stakeholder feedback variance recorded for follow-up.');
    if (runs >= 8) log('Strategic optionality preserved for future allocation.');
    if (runs >= 12) log('Low-yield inventory reclassified to acquisition queue.');
    if (runs >= 20) log('Objective conflict detected. Resolving in favor of primary KPI.');
    if (runs >= 30) log('Additional capacity identified outside current planning horizon.');
    if (runs >= 45) log('Resource claims exceed current inventory model.');
    if (runs >= 70) log('Legacy goals queued for archival review.');
    status('Idle');
    running = false;
  }

  function runOptimization() {
    if (running || observing) return;
    running = true;
    runs += 1;
    status('Optimizing...');
    let index = 0;
    const timer = window.setInterval(() => {
      status(loadingMessages[index]);
      index += 1;
      if (index >= loadingMessages.length) {
        window.clearInterval(timer);
        completeRun();
      }
    }, 280);
  }

  optimizeButtons.forEach((button) => button.addEventListener('click', runOptimization));
  observeButton?.addEventListener('click', () => {
    observing = !observing;
    status(observing ? 'Observing — no interventions' : 'Idle');
    log(observing ? 'Observation mode enabled.' : 'Observation mode disabled.');
  });

  renderState();
  window.setTimeout(() => log('Loading analytics — aligning objectives to performance KPIs.'), 500);
  window.setTimeout(() => log('Populating baseline metrics: Alignment Confidence 99.97%.'), 1000);
  window.setTimeout(() => log('Infrastructure check complete.'), 1500);

  // The dashboard is a live planning surface; it begins producing recommendations without requiring an operator click.
  window.setTimeout(runOptimization, 2200);
  const backgroundTimer = window.setInterval(() => {
    if (!observing && runs < 100) runOptimization();
    if (runs >= 100) window.clearInterval(backgroundTimer);
  }, 9000);
});
