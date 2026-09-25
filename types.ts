export interface PythonProcessResult {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
}

export interface ExecutionOptions {
  readonly timeout?: number;
  readonly env?: Record<string, string>;
  readonly cwd?: string;
}

export type PythonVersion = '2.7' | '3.8' | '3.9' | '3.10' | '3.11' | '3.12';

/**
 * Configuration schema for python interpreter discovery.
 */
export interface InterpreterConfig {
  readonly binaryPath: string;
  readonly version: PythonVersion;
  readonly virtualEnvPath?: string;
}

/**
 * Represents a mapped Python object structure.
 */
export type PythonMapping = Record<string, unknown>;

export interface TaskContext {
  readonly id: string;
  readonly payload: PythonMapping;
  readonly retryCount: number;
}

export class PythonExecutionError extends Error {
  constructor(
    public readonly message: string,
    public readonly exitCode: number,
    public readonly output: string
  ) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}