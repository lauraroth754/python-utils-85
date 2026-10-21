export class ConfigError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export interface AppConfig {
  host: string;
  port: number;
}

export const validateConfig = (config: unknown): AppConfig => {
  if (!config || typeof config !== 'object') {
    throw new ConfigError('Invalid configuration object', 'INVALID_TYPE');
  }

  const { host, port } = config as Partial<AppConfig>;

  if (typeof host !== 'string' || host.length === 0) {
    throw new ConfigError('Host must be a non-empty string', 'INVALID_HOST');
  }

  if (typeof port !== 'number' || port < 1 || port > 65535) {
    throw new ConfigError('Port must be a valid number between 1 and 65535', 'INVALID_PORT');
  }

  return { host, port };
};

export const loadConfig = (raw: string): AppConfig => {
  try {
    const parsed = JSON.parse(raw);
    return validateConfig(parsed);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ConfigError('Malformed JSON configuration', 'PARSE_FAILURE');
    }
    throw error;
  }
};