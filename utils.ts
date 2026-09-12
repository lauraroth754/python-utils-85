interface ProcessingResult {
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
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  });
};

export const runMainLoop = (payloads: unknown[]): void => {
  const results = processData(payloads);
  results.forEach((res) => {
    if (!res.success) {
      console.error(`Processing error: ${res.error}`);
    }
  });
};