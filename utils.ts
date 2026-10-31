export type Processor<T> = (item: T) => T;

export class MemoizedProcessor<T> {
  private cache: Map<string, T> = new Map();

  constructor(private processor: Processor<T>, private keyGen: (item: T) => string) {}

  process(item: T): T {
    const key = this.keyGen(item);
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const result = this.processor(item);
    this.cache.set(key, result);
    return result;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const batchProcess = <T>(items: T[], fn: Processor<T>, size: number = 100): T[] => {
  const result: T[] = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    result.push(...chunk.map(fn));
  }
  return result;
};

export const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};