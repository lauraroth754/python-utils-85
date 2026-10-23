export class ConfigError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

export const loadConfig = (data: unknown): AppConfig => {
  if (typeof data !== 'object' || data === null) {
    throw new ConfigError('Invalid configuration object', 'ERR_INVALID_TYPE');
  }

  const config = data as Record<string, unknown>;

  if (typeof config.host !== 'string' || !config.host) {
    throw new ConfigError('Missing or invalid host', 'ERR_INVALID_HOST');
  }

  if (typeof config.port !== 'number' || config.port < 1 || config.port > 65535) {
    throw new ConfigError('Invalid port range', 'ERR_INVALID_PORT');
  }

  return {
    host: config.host,
    port: config.port,
    debug: typeof config.debug === 'boolean' ? config.debug : false
  };
};

export const safeLoadConfig = (data: unknown): AppConfig | null => {
  try {
    return loadConfig(data);
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(`[${err.code}] ${err.message}`);
    }
    return null;
  }
};