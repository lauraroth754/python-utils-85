export interface ConfigOptions<T> {
  defaults: T;
  envPrefix?: string;
}

export class ConfigLoader<T extends Record<string, unknown>> {
  private readonly defaults: T;
  private readonly envPrefix: string;

  constructor(options: ConfigOptions<T>) {
    this.defaults = options.defaults;
    this.envPrefix = options.envPrefix ? `${options.envPrefix}_` : '';
  }

  private isObject(item: unknown): item is Record<string, unknown> {
    return Boolean(item && typeof item === 'object' && !Array.isArray(item));
  }

  private merge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
    const output = { ...target };
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        output[key] = this.merge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        output[key] = sourceValue;
      }
    }
    return output;
  }

  public load(overrides: Partial<T> = {}): T {
    return this.merge(
      this.defaults as Record<string, unknown>,
      overrides as Record<string, unknown>
    ) as T;
  }
}