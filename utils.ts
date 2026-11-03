export type DataMap = Record<string, unknown>;

export const pick = <T extends DataMap, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
};

export const omit = <T extends DataMap, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result as Omit<T, K>;
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const sanitize = (data: unknown): unknown => {
  if (data === null || typeof data !== 'object') {
    return data;
  }
  return JSON.parse(JSON.stringify(data));
};

export const isEmpty = (obj: DataMap | unknown[]): boolean => {
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
};