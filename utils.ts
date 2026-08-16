export function safeParseJSON<T>(jsonString: string): T | null {
    try {
        const parsed = JSON.parse(jsonString);
        if (typeof parsed !== 'object' || parsed === null) {
            throw new Error('Parsed JSON is not an object');
        }
        return parsed as T;
    } catch (error) {
        console.error('JSON parsing error:', error);
        return null;
    }
}

export function validateInput(input: any, expectedType: string): input is any {
    const typeOfInput = typeof input;
    if (typeOfInput !== expectedType) {
        console.error(`Invalid input type: expected ${expectedType}, got ${typeOfInput}`);
        return false;
    }
    return true;
}

export function divideNumbers(numerator: number, denominator: number): number | null {
    if (denominator === 0) {
        console.error('Denominator cannot be zero');
        return null;
    }
    return numerator / denominator;
}

export function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(safeParseJSON(xhr.responseText));
            } else {
                console.error('Request failed with status:', xhr.status);
                reject(new Error(`Request failed: ${xhr.statusText}`));
            }
        };
        xhr.onerror = () => {
            console.error('Network error');
            reject(new Error('Network error'));
        };
        xhr.send();
    });
}
