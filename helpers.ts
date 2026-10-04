/**
 * Generates a sequence of numbers from start (inclusive) to stop (exclusive) by step.
 */
export function* range(start: number, stop?: number, step: number = 1): Generator<number, void, unknown> {
  let begin = start;
  let end = stop;
  if (end === undefined) {
    end = start;
    begin = 0;
  }
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

/**
 * Returns an iterator of tuples containing index and value.
 */
export function* enumerate<T>(iterable: Iterable<T>, start: number = 0): Generator<[number, T], void, unknown> {
  let index = start;
  for (const item of iterable) {
    yield [index++, item];
  }
}

/**
 * Mimics Python's dict() constructor from key-value pairs.
 */
export function toDict<K extends string | number | symbol, V>(entries: Iterable<readonly [K, V]>): Record<K, V> {
  const result = {} as Record<K, V>;
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}