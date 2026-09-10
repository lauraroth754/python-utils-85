export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const safeExecute = <T>(fn: () => T, errorMessage: string): T => {
  try {
    return fn();
  } catch (error) {
    throw new PythonUtilsError(errorMessage, 'EXECUTION_FAILURE');
  }
};

export const validateInput = (data: unknown): boolean => {
  if (data === null || data === undefined) {
    throw new PythonUtilsError('Input cannot be null or undefined', 'INVALID_INPUT');
  }
  return true;
};

export const parseJsonSafely = <T>(json: string): T => {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    throw new PythonUtilsError('Failed to parse JSON string', 'PARSE_ERROR');
  }
};

export const handleAsync = async <T>(promise: Promise<T>): Promise<[T | null, Error | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error('Unknown error')];
  }
};