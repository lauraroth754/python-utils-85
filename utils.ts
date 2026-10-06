export class MemoCache<K, V> {
  private cache = new Map<K, { value: V; expires: number }>();
  private capacity: number;
  private ttl: number;

  constructor(capacity = 1000, ttlMs = 60000) {
    this.capacity = capacity;
    this.ttl = ttlMs;
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return undefined;
    }
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
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
    this.cache.set(key, { value, expires: Date.now() + this.ttl });
  }

  clear(): void {
    this.cache.clear();
  }
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  capacity = 500,
  ttlMs = 300000
): T {
  const cache = new MemoCache<string, ReturnType<T>>(capacity, ttlMs);
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}