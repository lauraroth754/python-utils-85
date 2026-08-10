import axios from 'axios';

interface ApiResponse<T> {
    data: T;
    status: number;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    const response = await axios.get<T>(url);
    return { data: response.data, status: response.status };
}

export { fetchData };