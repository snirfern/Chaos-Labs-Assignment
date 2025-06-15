import dotenv from 'dotenv';
import path from 'path';
import {clickHouseConfig} from "./dbConfig";

interface DataSource {
    dbConfig: any
}

interface DataSources {
    [key: string]: DataSource;
}

export interface Config {
    dataSources: DataSources;
    server: {
        port: number;
    };
}

const env = process.env.NODE_ENV || 'dev';
const envFilePath = path.resolve(__dirname, `../../env/.env.${env}`.trim());
const envConfigs = dotenv.config({path: envFilePath});

if (envConfigs.error) {
    console.error(`Failed to load .env file: ${envFilePath}`, envConfigs.error);
    throw envConfigs.error;
}


const config: Config = {
    dataSources: {
        clickHouse: {
            dbConfig: clickHouseConfig()
        },

    },
    server: {
        port: Number(process.env.PORT),
    },
};
export default config;
