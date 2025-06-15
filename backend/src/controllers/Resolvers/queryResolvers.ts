import DeFiService from "../../services/defi/defiService";
import {DeFiRepository} from "../../repositories/defiRepository";

const deFiService = new DeFiService(new DeFiRepository());

export const queryResolvers = {
    getDeFiMetrics: async () => {
        return await deFiService.getMetrics();
    },

    getTVLOverTime: async () => {
        return await deFiService.getTVLOverTime();
    },

    getDailyVolumeByProtocol: async () => {
        return await deFiService.getDailyVolumeByProtocol();
    },

    getActiveUsersByChain: async () => {
        return await deFiService.getActiveUsersByChain();
    },
};
