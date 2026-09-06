export type DataMap = Record<string, unknown>;

export const sanitize = (data: DataMap): DataMap => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = typeof value === 'object' && !Array.isArray(value) 
        ? sanitize(value as DataMap) 
        : value;
    }
    return acc;
  }, {} as DataMap);
};

export const flatten = (obj: DataMap, prefix = ''): DataMap => {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flatten(obj[key] as DataMap, pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {} as DataMap);
};

export const pluck = <T, K extends keyof T>(list: T[], key: K): T[K][] => {
  return list.map((item) => item[key]);
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};