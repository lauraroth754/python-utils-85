export interface CacheEntry<T> { value: T; timestamp: number; }
export class PerformanceCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;
  private ttl: number;
  constructor(maxSize: number = 100, ttl: number = 60000) {
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }
  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }
  clear(): void {
    this.cache.clear();
  }
  size(): number {
    return this.cache.size;
  }
}
export function memoizeWithTTL<T extends (...args: any[]) => any>(fn: T, ttl: number = 60000): T {
  const cache = new PerformanceCache<ReturnType<T>>(100, ttl);
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;
}
export function expensiveComputation(n: number): number {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.sqrt(i) * Math.sin(i);
  }
  return sum;
}
export const optimizedComputation = memoizeWithTTL(expensiveComputation);