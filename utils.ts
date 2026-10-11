interface ProcessConfig {
  maxRetries: number;
  timeout: number;
}

export const processInput = (data: unknown, config: ProcessConfig): void => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('invalid input data format');
  }

  if (typeof config.maxRetries !== 'number' || config.maxRetries < 0) {
    throw new Error('invalid configuration parameters');
  }

  const input = data as Record<string, unknown>;

  if (!('id' in input && typeof input.id === 'string')) {
    throw new Error('missing required identifier field');
  }

  console.log(`processing entity ${input.id} with ${config.maxRetries} retries`);
};

export const runMainLoop = (items: unknown[], config: ProcessConfig): void => {
  for (const item of items) {
    try {
      processInput(item, config);
    } catch (err) {
      console.error('validation failure in processing loop', err);
    }
  }
};