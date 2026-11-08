export interface ProcessData {
  id: string;
  value: number;
  tags: string[];
}

export const validateProcessData = (data: unknown): data is ProcessData => {
  if (typeof data !== 'object' || data === null) return false;

  const { id, value, tags } = data as any;

  return (
    typeof id === 'string' &&
    typeof value === 'number' &&
    Array.isArray(tags) &&
    tags.every((tag) => typeof tag === 'string')
  );
};

export const processMainLoop = (items: unknown[]): void => {
  for (const item of items) {
    if (!validateProcessData(item)) {
      console.error('Invalid data structure encountered:', item);
      continue;
    }

    const { id, value, tags } = item;
    console.log(`Processing ${id}: ${value} with tags ${tags.join(', ')}`);
  }
};
