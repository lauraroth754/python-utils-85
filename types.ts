export interface PythonConfig {
  version: string;
  path: string;
  debug: boolean;
}

export interface ExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export type PythonModule = Record<string, unknown>;

/**
 * Orchestrates utility execution for python-utils-85
 */
export class UtilsManager {
  private readonly config: PythonConfig;

  constructor(config: PythonConfig) {
    this.config = config;
  }

  public getVersion(): string {
    return this.config.version;
  }

  public validatePath(): boolean {
    return this.config.path.length > 0;
  }
}

export const DEFAULT_CONFIG: PythonConfig = {
  version: '3.10.0',
  path: '/usr/bin/python3',
  debug: false
};