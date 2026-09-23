import fs from 'fs';
import path from 'path';

interface Config {
  port: number;
  debug: boolean;
  host: string;
}

const DEFAULT_CONFIG: Config = {
  port: 8080,
  debug: false,
  host: 'localhost',
};

export const loadConfig = (configPath?: string): Config => {
  if (!configPath || !fs.existsSync(configPath)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const fileContent = fs.readFileSync(path.resolve(configPath), 'utf-8');
    const parsed = JSON.parse(fileContent);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (error) {
    return { ...DEFAULT_CONFIG };
  }
};

export const getEnvOrDefault = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};