import ChartRepository from "../repositories/chartRepository";
import ChartStore from "../store/chartStore";

export class ChartController {
    constructor(
        private repository: ChartRepository,
        private chartStore: ChartStore,
    ) {
        void this.init()
    }

    async fetchActiveUsersByChain(from?:Date,to?:Date) {
        try {
            const data = await this.repository.getActiveUsersByChain(from,to);
            this.chartStore.setActiveUsersByChain(data);
        } catch (err) {
            this.chartStore.setError((err as Error)?.message ?? 'Unknown error');
        }
    }

    async fetchDailyVolumeByProtocol(from?:Date,to?:Date) {
        try {
            const data = await this.repository.getDailyVolumeByProtocol(from,to);
            this.chartStore.setDailyVolumeByProtocol(data);
        } catch (err) {
            this.chartStore.setError((err as Error)?.message ?? 'Unknown error');
        }
    }

    async fetchTVLOverTime(from?:Date,to?:Date) {
        try {
            const data = await this.repository.getTVLOverTime(from,to);
            this.chartStore.setTVLOverTime(data);
        } catch (err) {
            this.chartStore.setError((err as Error)?.message ?? 'Unknown error');
        }
    }

    async init() {
        this.chartStore.setLoading(true)
        await Promise.allSettled([
            this.fetchActiveUsersByChain(),
            this.fetchDailyVolumeByProtocol(),
            this.fetchTVLOverTime(),
        ]);
        this.chartStore.setLoading(false)
    }

    setDateRange(from: Date | null, to: Date | null) {
        this.chartStore.setDateRange(from, to)
    }
}

export default ChartController;
