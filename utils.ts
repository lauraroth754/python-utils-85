export type PythonVersion = '2.7' | '3.8' | '3.11' | '3.12';

export interface ScriptConfig {
  path: string;
  version: PythonVersion;
  timeout: number;
}

export const sanitizePath = (path: string): string => {
  return path.replace(/\\/g, '/').replace(//+$/, '');
};

export const getCommand = (config: ScriptConfig): string[] => {
  const pythonBin = `python${config.version}`;
  return [pythonBin, sanitizePath(config.path)];
};

export const validateConfig = (config: Partial<ScriptConfig>): boolean => {
  return !!(config.path && config.version);
};

export const formatOutput = (raw: string): string[] => {
  return raw.split('\n').filter(Boolean).map((line) => line.trim());
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};