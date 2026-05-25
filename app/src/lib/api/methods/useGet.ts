import { apiClient } from '../client';
import { AxiosRequestConfig } from 'axios';
import { handleApiError } from '../error-handler';

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await apiClient.get<T>(url, config);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};
