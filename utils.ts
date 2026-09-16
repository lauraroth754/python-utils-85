export interface RetryOptions {
  maxRetries?: number;
  delay?: number;
  backoffFactor?: number;
  retryCondition?: (error: unknown) => boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoffFactor = 2,
    retryCondition = () => true,
  } = options;

  let currentDelay = delay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries || !retryCondition(error)) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }
  throw new Error("Retry execution failed");
}