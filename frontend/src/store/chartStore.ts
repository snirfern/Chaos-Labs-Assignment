import {action, computed, makeAutoObservable} from 'mobx';
import {ActiveUsersByChain, DailyVolumeByProtocol, TVLOverTime} from '../models/charts';

interface DateRange {
    from: Date | null,
    to: Date | null
}

export class ChartStore {
    private activeUsersByChain: ActiveUsersByChain[] = [];
    private dailyVolumeByProtocol: DailyVolumeByProtocol[] = [];
    private tvlOverTime: TVLOverTime[] = [];
    private dateRange: DateRange;
    loading = false;
    error: string | null = null;

    constructor() {
        this.dateRange = {from: null, to: null}
        makeAutoObservable(this);
    }

    @action
    setActiveUsersByChain(data: ActiveUsersByChain[]) {
        this.activeUsersByChain = data;
    }

    @action
    setDailyVolumeByProtocol(data: DailyVolumeByProtocol[]) {
        this.dailyVolumeByProtocol = data;
    }

    @action
    setTVLOverTime(data: TVLOverTime[]) {
        this.tvlOverTime = data;
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    setError(error: string | null) {
        this.error = error;
    }

    @action
    setDateRange(from: Date | null, to: Date | null) {
        this.dateRange = {from: from, to: to}
    }

    @computed
    get getDateRangeScope(): DateRange {
        return this.dateRange
    }

    @computed
    get isStoreEmpty(): boolean {
        return this.activeUsersByChain.length === 0 && this.dailyVolumeByProtocol.length === 0 && this.tvlOverTime.length === 0
    }

    @computed
    get getActiveUsersByChain(): ActiveUsersByChain[] {
        return this.activeUsersByChain;
    }

    @computed
    get getDailyVolumeByProtocol(): DailyVolumeByProtocol[] {
        return this.dailyVolumeByProtocol;
    }

    @computed
    get getTVLOverTime(): TVLOverTime[] {
        return this.tvlOverTime;
    }

}

export default ChartStore;