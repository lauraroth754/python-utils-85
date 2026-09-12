export type DataEntry = { id: string; value: number };

export class Processor {
  private cache: Map<string, number> = new Map();

  public processBatch(data: DataEntry[]): number[] {
    return data.map((entry) => this.compute(entry));
  }

  private compute(entry: DataEntry): number {
    if (this.cache.has(entry.id)) {
      return this.cache.get(entry.id)!;
    }
    const result = this.heavyCalculation(entry.value);
    this.cache.set(entry.id, result);
    return result;
  }

  private heavyCalculation(val: number): number {
    let res = val;
    for (let i = 0; i < 1e3; i++) {
      res = Math.sqrt(res + i) * Math.sin(res);
    }
    return res;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}