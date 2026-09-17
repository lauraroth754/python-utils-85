export type Cacheable = Record<string, any>;

const cache = new Map<string, { value: any; expiry: number }>();

export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 60000
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const now = Date.now();
    const cached = cache.get(key);

    if (cached && cached.expiry > now) {
      return cached.value;
    }

    const result = fn(...args);
    cache.set(key, { value: result, expiry: now + ttl });
    return result;
  };
};

export const batchProcess = <T, R>(items: T[], fn: (batch: T[]) => R[], size: number = 100): R[] => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    results.push(...fn(items.slice(i, i + size)));
  }
  return results;
};

export const clearCache = (): void => {
  cache.clear();
};