export interface ConfigOptions<T extends object> {
  defaults: T;
  envPrefix?: string;
}

export class ConfigLoader<T extends object> {
  private defaults: T;
  private envPrefix: string;

  constructor(options: ConfigOptions<T>) {
    this.defaults = options.defaults;
    this.envPrefix = options.envPrefix || '';
  }

  private deepMerge<U extends object>(target: U, source: Partial<U>): U {
    const result = { ...target };
    for (const key of Object.keys(source) as Array<keyof U>) {
      const sourceVal = source[key];
      const targetVal = target[key];

      if (
        sourceVal &&
        typeof sourceVal === 'object' &&
        !Array.isArray(sourceVal) &&
        targetVal &&
        typeof targetVal === 'object' &&
        !Array.isArray(targetVal)
      ) {
        result[key] = this.deepMerge(
          targetVal as object,
          sourceVal as object
        ) as U[keyof U];
      } else if (sourceVal !== undefined) {
        result[key] = sourceVal as U[keyof U];
      }
    }
    return result;
  }

  public load(overrides: Partial<T> = {}): T {
    const envOverrides: Partial<T> = {};
    if (typeof process !== 'undefined' && process.env && this.envPrefix) {
      for (const key of Object.keys(this.defaults) as Array<keyof T>) {
        const envKey = `${this.envPrefix}${String(key).toUpperCase()}`;
        const envValue = process.env[envKey];
        if (envValue !== undefined) {
          try {
            (envOverrides as Record<string, unknown>)[key as string] = JSON.parse(envValue);
          } catch {
            (envOverrides as Record<string, unknown>)[key as string] = envValue;
          }
        }
      }
    }
    const mergedEnv = this.deepMerge(this.defaults, envOverrides);
    return this.deepMerge(mergedEnv, overrides);
  }
}

export function createConfigLoader<T extends object>(
  defaults: T,
  envPrefix?: string
): ConfigLoader<T> {
  return new ConfigLoader({ defaults, envPrefix });
}
