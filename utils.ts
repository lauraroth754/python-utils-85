export interface DataChunk {
  id: string;
  payload: Uint8Array;
}

export class Processor {
  private cache: Map<string, DataChunk> = new Map();

  public process(data: DataChunk[]): DataChunk[] {
    return data.map((item) => {
      if (this.cache.has(item.id)) {
        return this.cache.get(item.id)!;
      }
      const processed = this.transform(item);
      this.cache.set(item.id, processed);
      return processed;
    });
  }

  private transform(data: DataChunk): DataChunk {
    return { ...data, payload: new Uint8Array(data.payload).reverse() };
  }

  public clearCache(): void {
    this.cache.clear();
  }
}