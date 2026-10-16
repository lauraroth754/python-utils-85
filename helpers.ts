export function* range(start: number, stop?: number, step = 1): Generator<number> {
  const begin = stop === undefined ? 0 : start;
  const end = stop === undefined ? start : stop;

  if (step === 0) {
    throw new Error("range() step argument must not be zero");
  }

  if (step > 0) {
    for (let i = begin; i < end; i += step) {
      yield i;
    }
  } else {
    for (let i = begin; i > end; i += step) {
      yield i;
    }
  }
}

export function zip<T extends unknown[][]>(...arrays: T): Array<{ [K in keyof T]: T[K] extends Array<infer U> ? U : never }> {
  if (arrays.length === 0) return [];
  const minLen = Math.min(...arrays.map((arr) => arr.length));
  const result: any[] = [];
  for (let i = 0; i < minLen; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }
  return result;
}

export function* enumerate<T>(iterable: Iterable<T>, start = 0): Generator<[number, T]> {
  let index = start;
  for (const item of iterable) {
    yield [index++, item];
  }
}

export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function dictFromKeys<K extends PropertyKey, V>(keys: K[], defaultValue: V): Record<K, V> {
  const result = {} as Record<K, V>;
  for (const key of keys) {
    result[key] = defaultValue;
  }
  return result;
}