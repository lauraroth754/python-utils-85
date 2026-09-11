export function range(start: number, stop?: number, step: number = 1): number[] {
  if (step === 0) {
    throw new Error("step argument must not be zero");
  }

  let actualStart = start;
  let actualStop = stop;

  if (actualStop === undefined) {
    actualStop = start;
    actualStart = 0;
  }

  if ((step > 0 && actualStart > actualStop) || (step < 0 && actualStart < actualStop)) {
    return [];
  }

  const totalSteps = Math.ceil((actualStop - actualStart) / step);
  if (totalSteps <= 0 || !isFinite(totalSteps)) {
    return [];
  }

  const result: number[] = [];
  for (let i = 0; i < totalSteps; i++) {
    result.push(actualStart + i * step);
  }

  return result;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array for chunking");
  }
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError("Chunk size must be a positive integer");
  }

  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}