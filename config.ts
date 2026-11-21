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

export const loadConfig = (overrides: Partial<AppConfig> = {}): AppConfig => ({
  ...defaults,
  ...overrides,
});

export const getEnvConfig = (): AppConfig => ({
  host: process.env.APP_HOST ?? defaults.host,
  port: parseInt(process.env.APP_PORT ?? '', 10) || defaults.port,
  debug: process.env.APP_DEBUG === 'true',
});