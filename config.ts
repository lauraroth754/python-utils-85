export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export function parseEnvConfig(rawConfig: string): Record<string, string> {
  const result: Record<string, string> = Object.create(null);
  if (!rawConfig) {
    return result;
  }

  const lines = rawConfig.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const equalSignIndex = line.indexOf('=');
    if (equalSignIndex === -1) {
      throw new ConfigError(`Invalid line format at line ${i + 1}: Missing '=' delimiter`);
    }

    const key = line.slice(0, equalSignIndex).trim();
    const value = line.slice(equalSignIndex + 1).trim();

    if (!key) {
      throw new ConfigError(`Invalid line format at line ${i + 1}: Empty key`);
    }

    if (key === '__proto__' || key === 'constructor') {
      throw new ConfigError(`Security error at line ${i + 1}: Restricted property usage`);
    }

    result[key] = value;
  }

  return result;
}