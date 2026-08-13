import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retry<T>(fn: () => Promise<T>, retries: number = MAX_RETRIES): Promise<T> {
    let attempts = 0;

    while (attempts < retries) {
        try {
            return await fn();
        } catch (error) {
            attempts++;
            if (attempts === retries) throw error;
            await new Promise(res => setTimeout(res, RETRY_DELAY));
        }
    }
    throw new Error('Max retries reached');
}

export async function fetchData(url: string) {
    return await retry(() => axios.get(url));
}

export async function postData(url: string, data: any) {
    return await retry(() => axios.post(url, data));
}