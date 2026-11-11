export interface RetryOptions {
  maxAttempts: number;
  backoffMs: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, backoffMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt === options.maxAttempts) break;
      await new Promise((resolve) =>
        setTimeout(resolve, options.backoffMs * Math.pow(2, attempt - 1))
      );
    }
  }

  throw lastError;
}

export const fetchWithRetry = async (url: string, init?: RequestInit): Promise<Response> => {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
};