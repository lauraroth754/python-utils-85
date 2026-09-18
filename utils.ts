export interface TaskConfig {
  id: string;
  timeout: number;
  retry: boolean;
}

/**
 * Normalizes input strings for python-like path handling.
 */
export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(//+$/, '');
}

/**
 * Parses environment variables with default fallback.
 */
export function getEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

/**
 * Generates a unique identifier for task tracking.
 */
export function generateId(prefix: string = 'task'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Safely executes a callback with basic error boundary.
 */
export function runSafe<T>(fn: () => T): T | null {
  try {
    return fn();
  } catch (err: unknown) {
    console.error('Execution failure:', err);
    return null;
  }
}