export type DataMap = Record<string, unknown>;

export const sanitizeData = <T extends DataMap>(data: T): T => {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sanitized[key] === null || sanitized[key] === undefined) {
      delete sanitized[key];
    }
  }
  return sanitized;
};

export const normalizeKeys = (data: DataMap): DataMap => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
    acc[normalizedKey] = value;
    return acc;
  }, {} as DataMap);
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const getNestedValue = (obj: DataMap, path: string): unknown => {
  return path.split('.').reduce((acc: any, part) => acc?.[part], obj);
};

export const isValidRecord = (value: unknown): value is DataMap => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};