export interface AppConfig {
  version: string;
  debug: boolean;
  timeoutMs: number;
  retryAttempts: number;
}

export const defaultConfig: AppConfig = {
  version: '1.0.0',
  debug: false,
  timeoutMs: 5000,
  retryAttempts: 3,
};

/**
 * Merges partial user configuration with application defaults
 */
export function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return { ...defaultConfig, ...overrides };
}

/**
 * Validates the provided configuration object for required values
 */
export function validateConfig(config: AppConfig): boolean {
  return (
    typeof config.timeoutMs === 'number' &&
    config.timeoutMs > 0 &&
    typeof config.retryAttempts === 'number'
  );
}