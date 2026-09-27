export interface Config {
  readonly environment: 'development' | 'production';
  readonly apiTimeout: number;
  readonly retryAttempts: number;
}

/**
 * Application configuration settings for python-utils-85
 */
export const appConfig: Config = {
  environment: 'production',
  apiTimeout: 5000,
  retryAttempts: 3,
};

/**
 * Retrieves a specific configuration value safely
 * @param key - The key of the config property
 * @returns The configuration value or undefined
 */
export function getConfigValue<K extends keyof Config>(key: K): Config[K] {
  return appConfig[key];
}