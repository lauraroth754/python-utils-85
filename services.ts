export class ServiceError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export const safeExecute = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof ServiceError) {
      console.error(`Service failure [${error.code}]: ${error.message}`);
    } else {
      console.error('Unexpected execution failure:', error);
    }
    return fallback;
  }
};

export const validateData = (data: unknown): boolean => {
  if (data === null || typeof data !== 'object') return false;
  return Object.keys(data).length > 0;
};

export const fetchData = async (url: string): Promise<Record<string, any>> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ServiceError('Network request failed', response.status);
  }
  const data = await response.json();
  if (!validateData(data)) {
    throw new ServiceError('Invalid response payload', 422);
  }
  return data;
};