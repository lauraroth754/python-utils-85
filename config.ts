export interface AppConfig {
  readonly environment: 'development' | 'production';
  readonly retryAttempts: number;
  readonly timeoutMs: number;
}

/**
 * Application configuration management utility.
 */
export const defaultConfig: AppConfig = {
  environment: 'production',
  retryAttempts: 3,
  timeoutMs: 5000,
};

/**
 * Merges partial configuration with defaults.
 * @param overrides Partial configuration options
 * @returns Full application configuration object
 */
export function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return {
    ...defaultConfig,
    ...overrides,
  };
}

/**
 * Validates if the configuration is secure for production.
 * @param config The application configuration to check
 * @returns Boolean indicating if config is production ready
 */
export function isProductionReady(config: AppConfig): boolean {
  return config.environment === 'production' && config.timeoutMs >= 1000;
}