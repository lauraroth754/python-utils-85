export class PythonServiceError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonServiceError';
  }
}

export const executePythonScript = async (scriptPath: string, args: string[]): Promise<string> => {
  if (!scriptPath) {
    throw new PythonServiceError('Script path is required', 'MISSING_PATH');
  }

  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      body: JSON.stringify({ scriptPath, args }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new PythonServiceError(
        errorData.message || 'Execution failed',
        response.status.toString()
      );
    }

    return await response.text();
  } catch (error) {
    if (error instanceof PythonServiceError) throw error;
    throw new PythonServiceError('Network communication failure', 'CONNECTION_ERROR');
  }
};