export type Processor<T, R> = (item: T) => R;

export class MemoizedExecutor {
  private cache: Map<string, any> = new Map();

  execute<T, R>(fn: Processor<T, R>, input: T): R {
    const key = JSON.stringify(input);
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const result = fn(input);
    this.cache.set(key, result);
    return result;
  }

  clear(): void {
    this.cache.clear();
  }
}

export function batchProcess<T, R>(items: T[], processor: Processor<T, R>, batchSize: number = 100): R[] {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    results.push(...chunk.map(processor));
  }
  return results;
}

export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}