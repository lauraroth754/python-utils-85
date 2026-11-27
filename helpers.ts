export type PythonVersion = '2.7' | '3.8' | '3.11' | '3.12';

export interface ExecutionResult {
  output: string;
  exitCode: number;
  durationMs: number;
}

export const sanitizePath = (path: string): string => {
  return path.replace(/[^a-zA-Z0-9/_.-]/g, '');
};

export const formatCommand = (script: string, args: string[]): string => {
  const sanitized = sanitizePath(script);
  return `python3 ${sanitized} ${args.join(' ')}`.trim();
};

export const validateVersion = (version: string): version is PythonVersion => {
  const supported: PythonVersion[] = ['2.7', '3.8', '3.11', '3.12'];
  return (supported as string[]).includes(version);
};

export const parseExecutionTime = (start: number): number => {
  return Math.round(performance.now() - start);
};

export const createResult = (output: string, code: number, time: number): ExecutionResult => ({
  output,
  exitCode: code,
  durationMs: time
});