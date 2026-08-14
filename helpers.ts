export function formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {};
    if (format.includes('YYYY')) options.year = 'numeric';
    if (format.includes('MM')) options.month = '2-digit';
    if (format.includes('DD')) options.day = '2-digit';
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}

export function debounce(func: Function, delay: number): (...args: any[]) => void {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}