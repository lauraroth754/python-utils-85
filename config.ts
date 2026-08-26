export interface ConfigOptions {
  [key: string]: unknown;
}

export class ConfigLoader {
  private config: ConfigOptions;

  constructor(defaults: ConfigOptions = {}) {
    this.config = { ...defaults };
  }

  public get<T>(key: string, fallback: T): T {
    return (this.config[key] as T) ?? fallback;
  }

  public set(key: string, value: unknown): void {
    this.config[key] = value;
  }

  public load(newConfig: ConfigOptions): void {
    this.config = { ...this.config, ...newConfig };
  }

  public all(): ConfigOptions {
    return { ...this.config };
  }
}

export function createConfig(defaults?: ConfigOptions): ConfigLoader {
  return new ConfigLoader(defaults);
}
