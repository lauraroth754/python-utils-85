export class ServiceError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export const safeExecute = async <T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ServiceError) {
      console.error(`Service failure: ${error.code} - ${error.message}`);
    } else {
      console.error('Unexpected runtime error', error);
    }
    return fallback;
  }
};

export const validateResponse = <T>(data: unknown): T => {
  if (data === null || data === undefined) {
    throw new ServiceError('Empty response payload', 400);
  }
  return data as T;
};

export const processWithRetry = async <T>(
  task: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await task();
  } catch (err) {
    if (retries > 0) {
      return processWithRetry(task, retries - 1);
    }
    throw new ServiceError('Max retries exceeded', 503);
  }
};