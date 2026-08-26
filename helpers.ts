export interface ProcessingInput {
  value: unknown;
  strict: boolean;
}

export function validateInput(input: unknown): asserts input is Record<string, unknown> {
  if (input === null || typeof input !== 'object') {
    throw new TypeError('Input must be a valid non-null object');
  }
}

export function processMainLoop(inputs: ProcessingInput[]): unknown[] {
  const results: unknown[] = [];
  
  for (const item of inputs) {
    validateInput(item.value);
    
    if (item.strict && Object.keys(item.value).length === 0) {
      throw new Error('Strict mode: input object cannot be empty');
    }
    
    results.push(item.value);
  }
  
  return results;
}