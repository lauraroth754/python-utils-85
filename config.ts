export interface AppConfig {
  host: string;
  port: number;
  timeout: number;
  debug: boolean;
  retries: number;
  [key: string]: unknown;
}

export const DEFAULT_CONFIG: AppConfig = {
  host: '127.0.0.1',
  port: 8000,
  timeout: 5000,
  debug: false,
  retries: 3,
};

export class ConfigLoader<T extends Record<string, unknown>> {
  private config: T;

  constructor(defaults: T, overrides?: Partial<T>) {
    this.config = { ...defaults, ...overrides };
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key];
  }

  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.config[key] = value;
  }

  public loadFromObject(overrides: Partial<T>): T {
    this.config = { ...this.config, ...overrides };
    return this.getAll();
  }

  public loadFromJSON(jsonString: string): T {
    try {
      const parsed = JSON.parse(jsonString) as Partial<T>;
      return this.loadFromObject(parsed);
    } catch {
      throw new Error('Failed to parse configuration JSON');
    }
  }

  public getAll(): T {
    return { ...this.config };
  }
}