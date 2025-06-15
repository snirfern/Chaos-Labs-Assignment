export interface IDeFiMetrics {
    timestamp: Date;
    protocol: string;
    chain: string;
    total_value_locked_usd: number;
    daily_volume_usd: number;
    active_users: number;
    token: string;
}

export interface TVLOverTime {
    day: string;
    total_tvl: number;
}

export interface DailyVolumeByProtocol {
    day: string;
    protocol: string;
    total_volume: number;
}

export interface ActiveUsersByChain {
    day: string;
    chain: string;
    total_active_users: number;
}
