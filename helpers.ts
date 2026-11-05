export class EdgeCaseError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'EdgeCaseError';
  }
}

export function safeJsonParse<T>(input: unknown, fallback: T): T {
  if (typeof input !== 'string') {
    return fallback;
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return fallback;
  }
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return fallback;
  }
}

export function safeGet<T, R>(obj: T, path: string, defaultValue: R): R {
  if (obj === null || obj === undefined || typeof path !== 'string') {
    return defaultValue;
  }
  const keys = path.split('.').filter(Boolean);
  let current: any = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }
  return current === undefined ? defaultValue : (current as R);
}

export function safeDivide(numerator: number, denominator: number): number {
  if (typeof numerator !== 'number' || typeof denominator !== 'number') {
    throw new EdgeCaseError('Inputs must be valid numbers', 'ERR_INVALID_TYPE');
  }
  if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
    throw new EdgeCaseError('Cannot perform arithmetic on NaN', 'ERR_NAN_INPUT');
  }
  if (denominator === 0) {
    throw new EdgeCaseError('Division by zero is undefined', 'ERR_ZERO_DIVISION');
  }
  return numerator / denominator;
}

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
    throw new EdgeCaseError('Clamp bounds and value must be valid numbers', 'ERR_NAN_BOUNDS');
  }
  if (min > max) {
    throw new EdgeCaseError('Minimum bound cannot exceed maximum bound', 'ERR_INVALID_RANGE');
  }
  return Math.min(Math.max(value, min), max);
}