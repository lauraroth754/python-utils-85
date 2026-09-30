export interface CacheEntry<T> {
  data: T;
  expiry: number;
}

export class PerformanceCache {
  private store: Map<string, CacheEntry<any>> = new Map();
  private readonly ttl: number;

  constructor(ttlMs: number = 60000) {
    this.ttl = ttlMs;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    this.store.set(key, {
      data,
      expiry: Date.now() + this.ttl
    });
  }

  prune(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiry) this.store.delete(key);
    }
  }

  size(): number {
    return this.store.size;
  }
}