/**
 * Generic result wrapper representing either a successful outcome or an error.
 */
export type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

/**
 * Options for configuring retry behavior in asynchronous operations.
 */
export interface RetryOptions {
  /** Maximum number of retry attempts. */
  maxRetries: number;
  /** Initial delay between retries in milliseconds. */
  delayMs: number;
  /** Backoff multiplier for exponential delay calculation. */
  backoffFactor?: number;
}

/**
 * Dictionary type mapping string keys to generic values.
 */
export type PyDict<V = unknown> = Record<string, V>;

/**
 * Primitive Python-like types supported by utility serializers.
 */
export type PyPrimitive = string | number | boolean | null | undefined;

/**
 * Read-only sequence wrapper mimicking immutable tuple behavior.
 */
export type PySequence<T> = ReadonlyArray<T>;

/**
 * Callback signature for mapping and transforming sequence elements.
 */
export type TransformFn<T, U> = (item: T, index: number) => U;

/**
 * Predicate signature for filtering sequence items.
 */
export type PredicateFn<T> = (item: T, index: number) => boolean;
