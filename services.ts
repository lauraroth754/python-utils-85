export interface CleanOptions {
  removeEmptyStrings?: boolean;
  removeNulls?: boolean;
}

export class DataProcessorService {
  static getNestedValue<T>(obj: Record<string, any>, path: string, defaultValue?: T): T | undefined {
    const keys = path.split('.');
    let current: any = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }

    return current !== undefined ? (current as T) : defaultValue;
  }

  static setNestedValue(obj: Record<string, any>, path: string, value: any): Record<string, any> {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return obj;
  }

  static cleanObject<T extends Record<string, any>>(obj: T, options: CleanOptions = {}): Partial<T> {
    const { removeEmptyStrings = false, removeNulls = true } = options;
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (removeNulls && (value === null || value === undefined)) {
        continue;
      }
      if (removeEmptyStrings && typeof value === 'string' && value.trim() === '') {
        continue;
      }
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const cleaned = this.cleanObject(value, options);
        if (Object.keys(cleaned).length > 0) {
          result[key] = cleaned;
        }
      } else {
        result[key] = value;
      }
    }

    return result as Partial<T>;
  }
}