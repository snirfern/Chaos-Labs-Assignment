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
        const raw = await this.deFiDal.getDeFiMetrics();
        if (!Array.isArray(raw)) {
            throw new GetDeFiMetricsError();
        }
        return raw;
    }

    async getTVLOverTime(): Promise<TVLOverTime[]> {
        const raw = await this.deFiDal.queryTVLOverTime();
        if (!Array.isArray(raw)) {
            throw new TVLOverTimeError();
        }
        return raw.map(row => ({
            day: row.day,
            total_tvl: Number(row.total_tvl),
        }));
    }

    async getDailyVolumeByProtocol(): Promise<DailyVolumeByProtocol[]> {
        const raw = await this.deFiDal.queryDailyVolumeByProtocol();
        if (!Array.isArray(raw)) {
            throw new DailyVolumeByProtocolError();
        }
        return raw.map(row => ({
            day: row.day,
            protocol: row.protocol,
            total_volume: Number(row.total_volume),
        }));
    }

    async getActiveUsersByChain(): Promise<ActiveUsersByChain[]> {
        const raw = await this.deFiDal.queryActiveUsersByChain();
        if (!Array.isArray(raw)) {
            throw new ActiveUsersByChainError();
        }
        return raw.map(row => ({
            day: row.day,
            chain: row.chain,
            total_active_users: Number(row.total_active_users),
        }));
    }
}