export class ServiceError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'ServiceError';
  }
}

export interface Result<T> {
  data: T | null;
  error: ServiceError | null;
}

export const safeExecute = async <T>(
  task: () => Promise<T>
): Promise<Result<T>> => {
  try {
    const data = await task();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error 
      ? new ServiceError(err.message, 'EXECUTION_FAILURE')
      : new ServiceError('Unknown internal error', 'UNKNOWN_ERROR');
    return { data: null, error };
  }
};

export const validateResponse = <T>(data: T | null): T => {
  if (data === null) {
    throw new ServiceError('Operation returned null result', 'NULL_RESULT');
  }
  return data;
};