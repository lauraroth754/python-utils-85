export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export interface AppConfig {
  host: string;
  port: number;
  retryLimit: number;
}

export const validateConfig = (config: unknown): AppConfig => {
  if (typeof config !== 'object' || config === null) {
    throw new ConfigurationError('Invalid configuration: root must be an object');
  }

  const { host, port, retryLimit } = config as Record<string, unknown>;

  if (typeof host !== 'string' || host.trim() === '') {
    throw new ConfigurationError('Invalid configuration: host must be a non-empty string');
  }

  if (typeof port !== 'number' || port < 1 || port > 65535) {
    throw new ConfigurationError('Invalid configuration: port must be between 1 and 65535');
  }

  if (typeof retryLimit !== 'number' || retryLimit < 0) {
    throw new ConfigurationError('Invalid configuration: retryLimit must be a non-negative integer');
  }

  return { host, port, retryLimit };
};

export const loadConfig = (input: unknown): AppConfig => {
  try {
    return validateConfig(input);
  } catch (error) {
    if (error instanceof ConfigurationError) {
      throw error;
    }
    throw new ConfigurationError('Unknown error during configuration validation');
  }
};