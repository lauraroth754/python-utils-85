export type ProcessorInput = Record<string, unknown>;

export class DataOptimizer {
  private cache: Map<string, any> = new Map();

  public processBatch(data: ProcessorInput[]): any[] {
    return data.map(item => {
      const key = JSON.stringify(item);
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      const result = this.transform(item);
      this.cache.set(key, result);
      return result;
    });
  }

  private transform(item: ProcessorInput): any {
    return Object.entries(item).reduce((acc, [k, v]) => {
      acc[k.toLowerCase()] = typeof v === 'string' ? v.trim() : v;
      return acc;
    }, {} as Record<string, any>);
  }

  public clearCache(): void {
    this.cache.clear();
  }
}