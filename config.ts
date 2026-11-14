import fs from 'fs';

export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
};

export function loadConfig(path?: string): AppConfig {
  if (!path || !fs.existsSync(path)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const fileContent = fs.readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (error) {
    return { ...DEFAULT_CONFIG };
  }
}

export function validateConfig(config: AppConfig): boolean {
  return typeof config.port === 'number' && typeof config.host === 'string';
}