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
  const envConfig: Partial<Config> = {
    ...(process.env.PORT && { port: parseInt(process.env.PORT, 10) }),
    ...(process.env.HOST && { host: process.env.HOST }),
    ...(process.env.DEBUG && { debug: process.env.DEBUG === 'true' })
  };

  return {
    ...defaults,
    ...overrides,
    ...envConfig
  };
};

export type { Config };