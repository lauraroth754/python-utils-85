import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

type Config = {
    port: number;
    host: string;
    dbUri: string;
};

const defaultConfig: Config = {
    port: 3000,
    host: 'localhost',
    dbUri: 'mongodb://localhost:27017/default',
};

function loadConfig(): Config {
    const configPath = path.resolve(__dirname, 'config.json');
    let userConfig: Partial<Config> = {};

    if (fs.existsSync(configPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        userConfig = { ...fileConfig };
    }

    return { ...defaultConfig, ...userConfig, port: Number(process.env.PORT) || defaultConfig.port };
}

export const config = loadConfig();