interface ProcessInput {
  id: string;
  value: number;
}

export const processData = (items: unknown[]): void => {
  for (const item of items) {
    if (!isValid(item)) {
      console.error('Invalid input encountered');
      continue;
    }
    runLogic(item);
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

const runLogic = (item: ProcessInput): void => {
  console.log(`Processing item ${item.id}: ${item.value}`);
};