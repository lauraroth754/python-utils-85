export type DataMap = Record<string, unknown>;

export const isObject = (item: unknown): item is DataMap => {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as unknown as T;
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

export const flattenObject = (obj: DataMap, prefix = ''): DataMap => {
  return Object.keys(obj).reduce((acc: DataMap, key: string) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (isObject(obj[key] as unknown)) {
      Object.assign(acc, flattenObject(obj[key] as DataMap, newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};

export const sanitizeData = <T extends DataMap>(data: T, keys: string[]): Partial<T> => {
  const sanitized = { ...data };
  keys.forEach((key) => delete sanitized[key as keyof T]);
  return sanitized;
};