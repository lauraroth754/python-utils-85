export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
  timeout: number;
  retries: number;
  env: 'development' | 'production' | 'test';
}

export const DEFAULT_CONFIG: AppConfig = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
  timeout: 5000,
  retries: 3,
  env: 'development',
};

export class ConfigLoader<T extends object> {
  private readonly defaults: T;
  private currentConfig: T;

  constructor(defaults: T) {
    this.defaults = Object.freeze({ ...defaults });
    this.currentConfig = { ...this.defaults };
  }

  public load(overrides: Partial<T> = {}): T {
    this.currentConfig = {
      ...this.defaults,
      ...overrides,
    };
    return this.get();
  }

  public get(): T;
  public get<K extends keyof T>(key: K): T[K];
  public get<K extends keyof T>(key?: K): T | T[K] {
    if (key !== undefined) {
      return this.currentConfig[key];
    }
    return { ...this.currentConfig };
  }

  public reset(): T {
    this.currentConfig = { ...this.defaults };
    return this.get();
  }
}

export const defaultConfigLoader = new ConfigLoader<AppConfig>(DEFAULT_CONFIG);