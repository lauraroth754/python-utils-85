export type DataMap = Record<string, unknown>;

export const sanitizeData = <T extends DataMap>(data: T): T => {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sanitized[key] === undefined || sanitized[key] === null) {
      delete sanitized[key];
    }
  }
  return sanitized;
};

export const transformKeys = <T extends DataMap>(data: T, transform: (key: string) => string): DataMap => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[transform(key)] = value;
    return acc;
  }, {} as DataMap);
};

export const filterByKeys = <T extends DataMap>(data: T, keys: (keyof T)[]): Partial<T> => {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    if (key in data) {
      result[key] = data[key];
    }
  });
  return result;
};

export const mergeDeep = <T extends DataMap>(target: T, source: Partial<T>): T => {
  const output = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      output[key] = source[key] as T[keyof T];
    }
  }
  return output;
};