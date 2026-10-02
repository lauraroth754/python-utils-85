export type DataEntry = Record<string, unknown>;

export const normalizeData = <T extends DataEntry>(data: T[]): T[] => {
  return data.map((item) => {
    const normalized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(item)) {
      normalized[key.trim().toLowerCase()] = typeof value === 'string' ? value.trim() : value;
    }
    return normalized as T;
  });
};

export const filterEmpty = <T extends DataEntry>(data: T[]): T[] => {
  return data.filter((item) => Object.values(item).some((v) => v !== null && v !== undefined && v !== ''));
};

export const groupBy = <T extends DataEntry>(data: T[], key: keyof T): Record<string, T[]> => {
  return data.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const pluck = <T extends DataEntry, K extends keyof T>(data: T[], key: K): T[K][] => {
  return data.map((item) => item[key]).filter((v): v is T[K] => v !== undefined);
};