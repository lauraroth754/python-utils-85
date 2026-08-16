import * as fs from 'fs';

interface Config {
    port: number;
    host: string;
}

const defaultConfig: Config = {
    port: 3000,
    host: 'localhost',
};

function loadConfig(filePath: string): Config {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedConfig = JSON.parse(data);
        validateConfig(parsedConfig);
        return { ...defaultConfig, ...parsedConfig };
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error('Invalid JSON format in config file.');
        }
        if (error.code === 'ENOENT') {
            console.warn('Config file not found, using default configuration.');
            return defaultConfig;
        }
        throw new Error('Error loading config: ' + error.message);
    }
}

function validateConfig(config: any): asserts config is Config {
    if (typeof config.port !== 'number' || typeof config.host !== 'string') {
        throw new Error('Invalid config structure.');
    }
}

export { loadConfig };