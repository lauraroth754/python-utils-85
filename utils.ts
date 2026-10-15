export type Processor<T, R> = (item: T) => R;

export const memoize = <T, R>(fn: Processor<T, R>): Processor<T, R> => {
  const cache = new Map<string, R>();
  return (arg: T): R => {
    const key = JSON.stringify(arg);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(arg);
    cache.set(key, result);
    return result;
  };
};

export const batchProcess = async <T, R>(
  items: T[],
  processor: Processor<T, Promise<R>>,
  concurrency: number = 5
): Promise<R[]> => {
  const results: R[] = [];
  const executing: Promise<void>[] = [];

  for (const item of items) {
    const p = processor(item).then((res) => results.push(res));
    executing.push(p);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
      const index = executing.findIndex((t) => t === Promise.race(executing));
      executing.splice(index, 1);
    }
  }

  await Promise.all(executing);
  return results;
};

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};