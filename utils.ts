export type Processor<T> = (item: T) => T;

export class MemoizedExecutor {
  private cache = new Map<string, any>();

  execute<T>(key: string, fn: Processor<T>, input: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const result = fn(input);
    this.cache.set(key, result);
    return result;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T>(items: T[], fn: Processor<T>): T[] => {
  const result: T[] = new Array(items.length);
  for (let i = 0; i < items.length; i++) {
    result[i] = fn(items[i]);
  }
  return result;
};

export const throttle = <T extends (...args: any[]) => any>(fn: T, wait: number) => {
  let last = 0;
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      return fn(...args);
    }
  };
};