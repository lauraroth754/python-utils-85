export type RetryOptions = {
  maxRetries: number;
  backoffMs: number;
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, backoffMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === options.maxRetries) break;
      await new Promise((resolve) =>
        setTimeout(resolve, options.backoffMs * Math.pow(2, attempt))
      );
    }
  }

  throw lastError;
}