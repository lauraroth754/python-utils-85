export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string, public details?: unknown) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: PythonUtilsError;
}

export const handleExecutionError = (err: unknown): PythonUtilsError => {
  if (err instanceof PythonUtilsError) {
    return err;
  }
  if (err instanceof Error) {
    return new PythonUtilsError(err.message, 'INTERNAL_ERROR', err);
  }
  return new PythonUtilsError('An unknown error occurred', 'UNKNOWN_ERROR', err);
};

export const validateResponse = <T>(data: T | null | undefined): ValidationResult<T> => {
  if (data === null || data === undefined) {
    return {
      success: false,
      error: new PythonUtilsError('Data is null or undefined', 'INVALID_RESPONSE'),
    };
  }
  return { success: true, data };
};

export type ErrorHandler = (err: unknown) => PythonUtilsError;