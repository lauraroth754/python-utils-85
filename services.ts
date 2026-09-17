/**
 * Service providing Python-like iteration and utility operations.
 */
export class IterService {
  /**
   * Generates a sequence of numbers from start to stop by step.
   * Mimics Python's range() function.
   */
  public static range(start: number, stop?: number, step: number = 1): number[] {
    if (step === 0) {
      throw new Error("range() arg 3 must not be zero");
    }
    const result: number[] = [];
    const actualStart = stop === undefined ? 0 : start;
    const actualStop = stop === undefined ? start : stop;

    if (step > 0) {
      for (let i = actualStart; i < actualStop; i += step) {
        result.push(i);
      }
    } else {
      for (let i = actualStart; i > actualStop; i += step) {
        result.push(i);
      }
    }
    return result;
  }

  /**
   * Groups elements of an array into chunks of a specified size.
   * Mimics a common itertools chunking pattern.
   */
  public static chunked<T>(array: T[], size: number): T[][] {
    if (size <= 0) {
      throw new Error("Chunk size must be greater than zero");
    }
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Pairs elements of two arrays together up to the shortest length.
   * Mimics Python's zip() function.
   */
  public static zip<T, U>(a: T[], b: U[]): [T, U][] {
    const length = Math.min(a.length, b.length);
    const result: [T, U][] = [];
    for (let i = 0; i < length; i++) {
      result.push([a[i], b[i]]);
    }
    return result;
  }
}