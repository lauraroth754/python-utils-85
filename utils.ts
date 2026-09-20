export type DataMap = Record<string, unknown>;

export const sanitizeData = <T extends DataMap>(data: T): T => {
  const result = { ...data };
  for (const key in result) {
    if (result[key] === null || result[key] === undefined) {
      delete result[key];
    }
  }
  return result;
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const getNestedValue = (obj: DataMap, path: string): unknown => {
  return path.split('.').reduce((acc: any, part) => acc && acc[part], obj);
};

export const normalizeKeys = (obj: DataMap): DataMap => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
    acc[normalizedKey] = value;
    return acc;
  }, {} as DataMap);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};