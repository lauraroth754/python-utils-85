/**
 * Configuration options for python-utils execution context.
 */
export interface PythonUtilsConfig {
  /** Path to the Python executable. Defaults to 'python3'. */
  pythonPath: string;
  /** Default timeout for child process execution in milliseconds. */
  timeout: number;
  /** Maximum buffer size in bytes for stdout and stderr. */
  maxBuffer: number;
  /** Environment variables to pass to python process. */
  env: Record<string, string>;
  /** Enable debug logging for process outputs. */
  debug: boolean;
}

/**
 * Partial configuration options used when updating settings.
 */
export type PartialPythonUtilsConfig = Partial<PythonUtilsConfig>;

const defaultConfig: PythonUtilsConfig = {
  pythonPath: 'python3',
  timeout: 10000,
  maxBuffer: 1024 * 1024 * 10,
  env: {},
  debug: false,
};

let currentConfig: PythonUtilsConfig = { ...defaultConfig };

/**
 * Retrieves the current configuration options.
 * @returns Readonly copy of the active configuration object.
 */
export function getConfig(): Readonly<PythonUtilsConfig> {
  return Object.freeze({ ...currentConfig });
}

/**
 * Updates configuration settings with the provided partial options.
 * @param options - Partial configuration object to merge.
 * @returns The updated configuration object.
 */
export function setConfig(options: PartialPythonUtilsConfig): Readonly<PythonUtilsConfig> {
  currentConfig = {
    ...currentConfig,
    ...options,
    env: {
      ...currentConfig.env,
      ...(options.env || {}),
    },
  };
  return getConfig();
}

/**
 * Resets the configuration back to default values.
 * @returns Default configuration object.
 */
export function resetConfig(): Readonly<PythonUtilsConfig> {
  currentConfig = { ...defaultConfig };
  return getConfig();
}
