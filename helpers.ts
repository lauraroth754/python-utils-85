export function isEmpty(obj: object): boolean { return Object.keys(obj).length === 0; }

export function deepClone<T>(item: T): T { return JSON.parse(JSON.stringify(item)); }

export function mergeDeep<T>(target: T, source: Partial<T>): T { const output = { ...target }; for (const key of Object.keys(source)) { if (source[key] && typeof source[key] === 'object') { output[key] = mergeDeep(target[key] || {}, source[key]); } else { output[key] = source[key]; } } return output; }

export function flattenArray<T>(arr: T[]): T[] { return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []); }

export function uniqueArray<T>(arr: T[]): T[] { return Array.from(new Set(arr)); }