export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw error;
            }
        }
    }
}

export async function fetchWithRetry(url: string): Promise<Response> {
    return await retry(() => fetch(url));
}

export async function postWithRetry(url: string, data: any): Promise<Response> {
    return await retry(() => fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }));
}