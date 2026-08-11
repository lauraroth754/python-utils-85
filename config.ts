export interface Config {  host: string;  port: number;  username: string;  password: string;  database: string;}

export class ConfigLoader {  private config: Config;
  constructor(configPath: string) {    this.config = this.loadConfig(configPath);  }

  private loadConfig(path: string): Config {    try {      const data = require(path);      this.validateConfig(data);      return data;    } catch (error) {      throw new Error(`Failed to load config: ${error.message}`);    }
  }

  private validateConfig(config: any): void {    const requiredFields = ['host', 'port', 'username', 'password', 'database'];    for (const field of requiredFields) {      if (!config[field]) {        throw new Error(`Missing required config field: ${field}`);      }    }  }

  public getConfig(): Config {    return this.config;  }}