export type DataMap = Record<string, unknown>;

export function sanitizeData(data: DataMap): DataMap {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = typeof value === 'string' ? value.trim() : value;
    }
    return acc;
  }, {} as DataMap);
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function getNestedValue(obj: DataMap, path: string): unknown {
  return path.split('.').reduce((acc, key) => (acc as DataMap)?.[key], obj);
}

export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}