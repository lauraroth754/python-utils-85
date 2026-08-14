export function flattenArray<T>(arr: (T | T[])[]): T[] {
    let result: T[] = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flattenArray(item));
        } else {
            result.push(item);
        }
    }
    return result;
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function isEmpty(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0;
}

export function mergeDeep<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object') {
            if (!target[key]) {
                target[key] = {} as T[keyof T];
            }
            mergeDeep(target[key] as T, source[key] as Partial<T>);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
