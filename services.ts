import { dataProcessor } from './utils';

interface ServiceResponse {
    success: boolean;
    data?: any;
    error?: string;
}

class PerformanceService {
    private cache: Map<string, any> = new Map();

    async fetchData(key: string): Promise<ServiceResponse> {
        if (this.cache.has(key)) {
            return { success: true, data: this.cache.get(key) };
        }
        try {
            const data = await this.getDataFromSource(key);
            this.cache.set(key, data);
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    private async getDataFromSource(key: string): Promise<any> {
        // Simulate network call
        return new Promise((resolve) => setTimeout(() => resolve({ key, value: Math.random() }), 1000));
    }
}

export const performanceService = new PerformanceService();