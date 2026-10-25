export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop) || step === 0) {
    return [];
  }
  const result: number[] = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}