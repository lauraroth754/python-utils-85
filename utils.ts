export type PythonVersion = '2.7' | '3.8' | '3.9' | '3.10' | '3.11' | '3.12';

export interface ExecutionResult {
  output: string;
  exitCode: number;
}

export const sanitizePath = (path: string): string => path.trim().replace(/\\/g, '/');

export const getPythonCommand = (version: PythonVersion): string => {
  const commands: Record<PythonVersion, string> = {
    '2.7': 'python2',
    '3.8': 'python3.8',
    '3.9': 'python3.9',
    '3.10': 'python3.10',
    '3.11': 'python3.11',
    '3.12': 'python3.12',
  };
  return commands[version] || 'python3';
};

export const formatModulePath = (moduleName: string): string => {
  return moduleName.split('.').join('/');
};

export const validateVersion = (version: string): version is PythonVersion => {
  const valid: PythonVersion[] = ['2.7', '3.8', '3.9', '3.10', '3.11', '3.12'];
  return valid.includes(version as PythonVersion);
};

export const parseOutput = (raw: string): ExecutionResult => {
  const lines = raw.split('\n');
  const exitCode = parseInt(lines.pop() || '0', 10);
  return { output: lines.join('\n'), exitCode };
};