export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const executePythonCommand = async (command: string | null | undefined): Promise<string> => {
  if (!command || command.trim() === '') {
    throw new PythonUtilsError('Command cannot be empty or null', 'INVALID_COMMAND');
  }

  try {
    const response = await fetch('/api/python/execute', {
      method: 'POST',
      body: JSON.stringify({ command }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new PythonUtilsError('Server returned error status', 'SERVER_ERROR');
    }

    const data = await response.json();
    if (typeof data.result !== 'string') {
      throw new PythonUtilsError('Malformed response data format', 'MALFORMED_RESPONSE');
    }

    return data.result;
  } catch (error) {
    if (error instanceof PythonUtilsError) throw error;
    throw new PythonUtilsError('Unexpected connection failure', 'CONNECTION_FAILURE');
  }
};