export interface ProcessInput {
  id: string;
  value: number;
}

export const validateInput = (input: unknown): input is ProcessInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'id' in input &&
    'value' in input &&
    typeof (input as ProcessInput).id === 'string' &&
    typeof (input as ProcessInput).value === 'number'
  );
};

export const processLoop = (inputs: unknown[]): void => {
  for (const item of inputs) {
    if (!validateInput(item)) {
      console.error('invalid input structure encountered', item);
      continue;
    }

    if (item.value < 0) {
      console.warn('skipping negative value', item.id);
      continue;
    }

    console.log('processing item', item.id, item.value);
  }
};