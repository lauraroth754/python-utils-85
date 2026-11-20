export type Processor = (data: any) => any;

export interface Config {
  readonly verbose: boolean;
  readonly timeout: number;
}

export const sanitize = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

export const execute = async <T>(
  task: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await task();
  } catch (err) {
    if (retries > 0) {
      return execute(task, retries - 1);
    }
    throw err;
  }
};

export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const isNotEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const formatTimestamp = (date: Date = new Date()): string => {
  return date.toISOString();
};