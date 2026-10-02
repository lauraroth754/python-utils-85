export interface InputData {
  id: string;
  value: number;
  metadata?: Record<string, unknown>;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateInput = (data: unknown): InputData => {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('input must be a non-null object');
  }

  const input = data as InputData;
  if (typeof input.id !== 'string' || input.id.trim() === '') {
    throw new ValidationError('id field is required and must be a string');
  }

  if (typeof input.value !== 'number' || isNaN(input.value)) {
    throw new ValidationError('value field must be a valid number');
  }

  return input;
};

export const processMainLoop = (inputs: unknown[]): InputData[] => {
  const results: InputData[] = [];
  for (const raw of inputs) {
    try {
      results.push(validateInput(raw));
    } catch (e) {
      if (e instanceof ValidationError) {
        console.error(`skipping invalid input: ${e.message}`);
        continue;
      }
      throw e;
    }
  }
  return results;
};