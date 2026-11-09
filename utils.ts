export type Numeric = number | bigint;

export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);

export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const debounce = <T extends (...args: any[]) => void>(
  fn: T, delay: number
): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export const getOrElse = <T>(value: T | null | undefined, defaultValue: T): T =>
  value ?? defaultValue;

export const isNumeric = (val: unknown): val is Numeric =>
  typeof val === 'number' || typeof val === 'bigint';