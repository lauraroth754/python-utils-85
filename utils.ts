export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }
  const result: any = {};
  Object.keys(obj as any).forEach((key) => {
    result[key] = deepClone((obj as any)[key]);
  });
  return result;
}

export function mergeData<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  const clonedTarget = deepClone(target);
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = (clonedTarget as any)[key];
    if (
      sourceValue !== null &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue !== null &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      (clonedTarget as any)[key] = mergeData(targetValue, sourceValue);
    } else {
      (clonedTarget as any)[key] = sourceValue;
    }
  });
  return clonedTarget as T & U;
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result as Pick<T, K>;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key as K)) {
      result[key] = (obj as any)[key];
    }
  });
  return result;
}