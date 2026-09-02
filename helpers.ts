export function safeDivide(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

export function safeArrayAccess<T>(array: T[], index: number): T {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }
  if (typeof index !== "number" || index < 0 || !Number.isInteger(index)) {
    throw new Error("Index must be a non-negative integer");
  }
  if (index >= array.length) {
    throw new Error("Index out of array bounds");
  }
  return array[index];
}

export function safeParseJSON<T>(jsonString: string): T {
  if (typeof jsonString !== "string") {
    throw new Error("Input must be a string");
  }
  const trimmed = jsonString.trim();
  if (trimmed === "") {
    throw new Error("Cannot parse empty string");
  }
  try {
    return JSON.parse(trimmed) as T;
  } catch (error) {
    throw new Error("Invalid JSON string provided");
  }
}

export function safeGetProperty(obj: any, key: string, defaultValue: any = undefined): any {
  if (obj === null || typeof obj !== "object") {
    return defaultValue;
  }
  if (typeof key !== "string" || key === "") {
    return defaultValue;
  }
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
  return defaultValue;
}

export function validatePositiveNumber(value: number): number {
  if (typeof value !== "number") {
    throw new Error("Value must be a number");
  }
  if (value <= 0) {
    throw new Error("Value must be positive");
  }
  return value;
}