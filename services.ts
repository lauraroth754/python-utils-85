export class MemoizedService {
  private cache: Map<string, any> = new Map();
  private readonly ttl: number = 5000;

  public async executeTask<T>(key: string, task: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp < this.ttl)) {
      return cached.data;
    }

    const data = await task();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  public clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

export const batchProcess = <T, R>(items: T[], processor: (item: T) => R, chunkSize: number = 100): R[] => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...chunk.map(processor));
  }
  return results;
};