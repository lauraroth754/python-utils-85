export interface ProcessedData {
  id: string;
  value: number;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateInput = (input: unknown): input is ProcessedData => {
  if (typeof input !== 'object' || input === null) return false;
  const data = input as Record<string, unknown>;
  return (
    typeof data.id === 'string' &&
    typeof data.value === 'number' &&
    !isNaN(data.value)
  );
};

export const processInput = (data: unknown[]): ProcessedData[] => {
  return data.reduce<ProcessedData[]>((acc, item) => {
    if (validateInput(item)) {
      acc.push(item);
    } else {
      throw new ValidationError(`Invalid data structure: ${JSON.stringify(item)}`);
    }
    return acc;
  }, []);
};