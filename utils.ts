export const chunk = <T>(array: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );

export const debounce = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const isDefined = <T>(val: T | null | undefined): val is T =>
  val !== null && val !== undefined;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);