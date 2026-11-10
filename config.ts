import fs from 'fs';

interface Config {
  port: number;
  debug: boolean;
  host: string;
}

const DEFAULTS: Config = {
  port: 8080,
  debug: false,
  host: 'localhost',
};

export const loadConfig = (path: string): Config => {
  try {
    if (!fs.existsSync(path)) return DEFAULTS;
    const fileContent = fs.readFileSync(path, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return { ...DEFAULTS, ...parsed };
  } catch (error) {
    console.error('Failed to load config, using defaults');
    return DEFAULTS;
  }
};

export const validateConfig = (config: Config): void => {
  if (config.port < 1 || config.port > 65535) {
    throw new Error('Invalid port range');
  }
};