import {ApolloClient, NormalizedCacheObject} from '@apollo/client';
import {GET_ACTIVE_USERS_BY_CHAIN, GET_DAILY_VOLUME_BY_PROTOCOL, GET_TVL_OVER_TIME,} from '../graphql/queries';
import {ActiveUsersByChain, DailyVolumeByProtocol, TVLOverTime} from '../models/charts';

export class ChartRepository {
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    async getActiveUsersByChain(from?: Date, to?: Date): Promise<ActiveUsersByChain[]> {
        const {data} = await this.client.query<{ getActiveUsersByChain: ActiveUsersByChain[] }>({
            query: GET_ACTIVE_USERS_BY_CHAIN,
            fetchPolicy: 'cache-first',
            variables: {from: from?.toISOString(), to: to?.toISOString()}
        });

        return data.getActiveUsersByChain;
    }

    async getDailyVolumeByProtocol(from?: Date, to?: Date): Promise<DailyVolumeByProtocol[]> {
        const {data} = await this.client.query<{ getDailyVolumeByProtocol: DailyVolumeByProtocol[] }>({
            query: GET_DAILY_VOLUME_BY_PROTOCOL,
            fetchPolicy: 'cache-first',
            variables: {from: from?.toISOString(), to: to?.toISOString()}
        });

        return data.getDailyVolumeByProtocol;
    }

    async getTVLOverTime(from?: Date, to?: Date): Promise<TVLOverTime[]> {
        const {data} = await this.client.query<{ getTVLOverTime: TVLOverTime[] }>({
            query: GET_TVL_OVER_TIME,
            fetchPolicy: 'cache-first',
            variables: {from: from?.toISOString(), to: to?.toISOString()}
        });

        return data.getTVLOverTime;
    }
}

export default ChartRepository;