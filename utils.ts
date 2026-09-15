export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  { maxRetries = 3, delayMs = 1000 }: RetryOptions = {}
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}