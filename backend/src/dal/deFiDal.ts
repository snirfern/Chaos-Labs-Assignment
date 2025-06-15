import clickHouseDb from "../framework/db/clickHouse";
import {NodeClickHouseClient} from "@clickhouse/client/dist/client";
import {DeFiQueries} from "./queries";

export class DeFiDal {
    private client: NodeClickHouseClient;

    constructor() {
        this.client = clickHouseDb.getClient();
    }

    async getDeFiMetrics(): Promise<any> {
        const resultSet = await this.client.query({
            query: DeFiQueries.GetDeFiMetrics,
            format: "JSONEachRow",
        });
        return resultSet.json<any[]>();
    }

    async queryTVLOverTime(): Promise<any[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.TVLOverTime,
            format: "JSONEachRow",
        });
        return resultSet.json<any[]>();
    }

    async queryDailyVolumeByProtocol(): Promise<any[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.DailyVolumeByProtocol,
            format: "JSONEachRow",
        });
        return resultSet.json<any[]>();
    }

    async queryActiveUsersByChain(): Promise<any[]> {
        const resultSet = await this.client.query({
            query: DeFiQueries.ActiveUsersByChain,
            format: "JSONEachRow",
        });
        return resultSet.json<any[]>();
    }
}
