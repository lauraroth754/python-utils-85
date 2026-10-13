export type PythonVersion = '2.7' | '3.8' | '3.9' | '3.10' | '3.11' | '3.12';

export interface ExecutionResult {
  output: string;
  exitCode: number;
  durationMs: number;
}

export const sanitizePath = (path: string): string => {
  return path.replace(/\\/g, '/').replace(//+$/, '');
};

export const formatCommand = (scriptPath: string, args: string[]): string => {
  const sanitized = sanitizePath(scriptPath);
  return `python3 ${sanitized} ${args.join(' ')}`.trim();
};

export const validateVersion = (version: string): version is PythonVersion => {
  const validVersions = ['2.7', '3.8', '3.9', '3.10', '3.11', '3.12'];
  return validVersions.includes(version);
};

export const parseExecutionOutput = (raw: string): ExecutionResult => {
  const lines = raw.split('\n');
  const exitCode = parseInt(lines.pop() || '0', 10);
  return {
    output: lines.join('\n'),
    exitCode: isNaN(exitCode) ? 1 : exitCode,
    durationMs: 0
  };
};