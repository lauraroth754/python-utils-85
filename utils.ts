export function* range(start: number, stop?: number, step: number = 1): Generator<number, void> {
  const actualStart = stop === undefined ? 0 : start;
  const actualStop = stop === undefined ? start : stop;

  if (step === 0) {
    throw new Error("step cannot be 0");
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

export function* enumerate<T>(iterable: Iterable<T>, start: number = 0): Generator<[number, T], void> {
  let index = start;
  for (const item of iterable) {
    yield [index++, item];
  }
}

export function* zip<T extends any[]>(...iterables: { [K in keyof T]: Iterable<T[K]> }): Generator<T, void> {
  const iterators = iterables.map(it => it[Symbol.iterator]());
  try {
    while (true) {
      const results = iterators.map(it => it.next());
      if (results.some(r => r.done)) {
        return;
      }
      yield results.map(r => r.value) as T;
    }
  } finally {
    for (const iterator of iterators) {
      if (iterator.return) {
        iterator.return();
      }
    }
  }
}