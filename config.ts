interface Config {
  host: string;
  port: number;
  debug: boolean;
}

const defaults: Config = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => {
  const envConfig = {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
    debug: process.env.APP_DEBUG === 'true',
  };

  const cleanEnv = Object.fromEntries(
    Object.entries(envConfig).filter(([, value]) => value !== undefined)
  );

  return {
    ...defaults,
    ...cleanEnv,
    ...overrides,
  } as Config;
};