export type DataMap<T = unknown> = Record<string, T>;

export const sanitizeData = <T extends DataMap>(data: T): T => {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sanitized[key] === null || sanitized[key] === undefined) {
      delete sanitized[key];
    }
  }
  return sanitized;
};

export const groupBy = <T>(array: T[], key: keyof T): Map<T[keyof T], T[]> => {
  return array.reduce((map, item) => {
    const value = item[key];
    const collection = map.get(value) ?? [];
    collection.push(item);
    map.set(value, collection);
    return map;
  }, new Map<T[keyof T], T[]>());
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as unknown as T;
  const result = { ...obj } as T;
  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = deepClone(result[key]);
    }
  }
  return result;
};