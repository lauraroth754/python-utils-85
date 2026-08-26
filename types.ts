export type PythonValue = string | number | boolean | null | undefined | PythonList | PythonDict;

export interface PythonList extends Array<PythonValue> {}

export interface PythonDict {
  [key: string]: PythonValue;
}

export interface StringUtilOptions {
  encoding?: string;
  errors?: 'strict' | 'ignore' | 'replace';
}

export interface DictUtilOptions<T = PythonValue> {
  defaultFactory?: () => T;
  deepCopy?: boolean;
}

export type Predicate<T> = (value: T) => boolean;

export type Comparator<T> = (a: T, b: T) => number;