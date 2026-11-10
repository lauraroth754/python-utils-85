export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export interface AppConfig {
  host: string;
  port: number;
}

export const validateConfig = (config: unknown): AppConfig => {
  if (!config || typeof config !== 'object') {
    throw new ConfigurationError('Config must be an object');
  }

  const { host, port } = config as Partial<AppConfig>;

  if (typeof host !== 'string' || host.trim() === '') {
    throw new ConfigurationError('Invalid host configuration');
  }

  if (typeof port !== 'number' || port < 1 || port > 65535) {
    throw new ConfigurationError('Port must be between 1 and 65535');
  }

  return { host, port };
};

export const getSafeConfig = (raw: unknown): AppConfig => {
  try {
    return validateConfig(raw);
  } catch (err) {
    if (err instanceof ConfigurationError) {
      console.error(`Config validation failure: ${err.message}`);
    }
    throw err;
  }
};