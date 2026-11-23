export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string, public originalError?: unknown) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export interface Result<T> {
  data: T | null;
  error: PythonUtilsError | null;
}

export const handleExecution = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err: unknown) {
    const error = err instanceof PythonUtilsError 
      ? err 
      : new PythonUtilsError('execution failure', 'EXEC_ERR', err);
    return { data: null, error };
  }
};

export const validateInput = (value: unknown): void => {
  if (value === null || value === undefined) {
    throw new PythonUtilsError('null or undefined input', 'INVALID_INPUT');
  }
};