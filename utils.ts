export type Processor<T> = (item: T) => T;

export class BatchProcessor<T> {
  private queue: T[] = [];
  private readonly concurrencyLimit: number;

  constructor(limit: number = 100) {
    this.concurrencyLimit = limit;
  }

  public add(items: T[]): void {
    this.queue.push(...items);
  }

  public process(fn: Processor<T>): T[] {
    const results: T[] = [];
    const batchSize = Math.min(this.queue.length, this.concurrencyLimit);

    while (this.queue.length > 0) {
      const chunk = this.queue.splice(0, batchSize);
      results.push(...chunk.map(fn));
    }

    return results;
  }

  public get pendingCount(): number {
    return this.queue.length;
  }

  public clear(): void {
    this.queue = [];
  }
}