export type DataEntry = Record<string, unknown>;

export const normalizeData = <T extends DataEntry>(data: T[]): T[] => {
  return data.map((item) => {
    const cleaned = { ...item };
    for (const key in cleaned) {
      if (cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    }
    return cleaned;
  });
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const getNestedValue = (obj: DataEntry, path: string): unknown => {
  return path.split('.').reduce((acc, part) => {
    return acc && typeof acc === 'object' && part in acc ? (acc as DataEntry)[part] : undefined;
  }, obj as unknown);
};

export const sortData = <T extends DataEntry>(data: T[], key: keyof T, asc = true): T[] => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1;
    if (a[key] > b[key]) return asc ? 1 : -1;
    return 0;
  });
};