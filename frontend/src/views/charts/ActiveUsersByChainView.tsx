import React, {useMemo} from 'react';
import CustomChart from "../../components/charts/chart";
import {BarChartOptions} from "../../components/charts/options/options";
import {useAppContext} from "../../context";
import {observer} from "mobx-react-lite";
import CsvWidget from "../../components/CsvWidget/csvWidget";
import {colorPalette} from "../../components/charts/pallets/pallets";
import {HideAxesIfNoVisibleData, NoDataMessagePlugin} from "../../components/charts/plugins/plugins";
import {filterByDateRange} from "../../utils/utils";
import type {ChartDataset, ChartOptions} from 'chart.js';

const ActiveUsersByChainView: React.FC = observer(() => {
    const {chartStore} = useAppContext();

    const filteredData = useMemo(() => {
        return filterByDateRange(chartStore.getActiveUsersByChain, chartStore.getDateRangeScope, 'day');
    }, [chartStore.getActiveUsersByChain, chartStore.getDateRangeScope]);

    const uniqueDays = useMemo(() => {
        return Array.from(new Set(filteredData.map(item => item.day)));
    }, [filteredData]);

    const chains = useMemo(() => {
        return Array.from(new Set(filteredData.map(item => item.chain)));
    }, [filteredData]);

    const datasets = useMemo<ChartDataset<'bar', number[]>[]>(() => {
        const dataMap: Record<string, Record<string, number>> = {};

        for (const { chain, day, total_active_users } of filteredData) {
            (dataMap[chain] ??= {})[day] = total_active_users;
        }

        return chains.map((chain, index) => ({
            label: chain,
            data: uniqueDays.map(day => dataMap[chain]?.[day] ?? 0),
            backgroundColor: colorPalette[index % colorPalette.length],
        }));
    }, [filteredData, chains, uniqueDays]);

    const chartData = useMemo(() => ({
        labels: uniqueDays,
        datasets,
    }), [uniqueDays, datasets]);

    const options = useMemo<ChartOptions<'bar'>>(() => ({
        ...BarChartOptions,
        scales: {
            x: {

                display: true,
                ticks: {
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            y: {
                title: {
                    display: true,
                },
                display: true,
                ticks: {
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                },
                grid: {
                    display: true,
                    drawBorder: true,
                    color: '#53545785',
                    lineWidth: 1,
                },
            },
        },
    }), []);

    const headerWidgets = useMemo(() => (
        <CsvWidget data={filteredData} filename="Active_Users_By_Chain"/>
    ), [filteredData]);

    return (
        <CustomChart
            title="Active Users By Chain"
            description="Shows Active Users split by Chain"
            headerWidgets={headerWidgets}
            type="bar"
            data={chartData}
            options={options}
            plugins={[
                NoDataMessagePlugin,
                HideAxesIfNoVisibleData
            ]}
        />
    );
});

export default ActiveUsersByChainView;
