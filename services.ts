export interface ProcessingConfig {
  input: unknown;
  maxRetries: number;
  timeoutMs: number;
}

export function validateConfig(config: unknown): config is ProcessingConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    'input' in config &&
    typeof (config as ProcessingConfig).maxRetries === 'number' &&
    typeof (config as ProcessingConfig).timeoutMs === 'number'
  );
}

export async function runProcessingLoop(configs: unknown[]): Promise<void> {
  for (const rawConfig of configs) {
    if (!validateConfig(rawConfig)) {
      console.error('invalid configuration structure', rawConfig);
      continue;
    }

    try {
      await processItem(rawConfig);
    } catch (err) {
      console.error('processing failed for input', rawConfig.input, err);
    }
  }
}

async function processItem(config: ProcessingConfig): Promise<void> {
  if (config.timeoutMs < 0) throw new Error('invalid timeout');
  // process logic here
}