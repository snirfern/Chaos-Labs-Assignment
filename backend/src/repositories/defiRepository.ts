import {DeFiDal} from "../dal/deFiDal";
import {ActiveUsersByChain, DailyVolumeByProtocol, IDeFiMetrics, TVLOverTime} from "../models/interface";
import {
    ActiveUsersByChainError,
    DailyVolumeByProtocolError,
    GetDeFiMetricsError,
    TVLOverTimeError
} from "../errors/errors";

export class DeFiRepository {
    private deFiDal: DeFiDal;

    constructor() {
        this.deFiDal = new DeFiDal();
    }

    async getDeFiMetrics(): Promise<IDeFiMetrics[]> {
        const res = await this.deFiDal.getDeFiMetrics();
        if (!res) {
            throw new GetDeFiMetricsError();
        }
        return res;
    }

    async getTVLOverTime(): Promise<TVLOverTime[]> {
        const res = await this.deFiDal.queryTVLOverTime();
        if (!res) {
            throw new TVLOverTimeError();
        }
        return res;
    }

    async getDailyVolumeByProtocol(): Promise<DailyVolumeByProtocol[]> {
        const res = await this.deFiDal.queryDailyVolumeByProtocol();
        if (!res) {
            throw new DailyVolumeByProtocolError();
        }
        return res;
    }

    async getActiveUsersByChain(): Promise<ActiveUsersByChain[]> {
        const res = await this.deFiDal.queryActiveUsersByChain();
        if (!res) {
            throw new ActiveUsersByChainError();
        }
        return res;
    }
}