export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const executePythonCommand = async (cmd: string): Promise<string> => {
  if (!cmd || typeof cmd !== 'string') {
    throw new PythonUtilsError('invalid command string', 'INVALID_INPUT');
  }

  try {
    const response = await fetch('/api/python', {
      method: 'POST',
      body: JSON.stringify({ cmd }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new PythonUtilsError('execution failed', 'EXECUTION_ERROR');
    }

    return await response.text();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new PythonUtilsError('network failure', 'NETWORK_ERROR');
    }
    throw error;
  }
};

export const parsePythonOutput = (data: unknown): Record<string, any> => {
  if (data === null || typeof data !== 'object') {
    throw new PythonUtilsError('malformed output structure', 'PARSE_ERROR');
  }

  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    throw new PythonUtilsError('serialization failure', 'SERIALIZATION_ERROR');
  }
};