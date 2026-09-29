export type CacheKey = string | number;

export interface PerformanceMetrics {
  executionTime: number;
  memoryUsage: number;
}

export class Memoizer<T, R> {
  private cache = new Map<CacheKey, R>();
  private limit: number;

  constructor(limit: number = 1000) {
    this.limit = limit;
  }

  public memoize(fn: (arg: T) => R, key: CacheKey): R {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    const result = fn(key as unknown as T);
    this.cache.set(key, result);
    return result;
  }

  public clear(): void {
    this.cache.clear();
  }

  public get size(): number {
    return this.cache.size;
  }
}

export const computePerformance = (start: number): PerformanceMetrics => ({
  executionTime: performance.now() - start,
  memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024),
});