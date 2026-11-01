export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
}

export const validateInput = (input: unknown): input is Record<string, unknown> => {
  return typeof input === 'object' && input !== null;
};

export const processMainLoop = (data: unknown[], config: ProcessingConfig): void => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid input: data must be an array');
  }

  for (const item of data) {
    if (!validateInput(item)) {
      console.warn('Skipping invalid item in loop');
      continue;
    }

    try {
      executeTask(item, config);
    } catch (err) {
      console.error('Task execution failed', err);
    }
  }
};

const executeTask = (item: Record<string, unknown>, config: ProcessingConfig): void => {
  if (!('id' in item)) {
    throw new Error('Missing required field: id');
  }
  console.log(`Processing item ${item.id} with timeout ${config.timeoutMs}`);
};