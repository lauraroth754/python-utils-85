export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: unknown) => boolean;
}
export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 5;
  const delayMs = options.delayMs ?? 1000;
  const backoffMultiplier = options.backoffMultiplier ?? 2;
  const shouldRetry = options.shouldRetry ?? (() => true);
  let lastError: unknown;
  let currentDelay = delayMs;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay = Math.floor(currentDelay * backoffMultiplier);
    }
  }
  throw lastError;
}