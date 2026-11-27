export type DataMap<T = unknown> = Record<string, T>;

export function sanitizeData<T extends DataMap>(data: T): T {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sanitized[key] === undefined || sanitized[key] === null) {
      delete sanitized[key];
    }
  }
  return sanitized;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function getDeepValue(obj: DataMap, path: string): unknown {
  return path.split('.').reduce((acc, part) => (acc as DataMap)?.[part], obj);
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}