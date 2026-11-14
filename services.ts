export class ServiceError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export interface ServiceResult<T> {
  data: T | null;
  error: ServiceError | null;
}

export const safeExecute = async <T>(
  fn: () => Promise<T>,
  errorMessage: string = 'execution failed'
): Promise<ServiceResult<T>> => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof ServiceError 
      ? err 
      : new ServiceError(errorMessage, 500);
    return { data: null, error };
  }
};

export const validateResponse = <T>(data: unknown): T => {
  if (data === null || data === undefined) {
    throw new ServiceError('empty response body', 204);
  }
  return data as T;
};