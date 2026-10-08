export interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULTS: Config = {
  port: 3000,
  host: 'localhost',
  debug: false
};

export function loadConfig(overrides: Partial<Config> = {}): Config {
  return { ...DEFAULTS, ...overrides };
}

export const config = loadConfig({
  port: parseInt(process.env.PORT || '') || DEFAULTS.port,
  host: process.env.HOST || DEFAULTS.host,
  debug: process.env.DEBUG === 'true'
});