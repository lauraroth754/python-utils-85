export function range(start: number, stop?: number, step = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  const result: number[] = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const minLength = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < minLength; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

export function enumerate<T>(iterable: Iterable<T>, start = 0): [number, T][] {
  const result: [number, T][] = [];
  let index = start;
  for (const item of iterable) {
    result.push([index++, item]);
  }
  return result;
}

export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of array) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail];
}