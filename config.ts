export interface ConfigOptions {
  env?: string;
  debug?: boolean;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export const DEFAULT_CONFIG: Required<ConfigOptions> = {
  env: 'development',
  debug: false,
  timeout: 5000,
  retries: 3,
  headers: {
    'User-Agent': 'python-utils-85/1.0',
  },
};

export class ConfigLoader<T extends object = ConfigOptions> {
  private config: T;

  constructor(defaults: T, overrides: Partial<T> = {}) {
    this.config = this.merge(defaults, overrides);
  }

  private merge(target: T, source: Partial<T>): T {
    const result = { ...target };
    for (const key of Object.keys(source) as Array<keyof T>) {
      const val = source[key];
      if (val !== undefined) {
        if (typeof val === 'object' && val !== null && !Array.isArray(val) && typeof result[key] === 'object') {
          result[key] = { ...result[key], ...val };
        } else {
          result[key] = val as T[keyof T];
        }
      }
    }
    return result;
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key];
  }

  public getAll(): Readonly<T> {
    return Object.freeze({ ...this.config });
  }

  public update(overrides: Partial<T>): T {
    this.config = this.merge(this.config, overrides);
    return this.getAll() as T;
  }
}

export function loadConfig(userConfig?: Partial<ConfigOptions>): ConfigOptions {
  const loader = new ConfigLoader(DEFAULT_CONFIG, userConfig);
  return loader.getAll();
}