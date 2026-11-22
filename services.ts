interface ProcessConfig {
  id: string;
  timeout: number;
}

export class ServiceRegistry {
  private registry: Map<string, ProcessConfig> = new Map();

  public register(id: string, timeout: number = 3000): void {
    this.registry.set(id, { id, timeout });
  }

  public unregister(id: string): boolean {
    return this.registry.delete(id);
  }

  public getStatus(id: string): ProcessConfig | undefined {
    return this.registry.get(id);
  }

  public listServices(): ProcessConfig[] {
    return Array.from(this.registry.values());
  }

  public clearAll(): void {
    this.registry.clear();
  }
}

export const globalRegistry = new ServiceRegistry();