import { readFileSync } from 'fs';

interface Config {
  host: string;
  port: number;
  debug: boolean;
}

const DEFAULTS: Config = {
  host: '127.0.0.1',
  port: 8080,
  debug: false
};

export const loadConfig = (path?: string): Config => {
  if (!path) return DEFAULTS;
  try {
    const data = JSON.parse(readFileSync(path, 'utf-8'));
    return { ...DEFAULTS, ...data };
  } catch (error) {
    return DEFAULTS;
  }
};

export const validateConfig = (config: Config): boolean => {
  return typeof config.port === 'number' && typeof config.host === 'string';
};