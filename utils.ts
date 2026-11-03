export class PythonUtilsError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const executePythonCommand = <T>(fn: () => T): T => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof Error) {
      throw new PythonUtilsError(`Execution failed: ${error.message}`, 'EXEC_ERROR');
    }
    throw new PythonUtilsError('Unknown execution failure', 'UNKNOWN_ERROR');
  }
};

export const safeParse = <T>(data: string, fallback: T): T => {
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
};

export const validateInput = (input: unknown): void => {
  if (input === null || input === undefined) {
    throw new PythonUtilsError('Invalid input: input is null or undefined', 'INVALID_INPUT');
  }
  if (typeof input !== 'object') {
    throw new PythonUtilsError('Invalid input: input is not an object', 'INVALID_TYPE');
  }
};