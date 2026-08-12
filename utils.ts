export function safeParseJson<T>(string: string): T | null {
    try {
        return JSON.parse(string);
    } catch (error) {
        console.error('Invalid JSON string:', error);
        return null;
    }
}

export function divideNumbers(dividend: number, divisor: number): number | null {
    if (divisor === 0) {
        console.error('Division by zero is not allowed.');
        return null;
    }
    return dividend / divisor;
}

export function readFileSync(path: string): string | null {
    const fs = require('fs');
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

export function getValidatedUserInput(input: any): string | null {
    if (typeof input !== 'string' || input.trim() === '') {
        console.error('Invalid input provided.');
        return null;
    }
    return input.trim();
}