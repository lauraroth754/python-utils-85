export function memoize(fn: (...args: any[]) => any): (...args: any[]) => any {
    const cache = new Map();
    return function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

export function debounce(fn: Function, delay: number): Function {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

export function throttle(fn: Function, limit: number): Function {
    let lastFn: NodeJS.Timeout, lastRan: number;
    return function (...args: any[]) {
        if (!lastRan) {
            fn(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    fn(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}