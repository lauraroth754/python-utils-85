export interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: Config = {
  port: 8080,
  host: 'localhost',
  debug: false,
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => {
  const envConfig: Partial<Config> = {
    ...(process.env.PORT ? { port: parseInt(process.env.PORT, 10) } : {}),
    ...(process.env.HOST ? { host: process.env.HOST } : {}),
    ...(process.env.DEBUG ? { debug: process.env.DEBUG === 'true' } : {}),
  };

  return { ...DEFAULT_CONFIG, ...overrides, ...envConfig };
};

export const validateConfig = (config: Config): void => {
  if (config.port < 1024 || config.port > 65535) {
    throw new Error('Invalid port range');
  }
};