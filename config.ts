interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const defaults: AppConfig = {
  host: '127.0.0.1',
  port: 8000,
  debug: false,
};

export const loadConfig = (overrides: Partial<AppConfig> = {}): AppConfig => {
  const envConfig: Partial<AppConfig> = {
    ...(process.env.HOST && { host: process.env.HOST }),
    ...(process.env.PORT && { port: parseInt(process.env.PORT, 10) }),
    ...(process.env.DEBUG && { debug: process.env.DEBUG === 'true' }),
  };

  return { ...defaults, ...envConfig, ...overrides };
};

export type { AppConfig };