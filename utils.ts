export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

export const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const deepClone = <T>(obj: T): T => 
  JSON.parse(JSON.stringify(obj));

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> =>
  array.reduce((acc, item) => {
    const group = String(item[key]);
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {} as Record<string, T[]>);

export const clamp = (val: number, min: number, max: number): number => 
  Math.min(Math.max(val, min), max);

export const isDefined = <T>(value: T | null | undefined): value is T => 
  value !== null && value !== undefined;

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  backoff: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await delay(backoff);
    return retry(fn, retries - 1, backoff * 2);
  }
};