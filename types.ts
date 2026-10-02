export type Dict<V = any> = Record<string, V>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Pair<K, V> = [K, V];

export interface Slice {
  start?: number;
  stop: number;
  step?: number;
}

export type KeyFunc<T, R> = (item: T) => R;

export type Predicate<T> = (item: T) => boolean;

export type Mapper<T, R> = (item: T) => R;

export interface Grouped<K, T> {
  key: K;
  items: T[];
}
