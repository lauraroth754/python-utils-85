export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateInput(data: unknown): asserts data is Record<string, any> {
  if (typeof data !== 'object' || data === null) {
    throw new ValidationError('input must be a valid object');
  }
  if (!('id' in data) || typeof (data as any).id !== 'string') {
    throw new ValidationError('missing or invalid required field: id');
  }
}

export function processLoop(items: unknown[], config: ProcessingConfig): void {
  for (const item of items) {
    try {
      validateInput(item);
      const { id } = item as { id: string };
      console.log(`processing item: ${id}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        console.error(`skipping invalid item: ${err.message}`);
      } else {
        throw err;
      }
    }
  }
}