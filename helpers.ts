export interface ProcessTask {
  id: string;
  payload: unknown;
  timestamp: number;
}

export interface ValidatedPayload {
  action: string;
  data: Record<string, unknown>;
  retryCount: number;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validatePayload(payload: unknown): ValidatedPayload {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Payload must be a non-null object");
  }

  const candidate = payload as Record<string, unknown>;

  if (typeof candidate.action !== "string" || candidate.action.trim() === "") {
    throw new ValidationError("Payload action must be a non-empty string");
  }

  if (!candidate.data || typeof candidate.data !== "object") {
    throw new ValidationError("Payload data must be an object");
  }

  const retryCount = Number(candidate.retryCount ?? 0);
  if (isNaN(retryCount) || retryCount < 0) {
    throw new ValidationError("Payload retryCount must be a non-negative number");
  }

  return {
    action: candidate.action,
    data: candidate.data as Record<string, unknown>,
    retryCount,
  };
}

export function processBatch(tasks: ProcessTask[]): { success: string[]; failed: { id: string; error: string }[] } {
  const success: string[] = [];
  const failed: { id: string; error: string }[] = [];

  for (const task of tasks) {
    try {
      if (!task.id) {
        throw new ValidationError("Task is missing a valid identifier");
      }
      validatePayload(task.payload);
      success.push(task.id);
    } catch (error) {
      failed.push({
        id: task.id || "unknown",
        error: error instanceof Error ? error.message : "Unknown validation error",
      });
    }
  }

  return { success, failed };
}