export interface ProcessData {
  id: string;
  value: number;
  timestamp: number;
}

export const validateProcessInput = (data: unknown): data is ProcessData => {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === 'string' &&
    typeof d.value === 'number' &&
    Number.isFinite(d.value) &&
    typeof d.timestamp === 'number' &&
    d.timestamp > 0
  );
};

export const runProcessingLoop = (items: unknown[]): ProcessData[] => {
  const validItems: ProcessData[] = [];
  for (const item of items) {
    if (validateProcessInput(item)) {
      validItems.push(item);
    } else {
      console.warn('Invalid item skipped:', item);
    }
  }
  return validItems;
};