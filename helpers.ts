export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

/**
 * Recursively cleans an object by removing undefined keys.
 */
export function sanitize(data: Record<string, any>): Record<string, JsonValue> {
  const result: Record<string, JsonValue> = {};
  for (const key in data) {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  }
  return result;
}

/**
 * Format a python-style snake_case string to camelCase.
 */
export function toCamelCase(input: string): string {
  return input.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );
}

/**
 * Delay execution for a specified number of milliseconds.
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Partition an array into chunks of a specific size.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}