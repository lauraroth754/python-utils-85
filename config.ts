interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
};

export const loadConfig = (overrides: Partial<AppConfig> = {}): AppConfig => ({
  ...DEFAULT_CONFIG,
  ...overrides,
});

export const getConfigFromEnv = (): AppConfig => {
  const portEnv = process.env.PORT;
  return {
    ...DEFAULT_CONFIG,
    host: process.env.HOST || DEFAULT_CONFIG.host,
    port: portEnv ? parseInt(portEnv, 10) : DEFAULT_CONFIG.port,
    debug: process.env.DEBUG === 'true',
  };
};