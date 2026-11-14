export type DataMap = Record<string, unknown>;

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const sanitizeData = (data: DataMap): DataMap => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as DataMap);
};

export const normalizeKeys = (data: DataMap): DataMap => {
  return Object.keys(data).reduce((acc, key) => {
    const normalized = key.toLowerCase().replace(/\s+/g, '_');
    acc[normalized] = data[key];
    return acc;
  }, {} as DataMap);
};

export const pluck = <T extends DataMap, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};