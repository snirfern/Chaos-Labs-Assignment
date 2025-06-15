import React, {useMemo} from 'react';
import CustomChart from "../../components/charts/chart";
import {LineChartOptions} from "../../components/charts/options/options";
import {useAppContext} from "../../context";
import {observer} from "mobx-react-lite";
import {
    HideAxesIfNoVisibleData,
    LegendMarginPlugin,
    NoDataMessagePlugin,
    verticalLineOnHover
} from "../../components/charts/plugins/plugins";
import CsvWidget from "../../components/CsvWidget/csvWidget";
import {ChartOptions} from 'chart.js';
import {filterByDateRange} from "../../utils/utils";
import {format} from 'date-fns';

const TVLOverTimeView: React.FC = observer(() => {
    const {chartStore} = useAppContext();

    const filteredData = useMemo(() => {
        return filterByDateRange(chartStore.getTVLOverTime, chartStore.getDateRangeScope, 'day');
    }, [chartStore.getTVLOverTime, chartStore.getDateRangeScope]);

    const chartData = useMemo(() => ({
        datasets: [
            {
                label: 'Total TVL (USD)',
                data: filteredData.map(item => ({
                    x: new Date(item.day).getTime(),
                    y: item.total_tvl,
                })),
                backgroundColor: 'rgba(37,97,153,0.2)',
                borderColor: '#255f96',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
        ],
    }), [filteredData]);

    const options: ChartOptions<'line'> = useMemo(() => ({
        ...LineChartOptions,
        scales: {
            x: {
                display: true,
                type: 'timeseries',
                time: {
                    unit: 'day',
                    tooltipFormat: 'yyyy-MM-dd',
                },
                ticks: {
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                    callback: (value) => {
                        return format(new Date(value as number), 'yyyy-MM-dd');
                    },
                },
            },
            y: {
                display: true,
                ticks: {
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
        },
    }), []);

    const headerWidgets = useMemo(() => (
        <CsvWidget data={filteredData} filename='TVL_Over_Time'/>
    ), [filteredData]);

    return (
        <CustomChart
            title={'TVL over time'}
            description={'Shows Total Value Locked (TVL) over time'}
            headerWidgets={headerWidgets}
            type="line"
            data={chartData}
            options={options}
            plugins={[
                verticalLineOnHover,
                LegendMarginPlugin,
                NoDataMessagePlugin,
                HideAxesIfNoVisibleData
            ]}
        />
    );
});

export default TVLOverTimeView;
