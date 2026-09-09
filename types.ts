export interface PythonProcessResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

export interface ExecutionOptions {
  readonly timeout?: number;
  readonly env?: Record<string, string>;
  readonly cwd?: string;
}

export interface PythonModuleConfig {
  readonly name: string;
  readonly version: string;
  readonly dependencies: ReadonlyArray<string>;
}

export type PythonRuntime = 'python3' | 'pypy3' | 'python3.11';

/**
 * Orchestrates external python process lifecycle
 */
export interface IProcessManager {
  execute(command: string, options?: ExecutionOptions): Promise<PythonProcessResult>;
  validateRuntime(runtime: PythonRuntime): Promise<boolean>;
}

export class PythonRuntimeError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
    this.name = 'PythonRuntimeError';
  }
}