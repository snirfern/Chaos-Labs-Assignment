import {ChartOptions} from "chart.js";

export const LineChartOptions: ChartOptions<'line'> = {
    animation: {
        duration: 0,
    },
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#d0c2c2',
            },
        },
        y: {
            grid: {
                display: true,
                color: 'rgba(0,0,0,0.1)',
            },
            ticks: {
                color: '#d0c2c2',
            },
        },
    },

    plugins: {

        legend: {

            labels: {
                color: '#d0c2c2',
            },
        },
        tooltip: {
            padding: 12,
            bodyFont: {
                size: 12,
                weight: 'bold',
                family: "'Helvetica Neue', 'Arial', sans-serif",
            },
            titleFont: {
                size: 12,
                weight: 'bold',
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#ffffcc',
            cornerRadius: 6,
            displayColors: false,
        },
    },
};

export const BarChartOptions: ChartOptions<'bar'> = {
    animation: {
        duration: 0,
    },
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#d0c2c2',
            },
        },
        y: {
            grid: {
                display: true,
                color: '#ccc',
            },
            ticks: {
                color: 'white',
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                color: '#fff',
            },
        },
        tooltip: {
            padding: 12,
            bodyFont: {
                size: 12,
                weight: 'bold',
                family: "'Helvetica Neue', 'Arial', sans-serif",
            },
            titleFont: {
                size: 12,
                weight: 'bold',
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#ffffcc',
            cornerRadius: 6,
            displayColors: false,
        },
    },
};
