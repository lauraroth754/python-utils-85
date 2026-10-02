export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  if (step === 0) {
    throw new Error("step cannot be zero");
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

export function getNestedValue<T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined {
  const parts = path.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = current[part];
  }
  return current !== undefined ? (current as T) : defaultValue;
}

export function zip<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) return [];
  const minLength = Math.min(...arrays.map(arr => arr.length));
  const result: T[][] = [];
  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map(arr => arr[i]));
  }
  return result;
}