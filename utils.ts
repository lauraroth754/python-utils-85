export function* range(start: number, stop?: number, step: number = 1): Generator<number> {
  const actualStart = stop === undefined ? 0 : start;
  const actualStop = stop === undefined ? start : stop;

  if (step === 0) {
    throw new Error("range() step argument must not be zero");
  }

  if (step > 0) {
    for (let i = actualStart; i < actualStop; i += step) {
      yield i;
    }
  } else {
    for (let i = actualStart; i > actualStop; i += step) {
      yield i;
    }
  }
}

export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

export function* enumerate<T>(iterable: Iterable<T>, start: number = 0): Generator<[number, T]> {
  let index = start;
  for (const item of iterable) {
    yield [index++, item];
  }
}