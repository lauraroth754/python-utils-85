function isEmpty(value: any): boolean {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0);
}

function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function mergeDeep<T>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (source[key] instanceof Object) {
            if (!(key in target)) Object.assign(target, { [key]: {} });
            mergeDeep(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
}

export { isEmpty, deepClone, mergeDeep };