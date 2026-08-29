export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

export async function retryNetworkOperation<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const defaults: RetryConfig = {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2
  };
  const { maxAttempts, initialDelay, maxDelay, backoffFactor } = { ...defaults, ...config };
  let attempt = 0;
  let delay = initialDelay;
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffFactor, maxDelay);
    }
  }
  throw new Error("Retry failed");
}