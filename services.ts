export interface ProcessingItem {
  id: string;
  payload: Record<string, unknown>;
  priority?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ProcessingService {
  private validateItem(item: unknown): ValidationResult {
    const errors: string[] = [];

    if (typeof item !== 'object' || item === null) {
      return { isValid: false, errors: ['Item must be a non-null object'] };
    }

    const candidate = item as Partial<ProcessingItem>;

    if (!candidate.id || typeof candidate.id !== 'string') {
      errors.push('Missing or invalid "id" field');
    }

    if (!candidate.payload || typeof candidate.payload !== 'object') {
      errors.push('Missing or invalid "payload" field');
    }

    if (candidate.priority !== undefined && typeof candidate.priority !== 'number') {
      errors.push('Invalid "priority" field type');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public processBatch(items: unknown[]): {
    processed: string[];
    skipped: Array<{ item: unknown; errors: string[] }>;
  } {
    const processed: string[] = [];
    const skipped: Array<{ item: unknown; errors: string[] }> = [];

    for (const item of items) {
      const validation = this.validateItem(item);
      if (!validation.isValid) {
        skipped.push({ item, errors: validation.errors });
        continue;
      }

      const validItem = item as ProcessingItem;
      processed.push(validItem.id);
    }

    return { processed, skipped };
  }
}
