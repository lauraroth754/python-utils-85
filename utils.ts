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

export const flattenObject = (obj: DataMap, prefix = ''): DataMap => {
  return Object.keys(obj).reduce((acc: DataMap, key: string) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key] as DataMap, pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});
};

export const pick = <T extends DataMap, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};