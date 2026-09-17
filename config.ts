export interface AppConfig {
  readonly environment: 'development' | 'production' | 'testing';
  readonly retryAttempts: number;
  readonly timeoutMs: number;
  readonly debug: boolean;
}

/**
 * Application configuration management and defaults.
 */
export const defaultConfig: AppConfig = {
  environment: 'development',
  retryAttempts: 3,
  timeoutMs: 5000,
  debug: true,
};

/**
 * Merges user provided overrides into the default configuration.
 */
export function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return { ...defaultConfig, ...overrides };
}

/**
 * Validation logic for environment settings.
 */
export function validateConfig(config: AppConfig): boolean {
  if (config.retryAttempts < 0) {
    return false;
  }
  return config.timeoutMs > 0;
}