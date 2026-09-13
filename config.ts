interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: Config = {
  port: 8080,
  host: 'localhost',
  debug: false
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => {
  return {
    ...defaults,
    ...overrides,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : (overrides.port ?? defaults.port),
    host: process.env.HOST ?? overrides.host ?? defaults.host,
    debug: process.env.DEBUG === 'true' ?? overrides.debug ?? defaults.debug
  };
};