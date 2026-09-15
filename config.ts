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

export const getEnvConfig = (): AppConfig => {
  return loadConfig({
    host: process.env.APP_HOST,
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
    debug: process.env.APP_DEBUG === 'true',
  } as Partial<AppConfig>);
};