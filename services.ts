export interface TaskResult<T> {
  data: T | null;
  error: Error | null;
  timestamp: number;
}

export class DataProcessor {
  /**
   * processes input data and wraps in result object
   */
  process<T>(input: T): TaskResult<T> {
    try {
      return {
        data: input,
        error: null,
        timestamp: Date.now(),
      };
    } catch (e) {
      return {
        data: null,
        error: e as Error,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * validates presence of data in task result
   */
  isValid<T>(result: TaskResult<T>): boolean {
    return result.data !== null && result.error === null;
  }
}

export const formatOutput = (value: unknown): string => {
  return JSON.stringify(value, null, 2);
};