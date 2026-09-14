export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

export class ConfigLoader {
  public static load(overrides: Partial<AppConfig> = {}): AppConfig {
    return { ...defaults, ...overrides };
  }

  public static fromEnv(): AppConfig {
    return {
      port: parseInt(process.env.PORT || '') || defaults.port,
      host: process.env.HOST || defaults.host,
      debug: process.env.DEBUG === 'true',
    };
  }
}