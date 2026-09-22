export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  const result: number[] = [];
  if (step === 0) return result;
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

export function zip<T, U>(arr1: readonly T[], arr2: readonly U[]): [T, U][] {
  const minLength = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < minLength; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

export function enumerate<T>(arr: readonly T[]): [number, T][] {
  return arr.map((val, index) => [index, val]);
}

export function choice<T>(arr: readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}