export type PythonVersion = '2.7' | '3.8' | '3.11' | '3.12';

export interface ScriptConfig {
  name: string;
  version: PythonVersion;
  timeout: number;
}

/**
 * Validates the provided Python environment configuration.
 * @param config The script configuration object to check.
 * @returns True if configuration parameters are within bounds.
 */
export function validateConfig(config: ScriptConfig): boolean {
  return config.timeout > 0 && config.timeout <= 3600;
}

/**
 * Sanitizes input strings for safe execution in shell.
 * @param input The raw input string to process.
 * @returns A cleaned string with shell metacharacters removed.
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z0-9_.-]/g, '');
}

/**
 * Formats a command string for Python execution.
 * @param script The sanitized script name.
 * @param args List of arguments to pass to the script.
 * @returns A complete execution command string.
 */
export function buildCommand(script: string, args: string[]): string {
  const joinedArgs = args.map(sanitizeInput).join(' ');
  return `python3 ${script} ${joinedArgs}`.trim();
}