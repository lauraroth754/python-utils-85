export function isEmpty(obj: object): boolean { return Object.keys(obj).length === 0; }

export function deepClone<T>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }

export function flattenArray<T>(array: T[][]): T[] { return [].concat(...array); }

export function debounce(func: Function, delay: number): Function { let timeoutId: NodeJS.Timeout; return function(...args: any[]) { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(this, args), delay); }; }

export function throttle(func: Function, limit: number): Function { let lastFunc: NodeJS.Timeout; let lastRan: number; return function(this: any) { const context = this; const args = arguments; if (!lastRan) { func.apply(context, args); lastRan = Date.now(); } else { clearTimeout(lastFunc); lastFunc = setTimeout(function() { if ((Date.now() - lastRan) >= limit) { func.apply(context, args); lastRan = Date.now(); } }, limit - (Date.now() - lastRan)); } }; }