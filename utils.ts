import axios, { AxiosRequestConfig } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retryNetworkOperation(config: AxiosRequestConfig): Promise<any> {
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            if (attempt < MAX_RETRIES - 1) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            } else {
                throw error;
            }
        }
        attempt++;
    }
}

export { retryNetworkOperation };