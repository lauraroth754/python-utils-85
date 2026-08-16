import axios, { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<any> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (retries > 0 && isRetryableError(error)) {
            await delay(RETRY_DELAY);
            return fetchWithRetry(url, retries - 1);
        }
        throw error;
    }
}

function isRetryableError(error: AxiosError): boolean {
    return error.response?.status === 500 || error.code === 'ECONNABORTED';
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { fetchWithRetry };