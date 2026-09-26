export interface AppConfig {
  readonly environment: 'development' | 'production';
  readonly retryAttempts: number;
  readonly timeoutMs: number;
}

/**
 * Application configuration management
 */
export const defaultConfig: AppConfig = {
  environment: 'development',
  retryAttempts: 3,
  timeoutMs: 5000,
};

/**
 * Validates provided partial configuration against strict types
 */
export const createConfig = (overrides: Partial<AppConfig>): AppConfig => {
  return {
    ...defaultConfig,
    ...overrides,
  };
};

/**
 * Retrieves system environment settings
 */
export const getEnvironment = (config: AppConfig): string => {
  return config.environment;
};

/**
 * Formats timeout duration for network requests
 */
export const getTimeoutSeconds = (config: AppConfig): number => {
  return config.timeoutMs / 1000;
};