export interface ProcessInput {
  value: unknown;
  priority: number;
}

export const validateInput = (input: unknown): input is ProcessInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'value' in input &&
    typeof (input as ProcessInput).priority === 'number'
  );
};

export const processBatch = (items: unknown[]): void => {
  for (const item of items) {
    if (!validateInput(item)) {
      throw new Error(`invalid input format: ${JSON.stringify(item)}`);
    }

    const { value, priority } = item;
    console.log(`processing ${value} with priority ${priority}`);
  }
};

export const safeProcess = (data: unknown[]): void => {
  try {
    processBatch(data);
  } catch (err) {
    console.error('processing interrupted:', err);
  }
};