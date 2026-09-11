export type Processor = <T>(data: T) => T;

export class MemoizedExecutor {
  private cache: Map<string, any> = new Map();

  execute<T>(key: string, task: () => T, ttl: number = 5000): T {
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      if (Date.now() - entry.timestamp < ttl) {
        return entry.value;
      }
    }

    const value = task();
    this.cache.set(key, { value, timestamp: Date.now() });
    return value;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T>(items: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }
  return result;
};

export const throttle = (fn: Function, delay: number) => {
  let last = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
};