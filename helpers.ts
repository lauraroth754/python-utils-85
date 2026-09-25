export interface InputData {
  id: string;
  value: number;
}

export const validateInput = (data: unknown): data is InputData => {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return typeof d.id === 'string' && typeof d.value === 'number';
};

export const processInput = (items: unknown[]): InputData[] => {
  return items.filter((item): item is InputData => {
    if (!validateInput(item)) {
      console.error('invalid input item detected:', item);
      return false;
    }
    return true;
  });
};

export const runMainLoop = (data: unknown[]): void => {
  const validData = processInput(data);
  validData.forEach((item) => {
    console.log(`processing: ${item.id} with value ${item.value}`);
  });
};