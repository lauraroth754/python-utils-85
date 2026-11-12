export interface TaskResult<T> {
  data: T | null;
  error: Error | null;
  timestamp: number;
}

export class ProcessService {
  public async executeTask<T>(task: () => Promise<T>): Promise<TaskResult<T>> {
    try {
      const data = await task();
      return { data, error: null, timestamp: Date.now() };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err : new Error(String(err)), timestamp: Date.now() };
    }
  }

  public formatPayload(input: Record<string, unknown>): string {
    return JSON.stringify(input);
  }

  public validateConfig(config: Record<string, any>): boolean {
    return typeof config === 'object' && config !== null && Object.keys(config).length > 0;
  }
}