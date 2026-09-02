export interface DataServiceConfig {
  endpoint: string;
  retries: number;
}

/**
 * A generic data processing service.
 */
export class DataService {
  private readonly config: DataServiceConfig;

  constructor(config: DataServiceConfig) {
    this.config = config;
  }

  /**
   * Fetches data from the configured endpoint.
   * @param id - Identifier for the data
   * @returns Promise resolving to the fetched data
   */
  async fetchData(id: string): Promise<Record<string, unknown>> {
    return { id, value: Math.random() * 100 };
  }

  /**
   * Processes the input data array.
   * @param items - Array of items to process
   * @returns Processed array with transformed values
   */
  processItems(items: number[]): number[] {
    return items.map((item) => item * 2).filter((item) => item > 10);
  }
}

/**
 * Creates a configured data service.
 * @param endpoint - The base URL for the service
 * @param retries - Number of retry attempts
 * @returns Instance of DataService
 */
export function createDataService(
  endpoint: string,
  retries: number = 3
): DataService {
  return new DataService({ endpoint, retries });
}

/**
 * Validates the input configuration.
 * @param config - Configuration object to validate
 * @returns True if valid, false otherwise
 */
export function validateConfig(config: Partial<DataServiceConfig>): boolean {
  return Boolean(config.endpoint && (config.retries ?? 0) >= 0);
}

/**
 * Utility to merge two data objects.
 * @param a - First data object
 * @param b - Second data object
 * @returns Merged result
 */
export function mergeData(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): Record<string, unknown> {
  return { ...a, ...b };
}
