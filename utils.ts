export type Numeric = number | bigint;

/**
 * Calculates the average of a collection of numbers.
 */
export function calculateAverage(values: Numeric[]): number {
  if (values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc: number, val: Numeric) => acc + Number(val), 0);
  return sum / values.length;
}

/**
 * Splits an array into smaller chunks of a specified size.
 */
export function chunkArray<T>(data: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size));
  }
  return result;
}

/**
 * Returns a debounced version of the provided function.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Checks if a string is a valid identifier.
 */
export function isValidIdentifier(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}