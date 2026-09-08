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
    host: process.env.HOST || defaults.host,
    port: parseInt(process.env.PORT || '', 10) || defaults.port,
    debug: process.env.DEBUG === 'true',
  };
};