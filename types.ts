export interface ProcessResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface ExecutionOptions {
  timeout?: number;
  cwd?: string;
  env?: Record<string, string>;
}

export type PythonVersion = '3.8' | '3.9' | '3.10' | '3.11' | '3.12';

export interface EnvironmentConfig {
  venvPath: string;
  pythonExecutable: string;
  version: PythonVersion;
}

export interface RegistryMap {
  [key: string]: string | number | boolean;
}

export class PythonUtilsError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}