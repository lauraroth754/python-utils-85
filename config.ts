export interface AppConfig {
  readonly environment: 'development' | 'production' | 'staging';
  readonly debug: boolean;
  readonly timeout: number;
}

/**
 * Application configuration management utilities.
 */
export class ConfigManager {
  private readonly config: AppConfig;

  constructor(config: AppConfig) {
    this.config = Object.freeze({ ...config });
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public isProduction(): boolean {
    return this.config.environment === 'production';
  }

  public static createDefault(): ConfigManager {
    return new ConfigManager({
      environment: 'development',
      debug: true,
      timeout: 5000,
    });
  }
}