export interface ConfigOptions {
  port: number;
  host: string;
  timeoutMs: number;
  retries: number;
  debug: boolean;
}

export class ConfigError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

const DEFAULT_CONFIG: ConfigOptions = {
  port: 8080,
  host: 'localhost',
  timeoutMs: 5000,
  retries: 3,
  debug: false,
};

export function parseConfig(input?: string | Record<string, unknown>): ConfigOptions {
  if (input === null || input === undefined) {
    return { ...DEFAULT_CONFIG };
  }

  let raw: Record<string, unknown>;

  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (trimmed === '') {
      return { ...DEFAULT_CONFIG };
    }
    try {
      raw = JSON.parse(trimmed);
    } catch (err) {
      throw new ConfigError(
        `Failed to parse config JSON: ${(err as Error).message}`,
        'INVALID_JSON'
      );
    }
  } else if (typeof input === 'object' && !Array.isArray(input)) {
    raw = input;
  } else {
    throw new ConfigError('Config input must be a JSON string or object', 'INVALID_INPUT');
  }

  const port = raw.port !== undefined ? Number(raw.port) : DEFAULT_CONFIG.port;
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new ConfigError(`Invalid port number: ${raw.port}`, 'INVALID_PORT');
  }

  const timeoutMs = raw.timeoutMs !== undefined ? Number(raw.timeoutMs) : DEFAULT_CONFIG.timeoutMs;
  if (isNaN(timeoutMs) || timeoutMs < 0) {
    throw new ConfigError(`Invalid timeout value: ${raw.timeoutMs}`, 'INVALID_TIMEOUT');
  }

  const retries = raw.retries !== undefined ? Number(raw.retries) : DEFAULT_CONFIG.retries;
  if (!Number.isInteger(retries) || retries < 0) {
    throw new ConfigError(`Invalid retries count: ${raw.retries}`, 'INVALID_RETRIES');
  }

  const host = typeof raw.host === 'string' && raw.host.trim() !== '' ? raw.host.trim() : DEFAULT_CONFIG.host;
  const debug = typeof raw.debug === 'boolean' ? raw.debug : Boolean(raw.debug ?? DEFAULT_CONFIG.debug);

  return { port, host, timeoutMs, retries, debug };
}