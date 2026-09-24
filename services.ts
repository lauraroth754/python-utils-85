export interface DataPayload {
  id: string;
  command: string;
  args: Record<string, unknown>;
  timeoutMs?: number;
}

export interface ProcessingResult {
  processedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
}

export function validatePayload(item: unknown): item is DataPayload {
  if (typeof item !== 'object' || item === null) {
    return false;
  }
  const candidate = item as Record<string, unknown>;
  if (typeof candidate.id !== 'string' || candidate.id.trim() === '') {
    return false;
  }
  if (typeof candidate.command !== 'string' || candidate.command.trim() === '') {
    return false;
  }
  if (typeof candidate.args !== 'object' || candidate.args === null || Array.isArray(candidate.args)) {
    return false;
  }
  if (candidate.timeoutMs !== undefined && (typeof candidate.timeoutMs !== 'number' || candidate.timeoutMs <= 0)) {
    return false;
  }
  return true;
}

export class BatchProcessor {
  private maxBatchSize: number;

  constructor(maxBatchSize: number = 100) {
    this.maxBatchSize = maxBatchSize;
  }

  public async processLoop(rawInputs: unknown[]): Promise<ProcessingResult> {
    const result: ProcessingResult = {
      processedCount: 0,
      failedCount: 0,
      errors: [],
    };

    if (!Array.isArray(rawInputs) || rawInputs.length > this.maxBatchSize) {
      throw new Error(`Input batch exceeds maximum allowed size of ${this.maxBatchSize}`);
    }

    for (let i = 0; i < rawInputs.length; i++) {
      const item = rawInputs[i];

      if (!validatePayload(item)) {
        const itemId = (item && typeof item === 'object' && 'id' in item && typeof (item as Record<string, unknown>).id === 'string')
          ? (item as Record<string, unknown>).id as string
          : `index_${i}`;
        result.failedCount++;
        result.errors.push({ id: itemId, error: 'Invalid payload structure' });
        continue;
      }

      try {
        await this.executeItem(item);
        result.processedCount++;
      } catch (err) {
        result.failedCount++;
        result.errors.push({ id: item.id, error: err instanceof Error ? err.message : String(err) });
      }
    }

    return result;
  }

  private async executeItem(item: DataPayload): Promise<void> {
    if (item.command === 'invalid') {
      throw new Error('Command execution failed');
    }
  }
}