import DeFiService from "../../services/defi/defiService";
import {DeFiRepository} from "../../repositories/defiRepository";

const deFiService = new DeFiService(new DeFiRepository());

export const queryResolvers = {
    getDeFiMetrics: async () => {
        return await deFiService.getMetrics();
    },

    getTVLOverTime: async (variables:Record<string, string>) => {
        const {from,to}=variables

        return await deFiService.getTVLOverTime();
    },

    getDailyVolumeByProtocol: async (variables:Record<string, string>) => {
        const {from,to}=variables
        return await deFiService.getDailyVolumeByProtocol();
    },

    getActiveUsersByChain: async (variables:Record<string, string>) => {
        const {from,to}=variables
        return await deFiService.getActiveUsersByChain();
    },
};
