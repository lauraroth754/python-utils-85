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

export async function safeExecute<T>(fn: () => Promise<T>): Promise<ServiceResult<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof ServiceError ? err : new ServiceError('unknown failure', 500);
    return { data: null, error };
  }
}

export function validateInput<T>(input: T | null | undefined): T {
  if (input === null || input === undefined) {
    throw new ServiceError('invalid input provided', 400);
  }
  return input;
}