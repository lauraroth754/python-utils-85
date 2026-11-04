export type Nullable<T> = T | null | undefined;

export type PythonDict<K extends string | number | symbol, V> = Record<K, V>;

export type PythonList<T> = T[];

export interface SliceArgs {
  start?: number;
  stop?: number;
  step?: number;
}

export type StringFormatArgs = Record<string, unknown> | Array<unknown>;

export interface ExecutionResult<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

export type TransformFn<Input, Output> = (item: Input, index: number) => Output;

export type PredicateFn<T> = (item: T, index: number) => boolean;

export interface KeyValueTuple<K, V> {
  key: K;
  value: V;
}

export interface ReorgOptions {
  preserveKeys?: boolean;
  deepCopy?: boolean;
  strictTypes?: boolean;
}