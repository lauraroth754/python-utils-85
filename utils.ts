export type ComputeFunction<T, R> = (input: T) => R;
export class OptimizedProcessor<T, R> {
  private cache: Map<string, {value: R, time: number}> = new Map();
  private maxEntries: number;
  private expiry: number;
  constructor(maxEntries = 50, expiryMs = 30000) {
    this.maxEntries = maxEntries;
    this.expiry = expiryMs;
  }
  process(input: T, compute: ComputeFunction<T, R>): R {
    const key = JSON.stringify(input);
    const currentTime = Date.now();
    const cached = this.cache.get(key);
    if (cached && (currentTime - cached.time) < this.expiry) {
      return cached.value;
    }
    if (this.cache.size >= this.maxEntries) {
      const iterator = this.cache.keys();
      const oldest = iterator.next().value;
      this.cache.delete(oldest);
    }
    const result = compute(input);
    this.cache.set(key, {value: result, time: currentTime});
    return result;
  }
  getCacheSize(): number {
    return this.cache.size;
  }
  clearCache(): void {
    this.cache.clear();
  }
}