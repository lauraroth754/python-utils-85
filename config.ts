import { readFileSync } from 'fs';

export interface Config {
  port: number;
  debug: boolean;
  host: string;
}

const defaults: Config = {
  port: 8080,
  debug: false,
  host: 'localhost'
};

export const loadConfig = (path?: string): Config => {
  if (!path) return defaults;

  try {
    const raw = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch (error) {
    return defaults;
  }
};

export const config = loadConfig(process.env.CONFIG_PATH);