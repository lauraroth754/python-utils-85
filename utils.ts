export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const executePythonOperation = <T>(fn: () => T): T => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof Error) {
      throw new PythonUtilsError(error.message, 'EXECUTION_FAILURE');
    }
    throw new PythonUtilsError('Unknown internal error', 'UNKNOWN_FAILURE');
  }
};

export const validatePythonIdentifier = (name: string): boolean => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

export const formatPythonPath = (path: string): string => {
  if (path.length === 0) {
    throw new PythonUtilsError('Path cannot be empty', 'INVALID_PATH');
  }
  return path.replace(/\\/g, '/').replace(//+$/, '');
};