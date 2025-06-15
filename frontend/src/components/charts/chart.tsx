import React from 'react';
import './chart.css'
import 'chartjs-adapter-date-fns';

import type {ChartTypeRegistry, Plugin} from 'chart.js';
import {
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    Colors,
    Filler,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    TimeSeriesScale,
    Tooltip
} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import {LegendMarginPlugin, NoDataMessagePlugin} from "./plugins/plugins";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    Filler,
    LegendMarginPlugin,
    NoDataMessagePlugin,
    TimeSeriesScale,
    LineController,
    BarController
);

interface CustomChartProps {
    title: string;
    description?: React.ReactNode;
    headerWidgets?: React.ReactNode;
    type: keyof ChartTypeRegistry;
    data: ChartData<keyof ChartTypeRegistry>;
    options?: ChartOptions<keyof ChartTypeRegistry>;
    plugins?: Plugin[];
}

const CustomChart: React.FC<CustomChartProps> = ({title, description, headerWidgets, type, data, options, plugins}) => {
    return (
        <div className="chart_container">
            <div className="chart_header">
                <div className='chart_header_title'>
                    <div className='chart_title'>{title}</div>
                    {headerWidgets && <div className="chart_header_widgets">{headerWidgets}</div>}
                </div>
                {description && <div className="chart_description">{description}</div>}

            </div>

            <div className='chart_canvas_container'>
                <Chart type={type} data={data} options={options} plugins={plugins}/>;
            </div>
        </div>)
};

export default CustomChart;
