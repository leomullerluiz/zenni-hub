import axios from 'axios';
import { toast } from 'react-toastify';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject(error);
        }

        if (error.request) {
            if (process.env.NODE_ENV === 'development') {
                toast.error('Erro de rede. Verifique sua conexão ou tente mais tarde');
            }
        }

        return Promise.reject(error);
    }
);
