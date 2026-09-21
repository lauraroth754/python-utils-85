interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const defaults: AppConfig = {
  host: 'localhost',
  port: 8080,
  debug: false,
};

export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...defaults, ...overrides };
}

export const config = loadConfig({
  port: parseInt(process.env.PORT || '0') || defaults.port,
  debug: process.env.DEBUG === 'true',
});