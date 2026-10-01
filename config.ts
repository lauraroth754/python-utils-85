export interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: Config = {
  port: 8080,
  host: 'localhost',
  debug: false
};

export function loadConfig(overrides: Partial<Config> = {}): Config {
  return { ...defaults, ...overrides };
}

export function loadFromEnv(): Config {
  return loadConfig({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    host: process.env.HOST,
    debug: process.env.DEBUG === 'true'
  });
}