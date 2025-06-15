import React from 'react';
import ChartStore from "./store/chartStore";
import ChartRepository from "./repositories/chartRepository";
import ChartController from "./controllers/chartController";
import {apolloClient} from "./graphql/client";


const chartStore = new ChartStore();
const chartRepository = new ChartRepository(apolloClient);
const chartController = new ChartController(chartRepository, chartStore);

export const rootContext = {
  chartController: chartController,
  chartStore: chartStore
};

export const AppContext = React.createContext(rootContext);

export const useAppContext = () => React.useContext(AppContext);
