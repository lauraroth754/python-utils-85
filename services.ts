export interface ProcessResult {
  success: boolean;
  data: any;
  error: string | null;
}

export interface ServiceConfig {
  timeout: number;
  retries: number;
}

/**
 * Executes a data processing task with configurable parameters.
 */
export const executeTask = async (payload: Record<string, any>, config: ServiceConfig): Promise<ProcessResult> => {
  try {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(config.timeout),
    });

    if (!response.ok) {
      return { success: false, data: null, error: `Status ${response.status}` };
    }

    const data = await response.json();
    return { success: true, data, error: null };
  } catch (err: unknown) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

/**
 * Formats processing results into standard output structure.
 */
export const formatResult = (result: ProcessResult): string => {
  return result.success ? `Success: ${JSON.stringify(result.data)}` : `Failure: ${result.error}`;
};