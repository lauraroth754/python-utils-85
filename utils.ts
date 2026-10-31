export class PythonUtilsError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export interface SliceOptions {
  start?: number;
  stop?: number;
  step?: number;
}

export function parseSlice(input: string): SliceOptions {
  if (typeof input !== 'string') {
    throw new PythonUtilsError('Input must be a string', 'ERR_INVALID_TYPE');
  }

  const trimmed = input.trim();
  if (!trimmed) {
    throw new PythonUtilsError('Slice string cannot be empty', 'ERR_EMPTY_STRING');
  }

  const parts = trimmed.split(':');
  if (parts.length > 3) {
    throw new PythonUtilsError('Slice format cannot exceed 2 colons', 'ERR_INVALID_FORMAT');
  }

  const parseNumber = (val: string, fieldName: string): number | undefined => {
    const cleanVal = val.trim();
    if (cleanVal === '') return undefined;
    const num = Number(cleanVal);
    if (!Number.isInteger(num)) {
      throw new PythonUtilsError(`Invalid ${fieldName} value: must be an integer`, 'ERR_NON_INTEGER');
    }
    return num;
  };

  const step = parts.length === 3 ? parseNumber(parts[2], 'step') : undefined;
  if (step === 0) {
    throw new PythonUtilsError('Slice step cannot be zero', 'ERR_ZERO_STEP');
  }

  return {
    start: parts[0] !== undefined ? parseNumber(parts[0], 'start') : undefined,
    stop: parts[1] !== undefined ? parseNumber(parts[1], 'stop') : undefined,
    step,
  };
}

export function safeRange(start: number, stop?: number, step = 1): number[] {
  if (!Number.isFinite(start) || (stop !== undefined && !Number.isFinite(stop)) || !Number.isFinite(step)) {
    throw new PythonUtilsError('Range arguments must be finite numbers', 'ERR_NON_FINITE');
  }
  if (step === 0) {
    throw new PythonUtilsError('Range step cannot be zero', 'ERR_ZERO_STEP');
  }

  let actualStart = start;
  let actualStop = stop;
  if (actualStop === undefined) {
    actualStop = start;
    actualStart = 0;
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