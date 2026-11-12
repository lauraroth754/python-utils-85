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

export const validateInput = (input: unknown): boolean => {
  if (input === null || input === undefined) {
    throw new PythonUtilsError('Invalid input provided', 'INVALID_INPUT');
  }
  return true;
};

export const asyncSafeExecute = async <T>(fn: () => Promise<T>, errorMessage: string): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    throw new PythonUtilsError(errorMessage, 'ASYNC_EXECUTION_FAILURE');
  }
};