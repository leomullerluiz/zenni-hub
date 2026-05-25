import { AxiosError } from 'axios';

export interface ApiError {
    message: string;
    statusCode?: number;
    data?: any;
    originalError?: any;
}

export class ApiException extends Error implements ApiError {
    statusCode?: number;
    data?: any;
    originalError?: any;

    constructor(message: string, statusCode?: number, data?: any, originalError?: any) {
        super(message);
        this.name = 'ApiException';
        this.statusCode = statusCode;
        this.data = data;
        this.originalError = originalError;

        Object.setPrototypeOf(this, ApiException.prototype);
    }
}

export const handleApiError = (error: unknown): ApiException => {
    if (error instanceof ApiException) {
        return error;
    }

    if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const responseData = error.response?.data;

        let message = 'Erro ao comunicar com a API';

        switch (statusCode) {
            case 400:
                message = responseData?.message || 'Requisição inválida';
                break;
            case 401:
                message = 'Não autorizado. Faça login novamente.';
                break;
            case 403:
                message = 'Acesso negado. Você não tem permissão para esta ação.';
                break;
            case 404:
                message = responseData?.message || 'Recurso não encontrado';
                break;
            case 422:
                message = responseData?.message || 'Dados inválidos';
                break;
            case 500:
                message = 'Erro interno do servidor. Tente novamente mais tarde.';
                break;
            case 502:
            case 503:
            case 504:
                message = 'Servidor temporariamente indisponível. Tente novamente.';
                break;
            default:
                message = responseData?.message || responseData?.error || error.message || 'Erro desconhecido';
        }

        return new ApiException(
            message,
            statusCode,
            responseData,
            error
        );
    }

    if (error instanceof Error) {
        return new ApiException(
            error.message || 'Erro inesperado',
            undefined,
            undefined,
            error
        );
    }

    return new ApiException(
        'Erro desconhecido ao processar requisição',
        undefined,
        error,
        error
    );
};

export const isApiException = (error: unknown): error is ApiException => {
    return error instanceof ApiException;
};

export const isAuthError = (error: unknown): boolean => {
    if (error instanceof ApiException) {
        return error.statusCode === 401;
    }
    if (error instanceof AxiosError) {
        return error.response?.status === 401;
    }
    return false;
};

export const isValidationError = (error: unknown): boolean => {
    if (error instanceof ApiException) {
        return error.statusCode === 400 || error.statusCode === 422;
    }
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        return status === 400 || status === 422;
    }
    return false;
};
