import {ApolloClient, NormalizedCacheObject} from '@apollo/client';
import {GET_ACTIVE_USERS_BY_CHAIN, GET_DAILY_VOLUME_BY_PROTOCOL, GET_TVL_OVER_TIME,} from '../graphql/queries';
import {ActiveUsersByChain, DailyVolumeByProtocol, TVLOverTime} from '../models/charts';

export class ChartRepository {
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    async getActiveUsersByChain(): Promise<ActiveUsersByChain[]> {
        const {data} = await this.client.query<{ getActiveUsersByChain: ActiveUsersByChain[] }>({
            query: GET_ACTIVE_USERS_BY_CHAIN,
            fetchPolicy: 'network-only',
        });

        return data.getActiveUsersByChain;
    }

    async getDailyVolumeByProtocol(): Promise<DailyVolumeByProtocol[]> {
        const {data} = await this.client.query<{ getDailyVolumeByProtocol: DailyVolumeByProtocol[] }>({
            query: GET_DAILY_VOLUME_BY_PROTOCOL,
            fetchPolicy: 'network-only',
        });

        return data.getDailyVolumeByProtocol;
    }

    async getTVLOverTime(): Promise<TVLOverTime[]> {
        const {data} = await this.client.query<{ getTVLOverTime: TVLOverTime[] }>({
            query: GET_TVL_OVER_TIME,
            fetchPolicy: 'network-only',
        });

        return data.getTVLOverTime;
    }
}

export default ChartRepository;