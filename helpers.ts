/**
 * Generates an arithmetic progression of integers.
 * Analogous to Python's built-in range function.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
    if (stop === undefined) {
        stop = start;
        start = 0;
    }
    
    if (step === 0) {
        throw new Error("range() arg 3 must not be zero");
    }

    const result: number[] = [];
    if (step > 0) {
        for (let i = start; i < stop; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i > stop; i += step) {
            result.push(i);
        }
    }
    return result;
}

/**
 * Returns an array of tuples, where the i-th tuple contains the i-th element
 * from each of the argument sequences.
 */
export function zip<T>(...arrays: T[][]): T[][] {
    if (arrays.length === 0) {
        return [];
    }
    const minLength = Math.min(...arrays.map(arr => arr.length));
    const result: T[][] = [];
    for (let i = 0; i < minLength; i++) {
        result.push(arrays.map(arr => arr[i]));
    }
    return result;
}

/**
 * Returns an array of [index, value] pairs.
 * Analogous to Python's built-in enumerate function.
 */
export function enumerate<T>(array: T[]): [number, T][] {
    return array.map((val, idx) => [idx, val]);
}