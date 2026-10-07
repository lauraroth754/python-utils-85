export interface PythonConfig {
  version: string;
  virtualEnv: string;
  isAsync: boolean;
}

export interface ExecutionResult {
  output: string;
  exitCode: number;
  durationMs: number;
}

export type PythonCommand = string | string[];

export interface RunnerOptions {
  timeout?: number;
  env?: Record<string, string>;
  cwd?: string;
}

/**
 * Represents a standard error structure for script execution
 */
export class PythonExecutionError extends Error {
  constructor(
    public readonly code: number,
    public readonly output: string,
    message: string = 'Python execution failed'
  ) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}

export type Nullable<T> = T | null | undefined;

export interface DependencyManifest {
  name: string;
  version: string;
  extras?: string[];
}