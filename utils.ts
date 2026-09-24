export type PythonVersion = '3.9' | '3.10' | '3.11' | '3.12';

export interface ExecutionResult {
  output: string;
  exitCode: number;
}

export const sanitizePath = (path: string): string => {
  return path.replace(/\\/g, '/').replace(/\/+/g, '/');
};

export const formatCommand = (script: string, args: string[] = []): string => {
  return `python3 ${script} ${args.join(' ')}`.trim();
};

export const parseOutput = (raw: string): ExecutionResult => {
  const lines = raw.trim().split('\n');
  const exitCode = parseInt(lines.pop() || '0', 10);
  return { output: lines.join('\n'), exitCode };
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const getEnvVariable = (key: string, fallback: string): string => {
  return process.env[key] || fallback;
};

export const validateVersion = (version: string): version is PythonVersion => {
  return ['3.9', '3.10', '3.11', '3.12'].includes(version);
};