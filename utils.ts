export interface ProcessResult {
  success: boolean;
  duration: number;
  output: string | null;
}

export class PerformanceCache {
  private cache: Map<string, ProcessResult> = new Map();
  private readonly limit: number = 1000;

  public get(key: string): ProcessResult | undefined {
    return this.cache.get(key);
  }

  public set(key: string, value: ProcessResult): void {
    if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new PerformanceCache();
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached) return cached as ReturnType<T>;
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};