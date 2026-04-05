// Traffic Inbound Chart - 3 Lines (Core Router, Site Home, Site Hotspot)
// Hour labels: 18 20 22 0 2 4 6 8 10 12 14 16 18 20 22 0
const hourLabels = ['18', '20', '22', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '0'];

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: '#94a3b8',
                boxWidth: 12,
                padding: 15,
                font: { size: 11 }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            titleColor: '#f1f5f9',
            bodyColor: '#cbd5e1',
            borderColor: '#475569',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
                label: function (context) {
                    return context.dataset.label + ': ' + context.parsed.y + ' Gbps';
                }
            }
        },
        title: {
            display: true,
            text: 'Traffic Inbound (Gbps) - Maret 2026',
            color: '#f1f5f9',
            font: { size: 14, weight: 'bold' },
            padding: {
                top: 10,
                bottom: 20
            }
        }
    },
    scales: {
        x: {
            grid: { color: 'rgba(71,85,105,0.2)' },
            ticks: { color: '#94a3b8', font: { size: 10 } }
        },
        y: {
            beginAtZero: true,
            grid: { color: 'rgba(71,85,105,0.2)' },
            ticks: {
                color: '#94a3b8',
                font: { size: 10 },
                callback: function (value) {
                    return value + ' Gb';
                }
            }
        }
    }
};

// Data dari file .txt yang disediakan user
new Chart(document.getElementById('trafficInboundChart'), {
    type: 'line',
    data: {
        labels: hourLabels,
        datasets: [
            {
                label: 'Core Router',
                // Data dari total-grafik-core-router.txt
                data: [2.20, 3.20, 3.60, 2.80, 1.20, 0.80, 1.10, 2.10, 2.80, 3.00, 2.90, 2.80, 3.40, 3.60, 3.74, 1.90],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#1e3a8a',
                pointBorderWidth: 2
            },
            {
                label: 'Site Home',
                // Data dari total-grafik-home.txt
                data: [2.30, 2.60, 2.70, 1.80, 0.90, 0.50, 0.80, 1.60, 2.10, 2.30, 2.20, 2.10, 2.50, 2.70, 2.81, 1.60],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#065f46',
                pointBorderWidth: 2
            },
            {
                label: 'Site Hotspot (9 sites)',
                // Data dari total-grafik-hotspot.txt
                data: [2.07, 2.97, 3.14, 2.09, 0.79, 0.45, 0.67, 1.20, 1.89, 2.27, 2.72, 2.65, 2.34, 3.27, 3.30, 1.74],
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                tension: 0.4,
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#f97316',
                pointBorderColor: '#9a3412',
                pointBorderWidth: 2
            }
        ]
    },
    options: chartOptions
});
