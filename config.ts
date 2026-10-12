export interface Config {
  port: number;
  host: string;
  debug: boolean;
}

export const DEFAULTS: Config = {
  port: 8080,
  host: 'localhost',
  debug: false,
};

export class ConfigLoader {
  private config: Config;

  constructor(overrides: Partial<Config> = {}) {
    this.config = { ...DEFAULTS, ...overrides };
  }

  public get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }

  public all(): Config {
    return Object.freeze({ ...this.config });
  }

  public static fromEnv(): ConfigLoader {
    const overrides: Partial<Config> = {
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
      host: process.env.HOST,
      debug: process.env.DEBUG === 'true',
    };

    const cleanOverrides = Object.fromEntries(
      Object.entries(overrides).filter(([_, v]) => v !== undefined)
    );

    return new ConfigLoader(cleanOverrides as Partial<Config>);
  }
}