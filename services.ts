import { spawn } from 'child_process';
import { existsSync } from 'fs';

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export class PythonExecutionService {
  private pythonPath: string;

  constructor(pythonPath = 'python3') {
    this.pythonPath = pythonPath;
  }

  public async runScript(
    scriptPath: string,
    args: string[] = [],
    timeoutMs = 5000
  ): Promise<ExecutionResult> {
    if (!scriptPath) {
      throw new Error('Script path cannot be empty');
    }

    if (!existsSync(scriptPath)) {
      throw new Error(`Script file not found: ${scriptPath}`);
    }

    return new Promise((resolve, reject) => {
      const child = spawn(this.pythonPath, [scriptPath, ...args]);
      let stdout = '';
      let stderr = '';

      const timer = setTimeout(() => {
        child.kill('SIGTERM');
        reject(new Error(`Execution timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        reject(new Error(`Failed to start process: ${err.message}`));
      });

      child.on('close', (code) => {
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