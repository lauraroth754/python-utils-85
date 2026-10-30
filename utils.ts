export interface RetryOptions {
  maxRetries: number;
  delayMs: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < options.maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }
  throw lastError;
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && ('code' in error || 'status' in error);
}