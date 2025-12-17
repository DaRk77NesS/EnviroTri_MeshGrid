// --- Button Interaction Logic (High Priority) ---
function addClickFeedback(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', function () {
        console.log(`Command sent: ${btn.innerText.trim()}`);

        // Remove class if it exists to reset animation
        btn.classList.remove('clicked-anim');

        // Force reflow
        void btn.offsetWidth;

        // Add class to trigger animation
        btn.classList.add('clicked-anim');

        // Cleanup after animation
        setTimeout(() => {
            btn.classList.remove('clicked-anim');
        }, 300);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize buttons
    addClickFeedback('btn-emergency-stop');
    addClickFeedback('btn-force-pump');

    // Initialize Chart safely
    initChart();
});

// --- Chart Logic ---
function initChart() {
    const canvas = document.getElementById('waterRainChart');
    if (!canvas) return;

    const ctxWater = canvas.getContext('2d');

    // Gradient for Water
    const gradientWater = ctxWater.createLinearGradient(0, 0, 0, 400);
    gradientWater.addColorStop(0, 'rgba(16, 185, 129, 0.5)'); // Emerald-500
    gradientWater.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    new Chart(ctxWater, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
            datasets: [
                {
                    label: 'Water Level (cm)',
                    data: [8, 7.5, 7, 6.2, 5.8, 5.4, 5.2],
                    borderColor: '#10b981', // Emerald-500
                    backgroundColor: gradientWater,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Rainfall (mm)',
                    data: [0, 0, 0, 2, 5, 1, 0],
                    type: 'bar',
                    backgroundColor: '#22d3ee', // Cyan-400
                    yAxisID: 'y1',
                    barThickness: 8,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1',
                        font: { family: "'JetBrains Mono', monospace", size: 10 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#e2e8f0',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 10,
                    titleFont: { family: "'Inter', sans-serif" },
                    bodyFont: { family: "'JetBrains Mono', monospace" }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#cbd5e1', font: { family: "'JetBrains Mono', monospace", size: 10 } },
                    grid: { color: 'rgba(148, 163, 184, 0.05)' }
                },
                y: {
                    type: 'linear', display: true, position: 'left',
                    ticks: { color: '#10b981', font: { family: "'JetBrains Mono', monospace", size: 10 } },
                    grid: { color: 'rgba(148, 163, 184, 0.05)' },
                    title: { display: true, text: 'Level (cm)', color: '#94a3b8', font: { size: 10 } }
                },
                y1: {
                    type: 'linear', display: true, position: 'right',
                    ticks: { color: '#22d3ee', font: { family: "'JetBrains Mono', monospace", size: 10 } },
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'Rain (mm)', color: '#94a3b8', font: { size: 10 } }
                }
            }
        }
    });
}

// --- Console Simulation ---
console.log("%c AWD-Mesh System v2.4.0", "color:#10b981; font-size:16px; font-weight:bold;");
console.log("Connecting to MQTT Broker... [OK]");
console.log("Subscribing to topic: awd/field/+/telemetry... [OK]");
