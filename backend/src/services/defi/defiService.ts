import {ActiveUsersByChain, DailyVolumeByProtocol, IDeFiMetrics, TVLOverTime} from '../../models/interface';
import {DeFiRepository} from "../../repositories/defiRepository";

class DeFiService {
    private deFiRepository: DeFiRepository;

    constructor(deFiRepo: DeFiRepository) {
        this.deFiRepository = deFiRepo;
    }

    async getMetrics(): Promise<IDeFiMetrics[]> {
        return this.deFiRepository.getDeFiMetrics();
    }

    async getTVLOverTime(): Promise<TVLOverTime[]> {
        return this.deFiRepository.getTVLOverTime();
    }

    async getDailyVolumeByProtocol(): Promise<DailyVolumeByProtocol[]> {
        return this.deFiRepository.getDailyVolumeByProtocol();
    }

    async getActiveUsersByChain(): Promise<ActiveUsersByChain[]> {
        return this.deFiRepository.getActiveUsersByChain();
    }
}

export default DeFiService;
