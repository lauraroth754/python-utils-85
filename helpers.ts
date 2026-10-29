export type DataMap<T> = Record<string, T>;

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result as Omit<T, K>;
};

export const groupBy = <T>(arr: T[], key: keyof T): DataMap<T[]> => {
  return arr.reduce((acc, item) => {
    const val = String(item[key]);
    acc[val] = acc[val] || [];
    acc[val].push(item);
    return acc;
  }, {} as DataMap<T[]>);
};

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
};