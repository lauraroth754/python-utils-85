function isEmptyArray(arr: any[]): boolean {
    return !arr || arr.length === 0;
}

function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object';
}

function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function mergeObjects<T, U>(target: T, source: U): T & U {
    return { ...target, ...source };
}

function flattenArray<T>(arr: (T | T[])[]): T[] {
    return arr.reduce((acc: T[], val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
}

export { isEmptyArray, isObject, deepClone, mergeObjects, flattenArray };