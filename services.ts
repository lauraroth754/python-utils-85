export class ServiceError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export const executeTask = <T>(task: () => T | Promise<T>): Promise<T> => {
  try {
    const result = task();
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServiceError('Execution failed', 500));
  }
};

export const validateResponse = <T>(data: T | null | undefined): T => {
  if (data === null || data === undefined) {
    throw new ServiceError('Invalid response received', 404);
  }
  return data;
};

export const safeFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ServiceError('Network request failed', response.status);
  }
  return response.json();
};