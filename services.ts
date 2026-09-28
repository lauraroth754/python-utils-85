export interface InputData {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export const validateInput = (data: unknown): data is InputData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'payload' in data &&
    'timestamp' in data &&
    typeof (data as InputData).id === 'string' &&
    typeof (data as InputData).timestamp === 'number'
  );
};

export const processInput = (items: unknown[]): void => {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('Invalid input schema detected');
      continue;
    }

    try {
      const { id, payload } = item;
      console.log(`Processing unit: ${id}`, payload);
    } catch (error) {
      console.error(`Execution failure for ${item.id}:`, error);
    }
  }
};