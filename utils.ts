export class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private readonly max: number;

  constructor(max = 1000) {
    this.max = max;
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxSize = 1000
): T {
  const cache = new LRUCache<string, ReturnType<T>>(maxSize);
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
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