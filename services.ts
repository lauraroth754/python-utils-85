export interface ProcessTask {
  id: string;
  payload: Record<string, unknown>;
  priority?: number;
  timeoutMs?: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class BatchProcessor {
  public validateTask(task: unknown): ValidationResult {
    const errors: string[] = [];

    if (typeof task !== 'object' || task === null) {
      return { valid: false, errors: ['Task must be a non-null object'] };
    }

    const candidate = task as Record<string, unknown>;

    if (typeof candidate.id !== 'string' || candidate.id.trim() === '') {
      errors.push('Task id must be a non-empty string');
    }

    if (typeof candidate.payload !== 'object' || candidate.payload === null) {
      errors.push('Task payload must be a non-null object');
    }

    if (candidate.priority !== undefined && typeof candidate.priority !== 'number') {
      errors.push('Task priority must be a number');
    }

    if (candidate.timeoutMs !== undefined && (typeof candidate.timeoutMs !== 'number' || candidate.timeoutMs <= 0)) {
      errors.push('Task timeoutMs must be a positive number');
    }

    return { valid: errors.length === 0, errors };
  }

  public processBatch(tasks: unknown[]): { processed: string[]; skipped: Array<{ task: unknown; errors: string[] }> } {
    const processed: string[] = [];
    const skipped: Array<{ task: unknown; errors: string[] }> = [];

    for (const item of tasks) {
      const validation = this.validateTask(item);
      if (!validation.valid) {
        skipped.push({ task: item, errors: validation.errors });
        continue;
      }
      const task = item as ProcessTask;
      processed.push(task.id);
    }

    return { processed, skipped };
  }
}
