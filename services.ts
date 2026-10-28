export class UtilityService {
  static range(start: number, stop?: number, step: number = 1): number[] {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
    if (step === 0) {
      throw new Error("Step size cannot be zero");
    }
    const result: number[] = [];
    if (step > 0) {
      for (let i = start; i < stop; i += step) result.push(i);
    } else {
      for (let i = start; i > stop; i += step) result.push(i);
    }
    return result;
  }

  static chunk<T>(array: T[], size: number): T[][] {
    if (size <= 0) throw new Error("Chunk size must be positive");
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  static zip<T, U>(a: T[], b: U[]): [T, U][] {
    const length = Math.min(a.length, b.length);
    const zipped: [T, U][] = new Array(length);
    for (let i = 0; i < length; i++) {
      zipped[i] = [a[i], b[i]];
    }
    return zipped;
  }

  static get<T, R>(obj: T, path: string, defaultValue?: R): R | undefined {
    const keys = path.split(".");
    let current: any = obj;
    for (const key of keys) {
      if (current === null || current === undefined) {
        return defaultValue;
      }
      current = current[key];
    }
    return current === undefined ? defaultValue : current;
  }
}