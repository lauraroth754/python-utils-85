export interface CacheOptions {
  maxSize?: number;
  ttlMs?: number;
}

interface CacheEntry<V> {
  value: V;
  expiresAt: number;
}

export class LRUMemoCache<K extends string | number, V> {
  private readonly cache = new Map<K, CacheEntry<V>>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize ?? 1000;
    this.ttlMs = options.ttlMs ?? 0;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (this.ttlMs > 0 && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: this.ttlMs > 0 ? Date.now() + this.ttlMs : Infinity,
    });
  }

  memoize<T extends (...args: any[]) => V>(
    fn: T,
    keyGenerator?: (...args: Parameters<T>) => K
  ): T {
    return ((...args: Parameters<T>): V => {
      const key = keyGenerator ? keyGenerator(...args) : (args[0] as K);
      const cached = this.get(key);
      if (cached !== undefined) return cached;

      const result = fn(...args);
      this.set(key, result);
      return result;
    }) as T;
  }

  clear(): void {
    this.cache.clear();
  }
}