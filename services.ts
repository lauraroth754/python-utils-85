export interface DataProcessor<T> {
  transform: (data: unknown) => T;
  validate: (data: T) => boolean;
}

export const sanitizeData = <T>(data: unknown, processor: DataProcessor<T>): T | null => {
  try {
    const transformed = processor.transform(data);
    return processor.validate(transformed) ? transformed : null;
  } catch (error) {
    return null;
  }
};

export const batchProcess = <T, R>(items: T[], fn: (item: T) => R): R[] => {
  return items.reduce((acc: R[], item) => {
    const result = fn(item);
    return result !== null ? [...acc, result] : acc;
  }, []);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const flattenDeep = <T>(array: any[]): T[] => {
  return array.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), 
  []);
};