import React, {useMemo} from 'react';
import CustomChart from "../../components/charts/chart";
import type {ChartDataset} from 'chart.js';
import {BarChartOptions} from "../../components/charts/options/options";
import {useAppContext} from "../../context";
import {observer} from "mobx-react-lite";
import {colorPalette} from "../../components/charts/pallets/pallets";
import CsvWidget from "../../components/CsvWidget/csvWidget";
import {HideAxesIfNoVisibleData, NoDataMessagePlugin} from "../../components/charts/plugins/plugins";
import {filterByDateRange} from "../../utils/utils";

const DailyVolumeByProtocolView: React.FC = observer(() => {
    const {chartStore} = useAppContext();

    const filteredData = useMemo(() => {
        return filterByDateRange(chartStore.getDailyVolumeByProtocol, chartStore.getDateRangeScope, 'day');
    }, [chartStore.getDailyVolumeByProtocol, chartStore.getDateRangeScope]);

    const protocols = useMemo(() => {
        return Array.from(new Set(filteredData.map(item => item.protocol)));
    }, [filteredData]);

    const days = useMemo(() => {
        return Array.from(new Set(filteredData.map(item => item.day)));
    }, [filteredData]);

    const datasets: ChartDataset<'bar', number[]>[] = useMemo(() => {
        const dataMap: Record<string, Record<string, number>> = {};
        for (const { protocol, day, total_volume } of filteredData) {
            dataMap[protocol] ??= {};
            dataMap[protocol][day] = total_volume;
        }

        return protocols.map((protocol, index) => ({
            label: protocol,
            data: days.map(day => dataMap[protocol]?.[day] ?? 0),
            backgroundColor: colorPalette[index % colorPalette.length],
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
        }));
    }, [filteredData, protocols, days]);

    const chartData = useMemo(() => ({
        labels: days,
        datasets,
    }), [days, datasets]);

    const options = useMemo(() => ({
        ...BarChartOptions,
        scales: {
            x: {
                display: true,
                ticks: {
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0,
                },
                grid: {
                    display: false,
                },
            },
            y: {
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
        <CsvWidget data={filteredData} filename="Daily_Volume_By_Protocol"/>
    ), [filteredData]);

    return (
        <CustomChart
            title="Daily Volume By Protocol"
            description="Compares Daily Volume grouped by protocol"
            headerWidgets={headerWidgets}
            type="bar"
            plugins={[
                NoDataMessagePlugin,
                HideAxesIfNoVisibleData
            ]}
            data={chartData}
            options={options}
        />
    );
});

export default DailyVolumeByProtocolView;
