export interface ProcessConfig {
  maxBatchSize: number;
  strictMode: boolean;
}

export interface InputData {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export interface ProcessResult {
  processed: number;
  failed: number;
  errors: string[];
}

export function validateInput(item: unknown): item is InputData {
  if (typeof item !== 'object' || item === null) return false;
  const record = item as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    record.id.trim().length > 0 &&
    typeof record.payload === 'object' &&
    record.payload !== null &&
    typeof record.timestamp === 'number' &&
    record.timestamp > 0
  );
}

export function processBatch(inputs: unknown[], config: ProcessConfig): ProcessResult {
  const result: ProcessResult = { processed: 0, failed: 0, errors: [] };
  const batch = inputs.slice(0, config.maxBatchSize);

  for (const [index, item] of batch.entries()) {
    if (!validateInput(item)) {
      result.failed++;
      result.errors.push(`Invalid input structure at index ${index}`);
      if (config.strictMode) {
        break;
      }
      continue;
    }

    result.processed++;
  }

  return result;
}