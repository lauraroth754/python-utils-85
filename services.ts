import { exec, ExecOptions } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/** Configuration options for the Python service execution. */
export interface PythonExecOptions {
  /** Path to the Python executable. Defaults to 'python3'. */
  pythonPath?: string;
  /** Timeout in milliseconds before terminating the process. */
  timeoutMs?: number;
  /** Additional environment variables to pass to the process. */
  env?: Record<string, string>;
}

/** Result object returned after running a Python command or script. */
export interface PythonExecResult {
  /** Captured standard output. */
  stdout: string;
  /** Captured standard error output. */
  stderr: string;
  /** Execution status flag. */
  success: boolean;
}

/**
 * Service to execute Python commands and scripts safely asynchronously.
 */
export class PythonProcessService {
  private readonly pythonPath: string;
  private readonly timeoutMs: number;

  /**
   * Initializes a new PythonProcessService instance.
   * @param options Configuration settings for process execution.
   */
  constructor(options: PythonExecOptions = {}) {
    this.pythonPath = options.pythonPath ?? 'python3';
    this.timeoutMs = options.timeoutMs ?? 10000;
  }

  /**
   * Runs an inline Python code string and returns the execution result.
   * @param code Python code string to execute.
   * @returns Promise resolving to execution stdout, stderr, and status.
   */
  public async runCode(code: string): Promise<PythonExecResult> {
    const escapedCode = code.replace(/"/g, '\\"');
    const command = `${this.pythonPath} -c "${escapedCode}"`;
    const opts: ExecOptions = { timeout: this.timeoutMs };

    try {
      const { stdout, stderr } = await execAsync(command, opts);
      return { stdout: stdout.trim(), stderr: stderr.trim(), success: true };
    } catch (error: unknown) {
      const err = error as { stdout?: string; stderr?: string; message?: string };
      return {
        stdout: err.stdout?.trim() ?? '',
        stderr: err.stderr?.trim() ?? err.message ?? 'Unknown execution error',
        success: false,
      };
    }
  }
}