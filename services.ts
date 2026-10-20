export interface DataPayload {
  id: string;
  value: number;
  tags?: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePayload(data: unknown): ValidationResult {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Input must be a non-null object'] };
  }

  const obj = data as Record<string, unknown>;
  if (typeof obj.id !== 'string' || obj.id.trim() === '') {
    errors.push('Field "id" must be a non-empty string');
  }

  if (typeof obj.value !== 'number' || Number.isNaN(obj.value)) {
    errors.push('Field "value" must be a valid number');
  }

  if (obj.tags !== undefined && !Array.isArray(obj.tags)) {
    errors.push('Field "tags" must be an array of strings if provided');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function processBatch(items: unknown[]): { processed: DataPayload[]; skipped: number } {
  const processed: DataPayload[] = [];
  let skipped = 0;

  for (const item of items) {
    const validation = validatePayload(item);
    if (!validation.valid) {
      skipped++;
      continue;
    }
    processed.push(item as DataPayload);
  }

  return { processed, skipped };
}