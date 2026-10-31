export interface Config {
  host: string;
  port: number;
  debug: boolean;
}

const defaults: Config = {
  host: 'localhost',
  port: 8080,
  debug: false,
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => {
  return { ...defaults, ...overrides };
};

export const loadConfigFromEnv = (): Config => {
  return {
    host: process.env.APP_HOST || defaults.host,
    port: parseInt(process.env.APP_PORT || '', 10) || defaults.port,
    debug: process.env.APP_DEBUG === 'true' || defaults.debug,
  };
};