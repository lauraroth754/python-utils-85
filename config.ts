export interface ConfigOptions {
  env?: string;
  port?: number;
  host?: string;
  debug?: boolean;
  timeout?: number;
  [key: string]: unknown;
}

export const DEFAULT_CONFIG: Required<ConfigOptions> = {
  env: 'development',
  port: 8080,
  host: 'localhost',
  debug: false,
  timeout: 5000,
};

export class ConfigLoader<T extends ConfigOptions = ConfigOptions> {
  private config: T;

  constructor(defaults: T = DEFAULT_CONFIG as unknown as T) {
    this.config = { ...defaults };
  }

  public load(overrides: Partial<T> = {}): T {
    this.config = {
      ...this.config,
      ...overrides,
    };
    return this.get();
  }

  public get<K extends keyof T>(key?: K): K extends undefined ? T : T[K] {
    if (key === undefined) {
      return { ...this.config } as any;
    }
    return this.config[key] as any;
  }

  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.config[key] = value;
  }

  public reset(defaults: T = DEFAULT_CONFIG as unknown as T): void {
    this.config = { ...defaults };
  }
}

export function loadConfig<T extends ConfigOptions>(
  overrides?: Partial<T>,
  defaults?: T
): T {
  const loader = new ConfigLoader<T>(defaults);
  return loader.load(overrides);
}
