function deepMerge<T>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

function flattenArray<T>(arrays: T[][]): T[] {
  return [].concat(...arrays);
}

export { deepMerge, isEmpty, flattenArray };