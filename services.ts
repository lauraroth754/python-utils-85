interface ProcessingConfig {
  input: unknown;
  threshold: number;
}

export const validateInput = (data: unknown): data is ProcessingConfig => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'input' in data &&
    typeof (data as ProcessingConfig).threshold === 'number'
  );
};

export const processMainLoop = (items: unknown[]): void => {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('Invalid configuration schema detected');
      continue;
    }

    try {
      const { input, threshold } = item;
      if (threshold < 0) throw new Error('Negative threshold');
      console.log('Processing:', input);
    } catch (err) {
      console.error('Execution failure:', err);
    }
  }
};

export const runService = (payload: unknown[]): void => {
  if (!Array.isArray(payload)) return;
  processMainLoop(payload);
};