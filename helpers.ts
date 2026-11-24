export interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULTS: Config = {
  port: 8080,
  host: 'localhost',
  debug: false
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => {
  return { ...DEFAULTS, ...overrides };
};

export const getEnvConfig = (): Config => {
  return {
    port: parseInt(process.env.PORT || '') || DEFAULTS.port,
    host: process.env.HOST || DEFAULTS.host,
    debug: process.env.DEBUG === 'true'
  };
};