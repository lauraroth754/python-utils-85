function deepMerge<T>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

function flattenArray<T>(array: T[][]): T[] {
  return array.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);
}

function getUniqueValues<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object';
}

export { deepMerge, flattenArray, getUniqueValues, isObject };