export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number = 100) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

export class PerformanceService {
  private static caches = new Map<string, LRUCache<string, unknown>>();

  static memoize<T extends (...args: any[]) => any>(
    namespace: string,
    fn: T,
    capacity: number = 128
  ): T {
    if (!this.caches.has(namespace)) {
      this.caches.set(namespace, new LRUCache(capacity));
    }
    const cache = this.caches.get(namespace)!;

    return ((...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      if (cached !== undefined) {
        return cached as ReturnType<T>;
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }
}