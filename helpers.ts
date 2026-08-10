export const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || (typeof value === 'object' && !Object.keys(value).length);
};

export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
    const options: Intl.DateTimeFormatOptions = {};
    if (format.includes('YYYY')) options.year = 'numeric';
    if (format.includes('MM')) options.month = '2-digit';
    if (format.includes('DD')) options.day = '2-digit';
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const parseJson = (jsonString: string): any => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Invalid JSON string');
    }
};

export const debounce = <T>(func: (...args: T[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};