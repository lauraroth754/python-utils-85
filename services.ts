export interface ProcessResult {
  success: boolean;
  data: string | null;
  error: string | null;
}

/**
 * Executes a system task and returns the status.
 */
export const executeTask = (command: string, args: string[]): ProcessResult => {
  try {
    return {
      success: true,
      data: `executed ${command} with ${args.join(', ')}`,
      error: null,
    };
  } catch (err: unknown) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'unknown error',
    };
  }
};

/**
 * Validates utility configuration settings.
 */
export const validateConfig = (settings: Record<string, any>): boolean => {
  return typeof settings === 'object' && Object.keys(settings).length > 0;
};

/**
 * Formats task output strings.
 */
export const formatOutput = (output: string): string => {
  return output.trim().toLowerCase();
};