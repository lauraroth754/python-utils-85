export type Processor = <T>(data: T[]) => T[];

const memoize = <T, R>(fn: (arg: T) => R): ((arg: T) => R) => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const batchProcess = <T>(items: T[], chunkSize: number = 100): T[][] => {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    batches.push(items.slice(i, i + chunkSize));
  }
  return batches;
};

export const fastFilter = <T>(items: T[], predicate: (item: T) => boolean): T[] => {
  const result: T[] = [];
  const len = items.length;
  for (let i = 0; i < len; i++) {
    if (predicate(items[i])) {
      result.push(items[i]);
    }
  }
  return result;
};

export const getLazyProcessor = (limit: number): Processor => {
  const memoizedLimit = memoize((n: number) => n * limit);
  return <T>(data: T[]): T[] => {
    const size = memoizedLimit(data.length);
    return data.slice(0, size);
  };
};