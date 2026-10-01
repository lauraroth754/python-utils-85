/**
 * Service layer for managing Python utility execution tasks.
 */

export interface ExecutionOptions {
  timeoutMs?: number;
  env?: Record<string, string>;
  pythonPath?: string;
}

export interface ExecutionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  executionTimeMs: number;
}

/**
 * Manages Python subprocess execution and result formatting.
 */
export class PythonRunnerService {
  private defaultPythonPath: string;

  /**
   * Initializes runner service with default Python interpreter path.
   * @param pythonPath Path to Python executable.
   */
  constructor(pythonPath: string = 'python3') {
    this.defaultPythonPath = pythonPath;
  }

  /**
   * Constructs argument array for command execution.
   * @param scriptPath Path to Python script.
   * @param args Additional arguments.
   */
  public buildArgs(scriptPath: string, args: string[]): string[] {
    return [scriptPath, ...args];
  }

  /**
   * Executes a task with timeout and structured result handling.
   * @param executionFn Async function running the process.
   * @param options Execution settings including timeout.
   */
  public async runTask<T>(
    executionFn: () => Promise<T>,
    options: ExecutionOptions = {}
  ): Promise<ExecutionResult<T>> {
    const start = Date.now();
    const timeout = options.timeoutMs ?? 5000;

    try {
      const timer = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Process execution timed out')), timeout)
      );
      const data = await Promise.race([executionFn(), timer]);
      return {
        success: true,
        data,
        executionTimeMs: Date.now() - start
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        executionTimeMs: Date.now() - start
      };
    }
  }
}
