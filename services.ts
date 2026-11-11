export class ServiceError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export interface Result<T> {
  data?: T;
  error?: ServiceError;
}

export async function safeExecute<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return { data };
  } catch (err) {
    if (err instanceof Error) {
      return { error: new ServiceError(err.message, 500) };
    }
    return { error: new ServiceError('Unknown error occurred', 500) };
  }
}

export const validateInput = (input: unknown): boolean => {
  if (input === null || input === undefined) {
    throw new ServiceError('Invalid input provided', 400);
  }
  return true;
};