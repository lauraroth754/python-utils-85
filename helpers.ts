export type PythonVersion = '2.7' | '3.8' | '3.11' | '3.12';

export interface ExecutionContext {
  venvPath: string;
  version: PythonVersion;
  timeout: number;
}

export const getPythonExecutable = (ctx: ExecutionContext): string => {
  return `${ctx.venvPath}/bin/python${ctx.version.split('.')[0]}`;
};

export const sanitizePath = (path: string): string => {
  return path.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9/._-]/g, '');
};

export const createProcessArgs = (script: string, args: string[] = []): string[] => {
  return [script, ...args.map(a => a.trim())];
};

export const validateEnv = (ctx: ExecutionContext): boolean => {
  return !!ctx.venvPath && !!ctx.version;
};

export const formatCommand = (exec: string, args: string[]): string => {
  return [exec, ...args].join(' ');
};