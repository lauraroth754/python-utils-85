export class ServiceError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export async function safeExecute<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ServiceError) {
      console.error(`[ServiceError ${error.code}]: ${error.message}`);
      return null;
    }
    console.error('Unexpected system failure:', error);
    throw error;
  }
}

export function validatePayload(data: unknown): boolean {
  if (data === null || typeof data !== 'object') return false;
  return 'id' in data && 'timestamp' in data;
}

export async function processRequest(data: unknown): Promise<string> {
  if (!validatePayload(data)) {
    throw new ServiceError('Invalid request schema', 400);
  }
  return 'success';
}