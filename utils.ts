export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache: Map<string, ReturnType<T>> = new Map();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number = 0;

  return ((...args: Parameters<T>) => {
    const context = this;
    const now = Date.now();
    if (now - lastRan >= limit) {
      func.apply(context, args);
      lastRan = now;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func.apply(context, args);
      }, limit - (now - lastRan));
    }
  }) as T;
}
