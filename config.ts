export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const defaults: AppConfig = {
  host: 'localhost',
  port: 8080,
  debug: false,
};

export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...defaults, ...overrides };
}

export function loadConfigFromEnv(): AppConfig {
  return {
    host: process.env.APP_HOST || defaults.host,
    port: parseInt(process.env.APP_PORT || '', 10) || defaults.port,
    debug: process.env.APP_DEBUG === 'true' || defaults.debug,
  };
}