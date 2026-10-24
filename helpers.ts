export type Primitive = string | number | boolean | null | undefined;

export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const chunk = <T>(array: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export const isDefined = <T>(val: T | null | undefined): val is T =>
  val !== null && val !== undefined;

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();