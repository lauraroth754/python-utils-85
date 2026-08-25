export type CommonValue = string | number | boolean | null | undefined;
export type OperationResult<T> = { success: boolean; data?: T; error?: string; };
export function isEmpty(value: any): boolean {
if (value == null) return true;
if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
if (typeof value === 'object') return Object.keys(value).length === 0;
return false;
}
export function getValueOrDefault<T>(value: T | null | undefined, defaultValue: T): T {
return value != null ? value : defaultValue;
}
export function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): T & U {
return { ...obj1, ...obj2 } as T & U;
}
export function uniqueArray<T>(arr: T[]): T[] {
return [...new Set(arr)];
}
export function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
return arr.reduce((acc: Record<string, T[]>, item: T) => {
const groupKey = String(item[key]);
if (!acc[groupKey]) acc[groupKey] = [];
acc[groupKey].push(item);
return acc;
}, {});
}
export function sleep(ms: number): Promise<void> {
return new Promise(resolve => setTimeout(resolve, ms));
}
export function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
return fn().catch((err: any) => {
if (retries <= 0) throw err;
return sleep(delay).then(() => retry(fn, retries - 1, delay));
});
}