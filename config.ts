export interface AppConfig {
  host: string;
  port: number;
  env: 'development' | 'production' | 'test';
  debug: boolean;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  host: 'localhost',
  port: 8080,
  env: 'development',
  debug: false,
  timeout: 5000,
};

export function loadConfig(customConfig: Partial<AppConfig> = {}): AppConfig {
  const envPort = typeof process !== 'undefined' && process.env?.PORT ? parseInt(process.env.PORT, 10) : undefined;
  const envDebug = typeof process !== 'undefined' && process.env?.DEBUG ? process.env.DEBUG === 'true' : undefined;
  const envNodeEnv = typeof process !== 'undefined' && process.env?.NODE_ENV as AppConfig['env'] | undefined;

  const envConfig: Partial<AppConfig> = {};
  if (envPort !== undefined && !isNaN(envPort)) envConfig.port = envPort;
  if (envDebug !== undefined) envConfig.debug = envDebug;
  if (envNodeEnv !== undefined && ['development', 'production', 'test'].includes(envNodeEnv)) {
    envConfig.env = envNodeEnv;
  }

  return {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...customConfig,
  };
}