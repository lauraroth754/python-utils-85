import fs from 'fs';

export interface Config {
  port: number;
  debug: boolean;
  host: string;
}

const DEFAULTS: Config = {
  port: 8080,
  debug: false,
  host: 'localhost',
};

export function loadConfig(path: string): Config {
  try {
    if (!fs.existsSync(path)) return DEFAULTS;
    const data = fs.readFileSync(path, 'utf-8');
    const parsed = JSON.parse(data);
    return { ...DEFAULTS, ...parsed };
  } catch (error) {
    return DEFAULTS;
  }
}

export const config = loadConfig('./config.json');