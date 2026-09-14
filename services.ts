export type DataMap = Record<string, unknown>;

export const sanitizeData = (data: DataMap): DataMap => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = typeof value === 'object' ? sanitizeData(value as DataMap) : value;
    }
    return acc;
  }, {} as DataMap);
};

export const transformKeys = (data: DataMap, transform: (key: string) => string): DataMap => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const newKey = transform(key);
    acc[newKey] = value;
    return acc;
  }, {} as DataMap);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const validateSchema = (data: DataMap, keys: string[]): boolean => {
  return keys.every((key) => Object.prototype.hasOwnProperty.call(data, key));
};