export interface ProcessResult {
  status: number;
  output: string;
  error: string | null;
}

/**
 * Executes a shell command and captures the output
 */
export async function runCommand(command: string, args: string[]): Promise<ProcessResult> {
  const proc = Deno.run({
    cmd: [command, ...args],
    stdout: "piped",
    stderr: "piped",
  });

  const [status, stdout, stderr] = await Promise.all([
    proc.status(),
    proc.output(),
    proc.stderrOutput(),
  ]);

  proc.close();

  return {
    status: status.code,
    output: new TextDecoder().decode(stdout),
    error: status.success ? null : new TextDecoder().decode(stderr),
  };
}

/**
 * Normalizes input strings by stripping whitespace
 */
export function sanitize(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

/**
 * Generates a unique identifier for processing tasks
 */
export function generateId(prefix: string = "py"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}