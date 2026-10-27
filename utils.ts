export class LruCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private readonly capacity: number = 1000) {}

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
}

const stringCache = new LruCache<string, string>(2048);

export function memoizedSnakeToCamel(str: string): string {
  const cached = stringCache.get(str);
  if (cached !== undefined) {
    return cached;
  }
  const result = str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  stringCache.set(str, result);
  return result;
}

export function memoizedCamelToSnake(str: string): string {
  const cached = stringCache.get(str);
  if (cached !== undefined) {
    return cached;
  }
  const result = str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  stringCache.set(str, result);
  return result;
}