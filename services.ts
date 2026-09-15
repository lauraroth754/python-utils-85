export interface ProcessTask {
  id: string;
  payload: Record<string, unknown>;
  retries: number;
}

export const validateTask = (task: unknown): task is ProcessTask => {
  if (!task || typeof task !== 'object') return false;
  const t = task as Record<string, unknown>;
  return (
    typeof t.id === 'string' &&
    typeof t.payload === 'object' &&
    t.payload !== null &&
    typeof t.retries === 'number'
  );
};

export const processMainLoop = async (queue: unknown[]): Promise<void> => {
  for (const item of queue) {
    if (!validateTask(item)) {
      console.error('Invalid task structure detected', item);
      continue;
    }

    try {
      console.log(`Processing task ${item.id}`);
      // Processing logic would go here
    } catch (err) {
      console.error(`Task ${item.id} failed:`, err);
    }
  }
};