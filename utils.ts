export class UtilityError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'UtilityError';
  }
}

export function safeParseJson<T>(jsonString: string, fallback: T): T {
  if (typeof jsonString !== 'string' || !jsonString.trim()) {
    return fallback;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

export function safeExecute<T>(
  fn: () => T,
  fallback: T,
  onError?: (error: UtilityError) => void
): T {
  try {
    return fn();
  } catch (error) {
    const wrapped = new UtilityError(
      error instanceof Error ? error.message : 'Unknown execution failure',
      'EXECUTION_FAILED',
      error
    );
    onError?.(wrapped);
    return fallback;
  }
}

export function safeSlice<T>(arr: T[], start: number, end?: number): T[] {
  if (!Array.isArray(arr)) {
    return [];
  }
  const safeStart = Number.isInteger(start) ? Math.max(0, start) : 0;
  const safeEnd =
    end !== undefined && Number.isInteger(end)
      ? Math.min(arr.length, end)
      : arr.length;
  return safeStart >= safeEnd ? [] : arr.slice(safeStart, safeEnd);
}