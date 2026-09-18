export type PythonVersion = '2.7' | '3.8' | '3.11';

export interface ExecutionResult {
  output: string;
  exitCode: number;
}

export const sanitizePath = (path: string): string => {
  return path.replace(/\\/g, '/').replace(/\/+/g, '/');
};

export const formatCommand = (script: string, args: string[]): string => {
  const sanitizedArgs = args.map(arg => `"${arg.replace(/"/g, '\\"')}"`);
  return `${script} ${sanitizedArgs.join(' ')}`;
};

export const validateVersion = (version: string): version is PythonVersion => {
  const validVersions: PythonVersion[] = ['2.7', '3.8', '3.11'];
  return validVersions.includes(version as PythonVersion);
};

export const parseOutput = (raw: string): ExecutionResult => {
  const lines = raw.trim().split('\n');
  const exitCode = parseInt(lines.pop() || '0', 10);
  return {
    output: lines.join('\n'),
    exitCode: isNaN(exitCode) ? 1 : exitCode
  };
};