export interface ProcessingConfig {
  inputPath: string;
  batchSize: number;
  timeout: number;
}

export const validateConfig = (config: unknown): config is ProcessingConfig => {
  if (typeof config !== 'object' || config === null) return false;
  const c = config as Record<string, unknown>;
  return (
    typeof c.inputPath === 'string' &&
    typeof c.batchSize === 'number' &&
    c.batchSize > 0 &&
    typeof c.timeout === 'number' &&
    c.timeout >= 0
  );
};

export const processData = (config: unknown): void => {
  if (!validateConfig(config)) {
    throw new Error('invalid processing configuration provided');
  }

  const { inputPath, batchSize, timeout } = config;
  console.log(`processing ${inputPath} with batch size ${batchSize}`);

  setTimeout(() => {
    console.log('processing complete');
  }, timeout);
};

export const runMainLoop = (configs: unknown[]): void => {
  configs.forEach((cfg) => {
    try {
      processData(cfg);
    } catch (err) {
      console.error(`skipping invalid config: ${(err as Error).message}`);
    }
  });
};