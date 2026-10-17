export class MemoizedService {
  private cache: Map<string, any> = new Map();

  async executeOptimized<T>(key: string, fn: () => Promise<T>, ttl: number = 5000): Promise<T> {
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      if (Date.now() - entry.timestamp < ttl) {
        return entry.data;
      }
      this.cache.delete(key);
    }

    const data = await fn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T, R>(items: T[], fn: (batch: T[]) => Promise<R[]>, size: number = 10): Promise<R[]> => {
  const results: R[] = [];
  const queue = [...items];
  
  const process = async (): Promise<R[]> => {
    while (queue.length > 0) {
      const batch = queue.splice(0, size);
      const res = await fn(batch);
      results.push(...res);
    }
    return results;
  };

  return process();
};