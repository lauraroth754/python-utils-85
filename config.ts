import fs from 'fs';
import path from 'path';

interface Config {
    [key: string]: any;
}

const defaultConfig: Config = {
    host: 'localhost',
    port: 3000,
    logLevel: 'info',
};

const loadConfig = (filePath: string): Config => {
    const fullPath = path.resolve(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        return { ...defaultConfig, ...fileConfig };
    }
    return defaultConfig;
};

const config = loadConfig('config.json');

export default config;
