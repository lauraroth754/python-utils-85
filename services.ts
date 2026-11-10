export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  { maxRetries = 3, delayMs = 1000 }: RetryOptions = {}
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}