export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const safeExecute = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch (error) {
    return fallback;
  }
};

export const validateConfig = (config: Record<string, unknown>): void => {
  if (!config || typeof config !== 'object') {
    throw new PythonUtilsError('invalid configuration object', 'ERR_INVALID_CONFIG');
  }
  if (!('pythonPath' in config)) {
    throw new PythonUtilsError('missing required python path', 'ERR_MISSING_PATH');
  }
};

export const sanitizePath = (path: string): string => {
  if (typeof path !== 'string' || path.trim() === '') {
    throw new PythonUtilsError('path must be non-empty string', 'ERR_INVALID_PATH');
  }
  return path.replace(/[\x00-\x1F\x7F]/g, '');
};