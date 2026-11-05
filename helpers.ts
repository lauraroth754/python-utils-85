export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const safeExecute = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch (err) {
    console.error(`[python-utils-85] execution failure: ${err instanceof Error ? err.message : String(err)}`);
    return fallback;
  }
};

export const validateConfig = (config: unknown): config is Record<string, any> => {
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    throw new PythonUtilsError('invalid configuration structure', 'INVALID_CONFIG');
  }
  return true;
};

export const handleAsyncOperation = async <T>(promise: Promise<T>): Promise<T | null> => {
  try {
    return await promise;
  } catch (err) {
    return null;
  }
};