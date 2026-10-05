interface ProcessInput {
  id: string;
  value: number;
}

export const processData = (items: unknown[]): void => {
  for (const item of items) {
    if (!isValid(item)) {
      console.error('Invalid input encountered:', item);
      continue;
    }
    run(item);
  }
};

const isValid = (data: unknown): data is ProcessInput => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    typeof (data as ProcessInput).id === 'string' &&
    'value' in data &&
    typeof (data as ProcessInput).value === 'number'
  );
};

const run = (input: ProcessInput): void => {
  console.log(`Processing ${input.id} with value ${input.value}`);
};