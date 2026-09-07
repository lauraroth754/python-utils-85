export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

export type NetworkOperation<T> = () => Promise<T>;

export async function withNetworkRetry<T>(
  operation: NetworkOperation<T>,
  options: { maxRetries?: number; initialDelay?: number } = {}
): Promise<T> {
  return retry(operation, options.maxRetries ?? 3, options.initialDelay ?? 1000);
}