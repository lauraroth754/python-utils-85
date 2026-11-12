export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  host: string;
  timeoutMs: number;
  enableLogging: boolean;
  maxRetries: number;
}

const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  host: 'localhost',
  timeoutMs: 5000,
  enableLogging: true,
  maxRetries: 3
};

export class ConfigLoader {
  private currentConfig: AppConfig;

  constructor(initialOverrides: Partial<AppConfig> = {}) {
    this.currentConfig = { ...DEFAULT_CONFIG, ...initialOverrides };
  }

  public loadFromEnv(envSource: Record<string, string | undefined> = process.env): AppConfig {
    const envOverrides: Partial<AppConfig> = {};

    if (envSource.APP_ENV) {
      const env = envSource.APP_ENV.toLowerCase();
      if (env === 'development' || env === 'staging' || env === 'production') {
        envOverrides.env = env;
      }
    }
    if (envSource.APP_PORT && !isNaN(Number(envSource.APP_PORT))) {
      envOverrides.port = Number(envSource.APP_PORT);
    }
    if (envSource.APP_HOST) {
      envOverrides.host = envSource.APP_HOST;
    }
    if (envSource.APP_TIMEOUT_MS && !isNaN(Number(envSource.APP_TIMEOUT_MS))) {
      envOverrides.timeoutMs = Number(envSource.APP_TIMEOUT_MS);
    }
    if (envSource.APP_LOGGING !== undefined) {
      envOverrides.enableLogging = envSource.APP_LOGGING === 'true' || envSource.APP_LOGGING === '1';
    }

    this.currentConfig = this.mergeWithDefaults(envOverrides);
    return this.get();
  }

  public mergeWithDefaults(overrides: Partial<AppConfig>): AppConfig {
    return {
      ...DEFAULT_CONFIG,
      ...this.currentConfig,
      ...overrides
    };
  }

  public get(): AppConfig {
    return { ...this.currentConfig };
  }

  public getValue<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.currentConfig[key];
  }
}