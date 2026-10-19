export type Processor<T, R> = (input: T) => R;

export class MemoizedExecutor {
  private cache: Map<string, any> = new Map();

  public execute<T, R>(key: string, fn: Processor<T, R>, input: T): R {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const result = fn(input);
    this.cache.set(key, result);
    return result;
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T, R>(items: T[], processor: Processor<T, R>, batchSize: number = 100): R[] => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    results.push(...chunk.map(processor));
  }
  return results;
};

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};