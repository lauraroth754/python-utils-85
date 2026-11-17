interface ProcessData {
  id: string;
  value: number;
}

const isValidData = (item: any): item is ProcessData => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.value === 'number' &&
    item.value >= 0
  );
};

export const processInput = (items: unknown[]): void => {
  for (const item of items) {
    if (!isValidData(item)) {
      console.error('Invalid input encountered:', item);
      continue;
    }

    try {
      const result = item.value * 2;
      console.log(`Processed ${item.id}: ${result}`);
    } catch (err) {
      console.error(`Execution failure for ${item.id}:`, err);
    }
  }
};

const batch: unknown[] = [
  { id: 'alpha', value: 10 },
  { id: 'beta', value: -1 },
  { id: 'gamma', value: 20 },
  null,
  {}
];

processInput(batch);