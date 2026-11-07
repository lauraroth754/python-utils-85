export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const batchProcess = <T, R>(items: T[], fn: (batch: T[]) => Promise<R[]>, size: number = 100): Promise<R[]> => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return Promise.all(chunks.map(fn)).then((results) => results.flat());
};

export const throttle = <T extends (...args: any[]) => void>(fn: T, wait: number): T => {
  let last = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  }) as T;
};