export const chunkArray = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const getUnique = <T>(arr: T[]): T[] => [...new Set(arr)];

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);

export const formatDate = (date: Date): string =>
  date.toISOString().split('T')[0];

export const isNotEmpty = <T>(val: T | null | undefined): val is T =>
  val !== null && val !== undefined;

export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);