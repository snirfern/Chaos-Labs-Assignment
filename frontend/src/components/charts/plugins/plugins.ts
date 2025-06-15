import {ActiveElement, Chart as ChartJS, Plugin} from "chart.js";

export const verticalLineOnHover: Plugin<'line'> = {
    id: 'verticalLineOnHover',
    afterDraw: (chart: ChartJS<'line'>) => {
        const activeElements: ActiveElement[] = chart.tooltip?.getActiveElements?.() ?? [];

        if (activeElements.length > 0) {
            const ctx = chart.ctx;
            const activePoint = activeElements[0];
            const x = activePoint.element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#aaa';
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.restore();
        }
    },
};


export const LegendMarginPlugin: Plugin = {
    id: 'legendMargin',
    beforeInit(chart) {
        const originalFit = chart.legend?.fit;
        if (originalFit) {
            if (chart.legend) {
                chart.legend.fit = function fit() {
                    originalFit.bind(chart.legend)();
                    this.height += 100;
                };
            }
        }
    },
};


export const NoDataMessagePlugin: Plugin = {
    id: 'noDataMessage',

    beforeDraw(chart) {
        const {ctx, width, height, data} = chart;
        const datasets = data.datasets || [];

        const isDatasetVisible = (index: number): boolean =>
            chart.isDatasetVisible ? chart.isDatasetVisible(index) : true;

        const hasData = datasets.length > 0 && datasets.some(ds => ds.data && ds.data.length > 0);
        const anyVisible = datasets.some((_, index) => isDatasetVisible(index));

        if (!hasData || !anyVisible) {
            chart.clear();

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '16px sans-serif';
            ctx.fillStyle = '#666';

            const message = !hasData ? 'No data available' : 'No data selected';
            ctx.fillText(message, width / 2, height / 2);
            ctx.restore();
        }
    },
};

export const HideAxesIfNoVisibleData: Plugin = {
    id: 'hideAxesIfNoVisibleData',
    beforeUpdate(chart) {
        const datasets = chart.data.datasets || [];

        const isDatasetVisible = (index: number): boolean =>
            chart.isDatasetVisible ? chart.isDatasetVisible(index) : true;

        const anyVisible = datasets.some((dataset, index) => {
            const visible = isDatasetVisible(index);
            const hasData = Array.isArray(dataset.data) && dataset.data.length > 0;
            return visible && hasData;
        });

        if (chart.options?.scales) {
            if (chart.options.scales.x) {
                chart.options.scales.x.display = anyVisible;
            }
            if (chart.options.scales.y) {
                chart.options.scales.y.display = anyVisible;
            }
        }
    },
};



