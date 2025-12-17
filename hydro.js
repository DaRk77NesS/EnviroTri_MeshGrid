// Sidebar Toggles
function toggleMainSidebar() {
    document.getElementById('mainSidebar').classList.toggle('collapsed');
    document.getElementById('mainContent').classList.toggle('expanded');
}
function toggleApSidebar() {
    document.getElementById('apSidebar').classList.toggle('collapsed');
}

// State & Logic
const state = { running: true, uv: false, regen: false };

function toggleUV() {
    if (!state.running) return;
    state.uv = !state.uv;
    const btn = document.getElementById('uvBtn');
    const mainContainer = document.querySelector('.ap-main');
    const txt = document.getElementById('uvState');
    if (state.uv) {
        btn.classList.add('uv-active-glow');
        mainContainer.classList.add('uv-active-mode'); // Enable global glow
        // Force styles via JS to ensure visibility
        btn.style.background = "rgba(168, 85, 247, 0.2)";
        btn.style.borderColor = "#a855f7";
        btn.style.color = "white";
        btn.style.boxShadow = "0 0 15px #a855f7";

        txt.innerHTML = '<i class="fa-solid fa-bolt" style="color:#a855f7; margin-right:5px;"></i> UV: ON';
        txt.style.color = "white";

        showToast("UV Matrix Online", "normal");
    } else {
        btn.classList.remove('uv-active-glow');
        mainContainer.classList.remove('uv-active-mode'); // Disable global glow
        // Reset styles
        btn.style.background = "rgba(255, 255, 255, 0.1)";
        btn.style.borderColor = "var(--border-glass)";
        btn.style.color = "var(--text-main)";
        btn.style.boxShadow = "none";

        txt.innerText = "UV: OFF";
        txt.style.color = "var(--text-main)";
    }
}

function handleFab() {
    if (state.running) openModal('modalStop');
    else openModal('modalRestart');
}

function confirmStop() {
    closeModals();
    state.running = false;

    // CRT Off Effect
    const main = document.querySelector('.ap-main');
    main.classList.remove('system-on-anim');
    main.classList.add('system-off-anim');

    setTimeout(() => {
        document.getElementById('apStatus').innerText = "SYSTEM STOPPED";
        document.getElementById('apStatus').style.color = "var(--danger)";
        document.getElementById('apDot').style.background = "var(--danger)";

        const fab = document.getElementById('fabMain');
        fab.className = "fab restart";
        fab.innerHTML = '<i class="fa-solid fa-play"></i>';
        showToast("System Halted", "critical");
    }, 800); // Wait for animation
}

function confirmRestart() {
    closeModals();
    state.running = true;

    // CRT On Effect
    const main = document.querySelector('.ap-main');
    main.classList.remove('system-off-anim');
    main.classList.add('system-on-anim');

    document.getElementById('apStatus').innerText = "System Healthy";
    document.getElementById('apStatus').style.color = "var(--text-main)";
    document.getElementById('apDot').style.background = "var(--success)";

    const fab = document.getElementById('fabMain');
    fab.className = "fab stop";
    fab.innerHTML = '<i class="fa-solid fa-power-off"></i>';
    showToast("System Restarted", "normal");
}

// Modals & Toasts
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active')); }

function showToast(msg, type) {
    const area = document.getElementById('toastArea');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fa-solid fa-info-circle"></i> ${msg}`;
    area.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 3000);
}

// --- 3. HOLOGRAPHIC CHARTS ---
Chart.defaults.color = '#64748b';
Chart.defaults.borderColor = 'rgba(255,255,255,0.02)';
Chart.defaults.font.family = '"Inter", sans-serif';

// Gradient Helpers
const ctxFlow = document.getElementById('cFlow').getContext('2d');
const gradFlow = ctxFlow.createLinearGradient(0, 0, 0, 100);
gradFlow.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
gradFlow.addColorStop(1, 'rgba(6, 182, 212, 0)');

const cFlow = new Chart(ctxFlow, {
    type: 'line',
    data: {
        labels: Array(20).fill(''),
        datasets: [
            {
                label: 'Inlet',
                data: Array(20).fill(52),
                borderColor: '#06b6d4',
                backgroundColor: gradFlow,
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0
            },
            {
                label: 'Outlet',
                data: Array(20).fill(50),
                borderColor: '#10b981',
                borderDash: [5, 5],
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            x: { display: false },
            y: { display: false, min: 40, max: 60 }
        },
        animation: { duration: 1000, easing: 'linear' }
    }
});

const cSpark = new Chart(document.getElementById('cSpark'), {
    type: 'bar',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [{
            data: [12, 19, 15, 17, 14, 24, 22],
            backgroundColor: '#06b6d4',
            borderRadius: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { display: false },
            y: { display: false }
        }
    }
});

const cMin = new Chart(document.getElementById('cMin'), {
    type: 'doughnut',
    data: {
        labels: ['Ca', 'Mg', 'K'],
        datasets: [{
            data: [12, 8, 5],
            backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(236, 72, 153, 0.8)'],
            borderColor: '#0f172a',
            borderWidth: 4,
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 10 } } } },
        cutout: '70%'
    }
});

function showDrill(title, type) {
    openModal('modalDrill');
    document.getElementById('drillTitle').innerText = title;

    // Destroy previous instance to prevent overlays
    if (cDrill instanceof Chart) {
        cDrill.destroy();
    }

    const ctx = document.getElementById('cDrill').getContext('2d');
    let colorStart, colorEnd, dataPoints;

    // Config based on type
    if (type == 'flow') {
        colorStart = 'rgba(6, 182, 212, 0.6)'; // Cyan
        colorEnd = 'rgba(6, 182, 212, 0)';
        dataPoints = [50, 52, 51, 53, 52, 54, 53];
    } else if (type == 'arsenic') {
        colorStart = 'rgba(239, 68, 68, 0.6)'; // Red
        colorEnd = 'rgba(239, 68, 68, 0)';
        dataPoints = [0.003, 0.004, 0.003, 0.005, 0.004, 0.006, 0.004];
    } else if (type == 'mag') {
        colorStart = 'rgba(245, 158, 11, 0.6)'; // Amber
        colorEnd = 'rgba(245, 158, 11, 0)';
        dataPoints = [98, 96, 95, 94, 94, 93, 92];
    } else if (type == 'ph') {
        colorStart = 'rgba(16, 185, 129, 0.6)'; // Green
        colorEnd = 'rgba(16, 185, 129, 0)';
        dataPoints = [7.2, 7.3, 7.1, 7.4, 7.2, 7.3, 7.2];
    } else {
        colorStart = 'rgba(168, 85, 247, 0.6)'; // Purple
        colorEnd = 'rgba(168, 85, 247, 0)';
        dataPoints = [10, 20, 15, 25, 30, 28, 32];
    }

    // Create Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);

    const borderColor = colorStart.replace('0.6', '1');

    cDrill = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'],
            datasets: [{
                label: title,
                data: dataPoints,
                borderColor: borderColor,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#0f172a',
                pointBorderColor: borderColor,
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#94a3b8',
                    bodyColor: '#f8fafc',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#64748b' }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// --- 4. ADVANCED SIMULATION ENGINE ---
// Smooth Number Transition
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / (range / 0.01))); // granular steps
    if (stepTime < minTimer) stepTime = minTimer;

    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = end - (remaining * range);

        // Formatting based on target "look"
        if (id === 'd-ars') obj.innerHTML = value.toFixed(3);
        else if (id === 'd-total' && obj) obj.innerHTML = Math.floor(value).toLocaleString();
        else if (obj) obj.innerHTML = value.toFixed(1);

        if (value.toFixed(3) == end.toFixed(3)) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

// Data State
let simData = {
    flowIn: 52.4,
    magEff: 98.8, // Start high as requested
    arsenic: 0.004,
    ph: 7.4,
    total: 12450
};

let regenState = {
    active: false,
    mode: null // 'auto' or 'manual'
};

function forceRegen() {
    if (regenState.active || !state.running) return;
    startRegen('manual');
}

function startRegen(mode) {
    regenState.active = true;
    regenState.mode = mode;

    const statusBox = document.getElementById('regenStatus');
    const gauge = document.getElementById('magGauge');

    // UI Updates
    gauge.classList.add('regenerating');
    statusBox.classList.remove('active');

    if (mode === 'manual') {
        statusBox.classList.add('forced');
        statusBox.innerText = "FORCED REGEN...";
        showToast("Manual Regeneration Initiated", "normal");
    } else {
        statusBox.classList.add('cycle'); // Amber style
        statusBox.innerText = "SYSTEM REGEN...";
        showToast("Efficiency Low - Auto Regen Started", "warning");
    }
}

function stopRegen() {
    regenState.active = false;
    regenState.mode = null;

    const statusBox = document.getElementById('regenStatus');
    const gauge = document.getElementById('magGauge');

    // Reset UI
    gauge.classList.remove('regenerating');
    statusBox.className = "regen-badge active";
    statusBox.innerText = "Status: Active";

    showToast("Regeneration Cycle Complete", "success");
}

setInterval(() => {
    if (!state.running) return;

    // 1. Flow Logic
    let flowChange = (Math.random() - 0.5) * 2;
    simData.flowIn = Math.max(45, Math.min(60, simData.flowIn + flowChange));
    let flowOut = simData.flowIn * 0.96;

    document.getElementById('d-fin').innerText = simData.flowIn.toFixed(1);
    document.getElementById('d-fout').innerText = flowOut.toFixed(1);

    cFlow.data.datasets[0].data.push(simData.flowIn);
    cFlow.data.datasets[0].data.shift();
    cFlow.data.datasets[1].data.push(flowOut);
    cFlow.data.datasets[1].data.shift();
    cFlow.update();

    // 2. Mag-Chito Logic
    if (regenState.active) {
        // RECHARGING: Fast climb back to 99.9%
        simData.magEff += 2.5;
        if (simData.magEff >= 99.9) {
            simData.magEff = 99.9;
            stopRegen();
        }
    } else {
        // DECAYING: Slow drop
        // Speed up decay slightly for demo purposes so user sees it drop
        simData.magEff -= 0.8;

        // Auto-Trigger at < 70%
        if (simData.magEff < 70) {
            startRegen('auto');
        }
    }

    // Safety clamp (visual only, logic handles bounds)
    let displayEff = Math.max(0, Math.min(100, simData.magEff));

    document.getElementById('magEff').innerText = displayEff.toFixed(1) + "%";

    // Update Gauge Gradient (Red/Amber if low, Blue if high)
    let gaugeColor = 'var(--primary)';
    if (displayEff < 75) gaugeColor = 'var(--warning)';
    if (displayEff < 50) gaugeColor = 'var(--danger)';

    document.getElementById('magGauge').style.background = `conic-gradient(${gaugeColor} 0%, ${gaugeColor} ${displayEff}%, rgba(255,255,255,0.05) ${displayEff}%)`;

    // 3. Arsenic Logic
    let ars = (0.003 + Math.random() * 0.002);
    // Spike if efficiency is low
    if (simData.magEff < 80) ars += 0.005;

    simData.arsenic = ars;
    document.getElementById('d-ars').innerText = simData.arsenic.toFixed(3);

    const bar = document.getElementById('barArs');
    bar.style.width = (simData.arsenic / 0.015) * 100 + '%';
    if (simData.arsenic > 0.01) {
        bar.style.backgroundColor = 'var(--danger)';
        bar.style.boxShadow = '0 0 10px var(--danger)';
    } else {
        bar.style.backgroundColor = 'var(--success)';
        bar.style.boxShadow = 'none';
    }

    // 4. pH Logic
    let phDrift = (Math.random() - 0.5) * 0.1;
    simData.ph = Math.max(6.5, Math.min(8.5, simData.ph + phDrift));
    document.getElementById('d-ph').innerText = simData.ph.toFixed(1);
    const phPercent = ((simData.ph - 6) / 3) * 100;
    document.getElementById('markPh').style.left = phPercent + '%';

    // 5. Total
    simData.total += (simData.flowIn / 60) * 2;
    document.getElementById('d-total').innerText = Math.floor(simData.total).toLocaleString();

}, 1500); // Loop Speed

// Scroll Reveal Animation (Added for Visual Upgrade)
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();
