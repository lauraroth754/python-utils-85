export function range(start: number, stop?: number, step: number = 1): number[] {
  if (step === 0) {
    throw new Error("ValueError: range() arg 3 must not be zero");
  }

  const actualStart = stop === undefined ? 0 : start;
  const actualStop = stop === undefined ? start : stop;

  if (!Number.isInteger(actualStart) || !Number.isInteger(actualStop) || !Number.isInteger(step)) {
    throw new TypeError("TypeError: range() integer arguments expected");
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = actualStart; i < actualStop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = actualStart; i > actualStop; i += step) {
      result.push(i);
    }
  }
  return result;
}

export function safeIndex<T>(arr: T[], index: number, defaultValue: T | null = null): T | null {
  if (!Array.isArray(arr)) {
    throw new TypeError("TypeError: expected an array");
  }
  const resolvedIndex = index < 0 ? arr.length + index : index;
  if (resolvedIndex < 0 || resolvedIndex >= arr.length) {
    return defaultValue;
  }
  return arr[resolvedIndex];
}