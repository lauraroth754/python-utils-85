export function isObject(item: unknown): item is Record<string, any> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceVal = source[key];
        if (isObject(sourceVal)) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          deepMerge(target[key], sourceVal);
        } else {
          Object.assign(target, { [key]: sourceVal });
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}

export function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (isObject(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
    } else {
      acc[`${pre}${key}`] = obj[key];
    }
    return acc;
  }, {});
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error('Chunk size must be greater than zero');
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}