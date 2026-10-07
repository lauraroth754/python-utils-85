export type DataRecord = Record<string, unknown>;

export const sanitizeData = (data: DataRecord[]): DataRecord[] => {
  return data.map((item) => {
    const cleaned: DataRecord = {};
    for (const [key, value] of Object.entries(item)) {
      if (value !== null && value !== undefined && value !== '') {
        cleaned[key] = value;
      }
    }
    return cleaned;
  });
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const extractFields = <T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  fields.forEach((field) => {
    if (field in obj) {
      result[field] = obj[field];
    }
  });
  return result;
};