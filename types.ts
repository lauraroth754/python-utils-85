/**
 * Configuration options for python-like slice operations.
 */
export interface SliceOptions {
  /** The starting index for slicing (inclusive). */
  start?: number | null;
  /** The ending index for slicing (exclusive). */
  stop?: number | null;
  /** The step interval between slice indices. */
  step?: number | null;
}

/**
 * Generic key-value mapping mimicking Python dictionary operations.
 */
export type PyDict<T = unknown> = Record<string, T>;

/**
 * Execution result structure for Python process runners.
 */
export interface PyExecResult<T = string> {
  /** Indicates if execution succeeded without exceptions. */
  success: boolean;
  /** Standard output or evaluation result. */
  data: T | null;
  /** Error message or stack trace if execution failed. */
  error?: string;
  /** Execution exit code or status indicator. */
  code: number;
}

/**
 * Options for transforming case styles (e.g., snake_case to camelCase).
 */
export interface CaseTransformOptions {
  /** Whether to preserve original leading/trailing underscores. */
  preserveUnderscores?: boolean;
  /** Deeply convert nested object keys. */
  recursive?: boolean;
}

/**
 * Function signature for Python-style range generators.
 */
export type RangeGenerator = (
  start: number,
  stop?: number,
  step?: number
) => Generator<number, void, unknown>;
