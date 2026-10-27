export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type Dict<T = unknown> = Record<string, T>;
export type List<T = unknown> = T[];

export interface PythonSlice {
  start?: number;
  stop?: number;
  step?: number;
}

export interface ProcessOptions<T, R> {
  filterFn?: (item: T) => boolean;
  mapFn?: (item: T) => R;
  defaultValue?: R;
}

export interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  hits: number;
}

export type GroupedData<T> = Record<string | number, T[]>;

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };