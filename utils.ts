export type Processor<T> = (data: T) => T;

export class MemoizedExecutor {
  private cache: Map<string, any> = new Map();

  public execute<T>(key: string, fn: Processor<T>, data: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const result = fn(data);
    this.cache.set(key, result);
    return result;
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T>(items: T[], fn: Processor<T>): T[] => {
  const results: T[] = [];
  for (let i = 0; i < items.length; i++) {
    results.push(fn(items[i]));
  }
  return results;
};

export const optimizeArrayAccess = <T>(arr: T[]): ReadonlyArray<T> => {
  return Object.freeze([...arr]);
};