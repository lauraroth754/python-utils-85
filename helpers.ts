const MIN_INPUT = 0;
const MAX_INPUT = 10000;

function validateNumber(value: unknown): number {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }
  if (isNaN(value)) {
    throw new Error("Input cannot be NaN");
  }
  if (value < MIN_INPUT || value > MAX_INPUT) {
    throw new Error("Input out of range");
  }
  return value;
}

function validateString(str: unknown): string {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    throw new Error("String cannot be empty");
  }
  if (trimmed.length > 100) {
    throw new Error("String too long");
  }
  return trimmed;
}

interface DataItem {
  id: number;
  value: number;
  name: string;
}

function processItem(raw: unknown): DataItem {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Item must be an object");
  }
  const obj = raw as any;
  const id = validateNumber(obj.id);
  const value = validateNumber(obj.value);
  const name = validateString(obj.name);
  return { id, value, name };
}

function mainProcessingLoop(inputs: unknown[]): DataItem[] {
  const results: DataItem[] = [];
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    try {
      const validated = processItem(input);
      const processedValue = validated.value * 2;
      results.push({ id: validated.id, value: processedValue, name: validated.name });
    } catch (error) {
      console.error(`Validation error at index ${i}`);
    }
  }
  return results;
}

export { mainProcessingLoop, validateNumber, validateString, processItem };