/**
 * Generates a sequence of numbers from start to stop by step.
 * Mimics Python's built-in range function.
 */
export function* range(start: number, stop?: number, step: number = 1): Generator<number, void, unknown> {
    const actualStart = stop === undefined ? 0 : start;
    const actualStop = stop === undefined ? start : stop;

    if (step === 0) {
        throw new Error("ValueError: range() arg 3 must not be zero");
    }

    if (step > 0) {
        for (let i = actualStart; i < actualStop; i += step) {
            yield i;
        }
    } else {
        for (let i = actualStart; i > actualStop; i += step) {
            yield i;
        }
    }
}

/**
 * Combines two arrays into an array of tuples up to the shorter length.
 */
export function zip<T, U>(arr1: readonly T[], arr2: readonly U[]): [T, U][] {
    const minLength = Math.min(arr1.length, arr2.length);
    const result: [T, U][] = [];
    for (let i = 0; i < minLength; i++) {
        result.push([arr1[i], arr2[i]]);
    }
    return result;
}

/**
 * Adds a counter to an iterable and returns it as an array of tuples.
 */
export function enumerate<T>(arr: readonly T[], start: number = 0): [number, T][] {
    return arr.map((value, index) => [start + index, value]);
}