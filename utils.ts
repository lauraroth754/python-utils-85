export type DataMap = Record<string, any>;

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const sanitizeObject = (obj: DataMap): DataMap => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as DataMap);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const getNestedValue = (obj: DataMap, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const uniqueArray = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isNotEmpty = (val: unknown): boolean => {
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'object' && val !== null) return Object.keys(val).length > 0;
  return val !== null && val !== undefined && val !== '';
};