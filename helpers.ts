import * as fs from 'fs';

export interface Config {
  [key: string]: any;
}

export class ConfigLoader {
  private config: Config;

  constructor(defaults: Config = {}) {
    this.config = { ...defaults };
  }

  public loadFromFile(filePath: string): void {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      this.config = { ...this.config, ...parsed };
    } catch (error) {
      console.error(`Failed to load config from ${filePath}:`, error);
    }
  }

  public get<T>(key: string, fallback?: T): T {
    return this.config.hasOwnProperty(key) ? this.config[key] : fallback!;
  }

  public getAll(): Config {
    return { ...this.config };
  }
}