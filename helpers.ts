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
    !Number.isNaN(data.value)
  );
};

export const processInput = (batch: unknown[]): ProcessedData[] => {
  const results: ProcessedData[] = [];
  for (const item of batch) {
    if (validateInput(item)) {
      results.push(item);
    } else {
      throw new ValidationError(`Invalid input detected: ${JSON.stringify(item)}`);
    }
  }
  return results;
};