export class PythonUtilsError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export interface Result<T> {
  data?: T;
  error?: PythonUtilsError;
  success: boolean;
}

export const handleError = (err: unknown): PythonUtilsError => {
  if (err instanceof PythonUtilsError) return err;
  const message = err instanceof Error ? err.message : 'Unknown python utility failure';
  return new PythonUtilsError(message, 'INTERNAL_ERROR');
};

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { data, success: true };
  } catch (err) {
    return { error: handleError(err), success: false };
  }
};

export type ValidationResult = {
  valid: boolean;
  reason?: string;
};