export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
  db: {
    uri: string;
    timeout: number;
  };
}

const DEFAULT_CONFIG: AppConfig = {
  host: 'localhost',
  port: 8080,
  debug: false,
  db: {
    uri: 'mongodb://localhost:27017/db',
    timeout: 5000,
  },
};

export class ConfigLoader<T extends object> {
  private defaults: T;

  constructor(defaults: T) {
    this.defaults = defaults;
  }

  public load(customConfig: Partial<T> = {}): T {
    return this.merge(this.defaults, customConfig);
  }

  private merge(target: any, source: any): any {
    const output = { ...target };
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.merge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  private isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}

export const appConfigLoader = new ConfigLoader<AppConfig>(DEFAULT_CONFIG);