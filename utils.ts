export function range(start: number, stop?: number, step = 1): number[] {
  let actualStart = start;
  let actualStop = stop;

  if (actualStop === undefined) {
    actualStop = start;
    actualStart = 0;
  }

  if (!Number.isInteger(actualStart) || !Number.isInteger(actualStop) || !Number.isInteger(step)) {
    throw new TypeError("range() arguments must be integers");
  }

  if (step === 0) {
    throw new RangeError("range() arg 3 must not be zero");
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = actualStart; i < actualStop; i += step) {
      result.push(i);
      if (result.length > 1_000_000) {
        throw new RangeError("range() result exceeds maximum limit of 1,000,000 elements");
      }
    }
  } else {
    for (let i = actualStart; i > actualStop; i += step) {
      result.push(i);
      if (result.length > 1_000_000) {
        throw new RangeError("range() result exceeds maximum limit of 1,000,000 elements");
      }
    }
  }

  return result;
}