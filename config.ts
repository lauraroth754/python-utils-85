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
  if (typeof config !== 'object' || config === null) {
    throw new ConfigurationError('Invalid configuration object');
  }

  const { host, port } = config as Record<string, unknown>;

  if (typeof host !== 'string' || host.trim().length === 0) {
    throw new ConfigurationError('Host must be a non-empty string');
  }

  if (typeof port !== 'number' || port < 1 || port > 65535) {
    throw new ConfigurationError('Port must be a number between 1 and 65535');
  }

  return { host, port };
};

export const loadConfig = (env: Record<string, string | undefined>): AppConfig => {
  try {
    return validateConfig({
      host: env.APP_HOST ?? 'localhost',
      port: parseInt(env.APP_PORT ?? '8080', 10),
    });
  } catch (err) {
    if (err instanceof ConfigurationError) {
      console.error(`Config validation failed: ${err.message}`);
    }
    throw err;
  }
};