export interface ConfigOptions<T> {
  defaultValue?: T;
  required?: boolean;
  parser?: (val: string) => T;
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(`[ConfigError] ${message}`);
    this.name = "ConfigError";
  }
}

export function getEnv(key: string): string;
export function getEnv<T>(key: string, options: ConfigOptions<T>): T;
export function getEnv<T>(key: string, options?: ConfigOptions<T>): string | T {
  const value = typeof process !== "undefined" ? process.env[key] : undefined;

  if (value === undefined || value === "") {
    if (options?.required) {
      throw new ConfigError(`Required environment variable "${key}" is missing or empty`);
    }
    if (options && "defaultValue" in options) {
      return options.defaultValue as T;
    }
    return "" as unknown as T;
  }

  if (options?.parser) {
    try {
      return options.parser(value);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new ConfigError(`Failed to parse variable "${key}": ${message}`);
    }
  }

  return value as unknown as T;
}

export const parsers = {
  boolean: (val: string): boolean => {
    const normalized = val.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off"].includes(normalized)) return false;
    throw new Error(`invalid boolean value: "${val}"`);
  },
  integer: (val: string): number => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || !/^-?\d+$/.test(val.trim())) {
      throw new Error(`invalid integer value: "${val}"`);
    }
    return parsed;
  },
  json: <T>(val: string): T => {
    try {
      return JSON.parse(val) as T;
    } catch {
      throw new Error("invalid json structure");
    }
  }
};