import clickHouseDb from "../framework/db/clickHouse";
import {NodeClickHouseClient} from "@clickhouse/client/dist/client";
import {DeFiQueries} from "./queries";
import {ActiveUsersByChain, DailyVolumeByProtocol, IDeFiMetrics, TVLOverTime} from "../models/interface";

enum ClickHouseFormat {
    JSONEachRow = "JSONEachRow",
}

export class DeFiDal {
    private client: NodeClickHouseClient;

    constructor() {
        this.client = clickHouseDb.getClient();
    }

    async getDeFiMetrics(): Promise<IDeFiMetrics[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.GetDeFiMetrics,
            format: ClickHouseFormat.JSONEachRow,
        });
        return resultSet.json();
    }

    async queryTVLOverTime(): Promise<TVLOverTime[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.TVLOverTime,
            format: ClickHouseFormat.JSONEachRow,
        });
        return resultSet.json();
    }

    async queryDailyVolumeByProtocol(): Promise<DailyVolumeByProtocol[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.DailyVolumeByProtocol,
            format: ClickHouseFormat.JSONEachRow,
        });
        return resultSet.json();
    }

    async queryActiveUsersByChain(): Promise<ActiveUsersByChain[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.ActiveUsersByChain,
            format: ClickHouseFormat.JSONEachRow,
        });
        return resultSet.json();
    }
}
