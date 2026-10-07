import { z } from 'zod';

const InputSchema = z.object({
  id: z.string().uuid(),
  value: z.number().positive(),
  tags: z.array(z.string()).optional()
});

type InputData = z.infer<typeof InputSchema>;

export class ProcessingService {
  public async processBatch(items: unknown[]): Promise<void> {
    for (const item of items) {
      try {
        const validated = InputSchema.parse(item);
        await this.handleItem(validated);
      } catch (err) {
        console.error('Validation failed for item:', err);
        continue;
      }
    }
  }

  private async handleItem(data: InputData): Promise<void> {
    console.log(`Processing item ${data.id} with value ${data.value}`);
  }
}