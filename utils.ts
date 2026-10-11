export class PythonUtilsError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const executePythonCommand = (command: string): string => {
  if (!command || command.trim() === '') {
    throw new PythonUtilsError('Empty command provided', 'ERR_EMPTY_CMD');
  }

  try {
    const sanitized = command.replace(/[^a-zA-Z0-9\s-_]/g, '');
    if (sanitized !== command) {
      throw new PythonUtilsError('Invalid characters in command', 'ERR_INVALID_CHARS');
    }
    return `python -c "${sanitized}"`;
  } catch (error) {
    if (error instanceof PythonUtilsError) throw error;
    throw new PythonUtilsError('Unexpected command parsing error', 'ERR_UNKNOWN');
  }
};

export const parsePythonOutput = (output: string | null | undefined): string[] => {
  if (output === null || output === undefined) {
    return [];
  }
  const lines = output.split('\n').filter((line) => line.trim().length > 0);
  return lines.map((line) => line.trim());
};