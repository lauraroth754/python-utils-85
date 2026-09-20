export type DataMap = Record<string, unknown>;

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const pick = <T extends DataMap, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const isEmpty = (data: unknown): boolean => {
  if (data === null || data === undefined) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') return Object.keys(data as DataMap).length === 0;
  return false;
};

export const normalizeKeys = (obj: DataMap): DataMap => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const normalized = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    acc[normalized] = value;
    return acc;
  }, {} as DataMap);
};