export type PythonVersion = '2.7' | '3.8' | '3.11' | '3.12';

export interface ExecutionResult {
  output: string;
  exitCode: number;
}

export const sanitizePath = (path: string): string => {
  return path.replace(/\\/g, '/').replace(//+$/, '');
};

export const validateVersion = (version: string): version is PythonVersion => {
  const validVersions: PythonVersion[] = ['2.7', '3.8', '3.11', '3.12'];
  return (validVersions as string[]).includes(version);
};

export const formatCommand = (scriptPath: string, args: string[] = []): string => {
  const parts = ['python3', scriptPath, ...args];
  return parts.join(' ');
};

export const parseOutput = (raw: string): ExecutionResult => {
  const lines = raw.trim().split('\n');
  return {
    output: lines.slice(0, -1).join('\n'),
    exitCode: parseInt(lines[lines.length - 1], 10) || 0
  };
};