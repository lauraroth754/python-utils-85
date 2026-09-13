export interface AppConfig {
  env: string;
  port: number;
  timeout: number;
  verbose: boolean;
  features: Record<string, boolean>;
}

export const defaultConfig: AppConfig = {
  env: 'development',
  port: 8080,
  timeout: 5000,
  verbose: false,
  features: {
    cache: true,
    logging: true,
  },
};

export class ConfigLoader<T extends object> {
  private defaults: T;

  constructor(defaults: T) {
    this.defaults = structuredClone(defaults);
  }

  public load(overrides?: Partial<T> | Record<string, unknown>): T {
    if (!overrides) {
      return structuredClone(this.defaults);
    }
    return this.deepMerge(structuredClone(this.defaults), overrides);
  }

  private deepMerge<U extends object>(target: U, source: Record<string, unknown>): U {
    const result = { ...target } as Record<string, unknown>;

    for (const [key, value] of Object.entries(source)) {
      if (value === undefined) continue;

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        key in result &&
        typeof result[key] === 'object' &&
        result[key] !== null
      ) {
        result[key] = this.deepMerge(
          result[key] as Record<string, unknown>,
          value as Record<string, unknown>
        );
      } else {
        result[key] = value;
      }
    }

    return result as U;
  }
}

export function loadConfig<T extends object>(defaults: T, overrides?: Partial<T>): T {
  const loader = new ConfigLoader(defaults);
  return loader.load(overrides);
}