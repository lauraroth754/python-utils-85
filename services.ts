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

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const validateKeys = (data: DataMap, required: string[]): boolean => {
  return required.every((key) => Object.prototype.hasOwnProperty.call(data, key));
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const mapBy = <T>(array: T[], key: keyof T): Map<T[keyof T], T> => {
  const map = new Map<T[keyof T], T>();
  array.forEach((item) => map.set(item[key], item));
  return map;
};