export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);

export const groupBy = <T, K extends PropertyKey>(
  items: T[],
  keySelector: (item: T) => K
): Record<K, T[]> =>
  items.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};