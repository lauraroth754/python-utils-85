export type DataTransformer<T, R> = (data: T) => R;

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as any;
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  ) as T;
};

export const pipeline = <T>(initial: T, ...fns: DataTransformer<any, any>[]): any => {
  return fns.reduce((val, fn) => fn(val), initial);
};

export const getOrDefault = <T>(value: T | undefined | null, fallback: T): T => {
  return value ?? fallback;
};

export const partition = <T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  return array.reduce(
    (acc, item) => {
      acc[predicate(item) ? 0 : 1].push(item);
      return acc;
    },
    [[], []] as [T[], T[]]
  );
};