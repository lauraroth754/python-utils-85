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
      return fallback;
    }
    console.error('Unexpected runtime error:', error);
    throw error;
  }
};

export const validateData = (data: unknown): data is Record<string, unknown> => {
  if (!data || typeof data !== 'object') {
    throw new ServiceError('Invalid payload format', 400);
  }
  return true;
};

export const fetchData = async (url: string): Promise<unknown> => {
  if (!url.startsWith('https://')) {
    throw new ServiceError('Insecure protocol', 403);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new ServiceError('Network request failed', response.status);
  }
  return await response.json();
};