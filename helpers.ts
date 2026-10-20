export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const isEmpty = (obj: Record<string, any> | any[]): boolean =>
  Array.isArray(obj) ? obj.length === 0 : Object.keys(obj).length === 0;

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const getOrElse = <T>(value: T | null | undefined, defaultValue: T): T =>
  value ?? defaultValue;