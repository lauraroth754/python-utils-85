export function fetchData(url: string): Promise<any> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

export function formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('year')) options.year = 'numeric';
    if (format.includes('month')) options.month = 'long';
    if (format.includes('day')) options.day = 'numeric';

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function debounce(func: Function, delay: number): (...args: any[]) => void {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export function throttle(func: Function, limit: number): (...args: any[]) => void {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function (...args: any[]) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}