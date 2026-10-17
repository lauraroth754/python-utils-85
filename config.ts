export interface AppConfig {
  env: 'development' | 'production' | 'test';
  port: number;
  host: string;
  debug: boolean;
  timeout: number;
  maxRetries: number;
  customOptions?: Record<string, unknown>;
}

export const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  host: '127.0.0.1',
  debug: true,
  timeout: 5000,
  maxRetries: 3,
  customOptions: {},
};

export class ConfigLoader {
  private config: AppConfig;

  constructor(initialConfig: Partial<AppConfig> = {}) {
    this.config = this.mergeConfig(DEFAULT_CONFIG, initialConfig);
  }

  private mergeConfig(defaults: AppConfig, overrides: Partial<AppConfig>): AppConfig {
    return {
      ...defaults,
      ...overrides,
      customOptions: {
        ...defaults.customOptions,
        ...overrides.customOptions,
      },
    };
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public set<K extends keyof AppConfig>(key: K, value: AppConfig[K]): void {
    this.config[key] = value;
  }

  public getAll(): Readonly<AppConfig> {
    return Object.freeze({ ...this.config });
  }

  public reset(): void {
    this.config = { ...DEFAULT_CONFIG };
  }
}