export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const validateConfig = (config: Record<string, any>): void => {
  if (!config || typeof config !== 'object') {
    throw new PythonUtilsError('invalid configuration object', 'ERR_INVALID_CONFIG');
  }

  if (config.timeout !== undefined && (typeof config.timeout !== 'number' || config.timeout < 0)) {
    throw new PythonUtilsError('timeout must be a non-negative number', 'ERR_INVALID_TIMEOUT');
  }
};

export const safeParse = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

export const retryOperation = async <T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      return await retryOperation(fn, retries - 1);
    }
    throw error;
  }
};