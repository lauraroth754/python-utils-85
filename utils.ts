export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export const safeExecute = <T>(fn: () => T, errorCode: string): T => {
  try {
    return fn();
  } catch (error) {
    throw new PythonUtilsError(
      error instanceof Error ? error.message : 'Unknown execution failure',
      errorCode
    );
  }
};

export const validateConfig = (config: Record<string, unknown>): void => {
  if (!config || typeof config !== 'object') {
    throw new PythonUtilsError('Invalid configuration object', 'ERR_INVALID_CONFIG');
  }

  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value === null) {
      throw new PythonUtilsError(`Missing value for key: ${key}`, 'ERR_MISSING_VALUE');
    }
  }
};

export const parsePythonOutput = (data: string): Record<string, any> => {
  if (!data.trim()) {
    throw new PythonUtilsError('Empty payload from python process', 'ERR_EMPTY_RESPONSE');
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    throw new PythonUtilsError('Malformed json from python', 'ERR_PARSE_FAILURE');
  }
};