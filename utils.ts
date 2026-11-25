export type Processor<T> = (item: T) => T;

export class MemoizedExecutor {
  private cache = new Map<string, any>();

  public execute<T>(key: string, fn: Processor<T>, data: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const result = fn(data);
    this.cache.set(key, result);
    return result;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T>(items: T[], fn: Processor<T>, chunkSize: number = 100): T[] => {
  const results: T[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...chunk.map(fn));
  }
  return results;
};

export const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};