interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const TTL = 300000;

export const memoizedFetch = async <T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> => {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && cached.expiry > now) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, expiry: now + TTL });
  return data;
};

export const clearCache = (): void => cache.clear();

export const batchProcess = <T, R>(items: T[], fn: (batch: T[]) => Promise<R[]>, size: number = 50): Promise<R[]> => {
  const results: R[] = [];
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks.reduce(async (acc, chunk) => {
    const current = await acc;
    const processed = await fn(chunk);
    return [...current, ...processed];
  }, Promise.resolve(results));
};