interface ProcessConfig {
  id: string;
  value: number;
}

export const validateInput = (input: unknown): input is ProcessConfig => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'id' in input &&
    typeof (input as any).id === 'string' &&
    'value' in input &&
    typeof (input as any).value === 'number'
  );
};

export const processData = (inputs: unknown[]): void => {
  for (const item of inputs) {
    if (!validateInput(item)) {
      console.error('invalid input structure encountered', item);
      continue;
    }

    try {
      console.log(`processing id: ${item.id} with value: ${item.value}`);
    } catch (err) {
      console.error('processing failure for item', item, err);
    }
  }
};

export const runMainLoop = (queue: unknown[]): void => {
  if (!Array.isArray(queue)) {
    throw new Error('input must be an array');
  }
  processData(queue);
};