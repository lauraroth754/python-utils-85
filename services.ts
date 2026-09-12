import { spawn } from 'child_process';

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export interface ExecutionOptions {
  timeoutMs?: number;
  pythonPath?: string;
}

export class PythonExecutorService {
  private defaultPythonPath: string;

  constructor(pythonPath = 'python3') {
    this.defaultPythonPath = pythonPath;
  }

  public async executeCode(code: string, options: ExecutionOptions = {}): Promise<ExecutionResult> {
    if (!code || !code.trim()) {
      throw new Error('Execution failed: Empty Python code provided');
    }

    const pythonPath = options.pythonPath || this.defaultPythonPath;
    const timeout = options.timeoutMs || 5000;

    return new Promise((resolve, reject) => {
      const child = spawn(pythonPath, ['-c', code]);
      let stdout = '';
      let stderr = '';
      let isTimedOut = false;

      const timer = setTimeout(() => {
        isTimedOut = true;
        child.kill('SIGKILL');
        reject(new Error(`Execution timed out after ${timeout}ms`));
      }, timeout);

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        reject(new Error(`Failed to start Python process: ${err.message}`));
      });

      child.on('close', (code) => {
        if (isTimedOut) return;
        clearTimeout(timer);

        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: code,
        });
      });
    });
  }
}