import ChartRepository from "../repositories/chartRepository";
import ChartStore from "../store/chartStore";

export class ChartController {
    constructor(
        private repository: ChartRepository,
        private chartStore: ChartStore,
    ) {
        void this.init()
    }

    async fetchActiveUsersByChain() {
        try {
            const data = await this.repository.getActiveUsersByChain();
            this.chartStore.setActiveUsersByChain(data);
        } catch (err) {
            this.chartStore.setError((err as Error)?.message ?? 'Unknown error');
        }
    }

    async fetchDailyVolumeByProtocol() {
        try {
            const data = await this.repository.getDailyVolumeByProtocol();
            this.chartStore.setDailyVolumeByProtocol(data);
        } catch (err) {
            this.chartStore.setError((err as Error)?.message ?? 'Unknown error');
        }
    }

    async fetchTVLOverTime() {
        try {
            const data = await this.repository.getTVLOverTime();
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
