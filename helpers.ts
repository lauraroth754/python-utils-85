export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }
  return result;
}

export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const minLen = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < minLen; i++) {
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
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}