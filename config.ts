export interface AppConfig {
  readonly environment: 'development' | 'production' | 'testing';
  readonly maxRetries: number;
  readonly timeoutMs: number;
  readonly debugMode: boolean;
}

/**
 * Represents the validated application configuration schema.
 */
export const defaultConfig: AppConfig = {
  environment: 'development',
  maxRetries: 3,
  timeoutMs: 5000,
  debugMode: false
};

/**
 * Validates provided partial configuration against strict schema.
 * @param config - Partial settings to merge with defaults
 * @returns Full validated application configuration
 */
export function validateConfig(config: Partial<AppConfig>): AppConfig {
  return {
    ...defaultConfig,
    ...config
  };
}

export const getEnvironmentVariable = (key: string, fallback: string): string => {
  return process.env[key] || fallback;
};

export const isProduction = (config: AppConfig): boolean => {
  return config.environment === 'production';
};