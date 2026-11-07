export type RetryOptions = {
  maxRetries: number;
  delayMs: number;
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= options.maxRetries; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < options.maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError;
}