interface AppConfig {
    appName: string;
    appPort: number;
    databaseURL: string;
    enableLogging: boolean;
}

const config: AppConfig = {
    appName: "MyApp",
    appPort: 3000,
    databaseURL: "mongodb://localhost:27017/myapp",
    enableLogging: true,
};

function getConfig(): AppConfig {
    return config;
}

function setConfig(newConfig: Partial<AppConfig>): void {
    Object.assign(config, newConfig);
}

export { AppConfig, getConfig, setConfig };