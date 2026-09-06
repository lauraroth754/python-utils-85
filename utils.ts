export type Processor = (input: string) => string;

/**
 * Truncates string to specified length and appends ellipsis
 */
export function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
}

/**
 * Normalizes input string to slug format
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Batches an array into smaller chunks
 */
export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

/**
 * Filters undefined values from collection
 */
export function compact<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item !== null && item !== undefined);
}