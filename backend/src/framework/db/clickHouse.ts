import {ClickHouseClient, createClient} from '@clickhouse/client';
import logger from '../../utils/logger/logger';
import config from "../../config/config";

class ClickHouseDB {
    private readonly client: ClickHouseClient;

    constructor() {
        this.client = createClient({
            ...config.dataSources.clickHouse.dbConfig
        });
    }

    async connect(): Promise<void> {
        try {
            await this.client.ping();
            logger.info('Connected to ClickHouse successfully.');
        } catch (error) {
            logger.error(`Failed to connect to ClickHouse: ${error}`);
            throw error;
        }
    }


    getClient(): ClickHouseClient {
        return this.client;
    }

}

export default new ClickHouseDB();
