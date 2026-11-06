export type DataMap<T = unknown> = Record<string, T>;

export const getNestedValue = (obj: DataMap, path: string): unknown => {
  return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? (acc as DataMap)[key] : undefined), obj);
};

export const pick = <T extends DataMap, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};

export const cleanObject = <T extends DataMap>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

export const isIterable = (value: unknown): value is Iterable<unknown> => {
  return typeof value === 'object' && value !== null && Symbol.iterator in value;
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};