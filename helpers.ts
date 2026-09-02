export interface ErrorResult {
  error: string;
  code: number;
}

export function createError(message: string, code: number = 400): ErrorResult {
  return { error: message, code };
}

export function handleNullOrUndefined<T>(value: T | null | undefined, errorMsg: string): T {
  if (value === null || value === undefined) {
    throw new Error(errorMsg);
  }
  return value;
}

export function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) {
    throw new Error("Cannot divide by zero");
  }
  return numerator / denominator;
}

export function processArray<T>(arr: T[] | null | undefined): T[] {
  if (!arr) {
    throw new Error("Array is null or undefined");
  }
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  return arr;
}

export function safeJSONParse(jsonString: string): any {
  if (typeof jsonString !== "string") {
    throw new Error("Input must be a string");
  }
  if (jsonString.trim() === "") {
    throw new Error("Input string is empty");
  }
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    throw new Error("Invalid JSON format");
  }
}

export function getNestedValue(obj: any, path: string): any {
  if (!obj || typeof obj !== "object") {
    throw new Error("Invalid object provided");
  }
  if (!path || typeof path !== "string") {
    throw new Error("Invalid path provided");
  }
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      throw new Error("Path " + path + " not found");
    }
    current = current[key];
  }
  return current;
}

export function validateNumber(value: any): number {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Value must be a valid number");
  }
  return value;
}