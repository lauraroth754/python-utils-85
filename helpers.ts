/**
 * Generates a sequence of numbers from start to stop by step.
 *
 * @param start - Starting value or end value if stop is omitted.
 * @param stop - Exclusive upper bound.
 * @param step - Step increment between values.
 * @returns Array of generated numbers.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error("range() step argument must not be zero");
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Pairs elements from input arrays into tuple elements.
 *
 * @template T - Element types of input arrays.
 * @param arrays - Target arrays to aggregate.
 * @returns Aggregated array of element tuples.
 */
export function zip<T extends unknown[][]>(...arrays: T): { [K in keyof T]: T[K] extends (infer U)[] ? U : never }[] {
  if (arrays.length === 0) return [];
  const minLen = Math.min(...arrays.map((arr) => arr.length));
  const result: any[] = [];

  for (let i = 0; i < minLen; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }

  return result;
}

/**
 * Pairs array elements with their incremental index.
 *
 * @template T - Type of items in array.
 * @param collection - Array to enumerate.
 * @param start - Starting index value.
 * @returns Array of tuples containing index and element.
 */
export function enumerate<T>(collection: T[], start: number = 0): [number, T][] {
  return collection.map((item, index) => [start + index, item]);
}
