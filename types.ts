export type PythonVersion = '2.7' | '3.8' | '3.9' | '3.10' | '3.11' | '3.12';

export interface ScriptConfig {
  readonly entryPoint: string;
  readonly envVars: Record<string, string>;
  readonly timeoutMs: number;
}

export interface ExecutionResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
  readonly durationMs: number;
}

/**
 * Represents the interface for Python interpreter settings.
 */
export interface InterpreterSettings {
  readonly path: string;
  readonly version: PythonVersion;
  readonly venvPath?: string;
}

export type ProcessHandler = (result: ExecutionResult) => void;

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: ReadonlyArray<string>;
}

/**
 * Configuration for utility service initialization.
 */
export interface ServiceConfiguration {
  readonly cacheEnabled: boolean;
  readonly maxRetries: number;
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
}