export interface ProcessingResult {
  success: boolean;
  data?: any;
  error?: string;
}

export const validateInput = (input: unknown): input is Record<string, any> => {
  return typeof input === 'object' && input !== null && 'id' in input;
};

export const processData = (items: unknown[]): ProcessingResult[] => {
  return items.map((item) => {
    if (!validateInput(item)) {
      return { success: false, error: 'invalid input format' };
    }

    try {
      const result = { ...item, processedAt: Date.now() };
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: 'processing failure' };
    }
  });
};

export const runMainLoop = (batch: unknown[]): void => {
  const results = processData(batch);
  results.forEach((res, idx) => {
    if (!res.success) {
      console.error(`Item ${idx} failed: ${res.error}`);
    } else {
      console.log(`Item ${idx} processed:`, res.data);
    }
  });
};