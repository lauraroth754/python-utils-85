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
    throw new ConfigurationError('invalid configuration structure');
  }

  const { host, port } = config as Partial<AppConfig>;

  if (typeof host !== 'string' || host.trim().length === 0) {
    throw new ConfigurationError('missing or empty host');
  }

  if (typeof port !== 'number' || port < 1 || port > 65535) {
    throw new ConfigurationError('invalid port number range');
  }

  return { host, port };
};

export const loadConfig = (env: Record<string, string | undefined>): AppConfig => {
  try {
    return validateConfig({
      host: env.APP_HOST ?? 'localhost',
      port: env.APP_PORT ? parseInt(env.APP_PORT, 10) : 8080,
    });
  } catch (err) {
    if (err instanceof ConfigurationError) {
      console.error(`config validation failed: ${err.message}`);
    }
    throw err;
  }
};