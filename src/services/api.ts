import type { ApiError, ApiResponse, MutableHeaders } from '@/types/api.types';
import { getEnvName, isDev } from '@/utils/data-helpers';

interface RequestConfig extends RequestInit {
    params?: Record<string, any>;
    skipAccountHeader?: boolean; // Opção para pular headers de account em endpoints específicos
}

class ApiClient {
    private baseURL: string;
    private defaultHeaders: MutableHeaders;

    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    private getHeaders(config?: RequestConfig): MutableHeaders {
        const headers: MutableHeaders = { ...this.defaultHeaders };
        const token = localStorage.getItem('access_token') || null;

        // Adicionar token de autenticação
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // Adicionar headers de account selecionada
        // Nota: O accounts store é importado aqui para evitar circular dependencies
        if (!config?.skipAccountHeader) {
            try {
                // Importação dinâmica para evitar circular dependency
                const selectedAccountUuid = localStorage.getItem('selected_account_uuid');
                const selectedAccountId = localStorage.getItem('selected_account_id');

                if (selectedAccountUuid) {
                    headers['X-Account-Uuid'] = selectedAccountUuid;
                }

                if (selectedAccountId) {
                    headers['X-Account-Id'] = selectedAccountId;
                }
            } catch (error) {
                // Se não conseguir obter account UUID, continua sem header
                console.debug('Account headers not available:', error);
            }
        }

        return headers;
    }

    private buildURL(endpoint: string, params?: Record<string, any>): string {
        const url = new URL(endpoint, this.baseURL);

        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, String(params[key]));
                }
            });
        }

        return url.toString();
    }

    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
        if (response.ok) {
            return response.json();
        }

        // Handle 401 Unauthorized
        if (response.status === 401) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const refreshResponse = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
                        method: 'POST',
                        headers: this.defaultHeaders,
                        body: JSON.stringify({ refresh_token: refreshToken }),
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        const { token: access_token, refresh_token: newRefreshToken } = data.data;

                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('refresh_token', newRefreshToken);

                        // Retry original request with new token
                        const retryHeaders = { ...this.getHeaders() };
                        const retryResponse = await fetch(response.url, {
                            method: response.type,
                            headers: retryHeaders,
                        });

                        if (retryResponse.ok) {
                            return await retryResponse.json();
                        }
                    }
                } catch (error) {
                    // Refresh failed, clear tokens and redirect
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    console.log('Redirect to /login');
                    window.location.href = '/login';
                }
            }

            // No refresh token or refresh failed
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            console.log('Redirect to /login');
            window.location.href = '/login';
        }

        // Handle other errors
        const errorData = await response.json().catch((err: any) => {
            let message = err?.message || 'An unexpected error occurred';

            let fileAndLine =
                [err?.fileName?.split('?')[0], err?.lineNumber].filter(Boolean).join(':') || err?.fileName;

            fileAndLine = fileAndLine.replace(window.location.origin + '/', '');

            if (isDev()) {
                console.log('env', getEnvName(), isDev());
                message += ` File: ${fileAndLine}`;
            }

            return {
                message,
                fileAndLine,
                fileName: fileAndLine,
            };
        });

        const apiError: ApiError = {
            message: errorData.message || 'An unexpected error occurred',
            errors: errorData.errors,
            statusCode: response.status,
        };

        throw apiError;
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        const url = this.buildURL(endpoint, config?.params);
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders(config),
            ...config,
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        const url = this.buildURL(endpoint, config?.params);
        const response = await fetch(url, {
            method: 'POST',
            headers: this.getHeaders(config),
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        const url = this.buildURL(endpoint, config?.params);
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(config),
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });

        return this.handleResponse<T>(response);
    }

    async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        const url = this.buildURL(endpoint, config?.params);
        const response = await fetch(url, {
            method: 'PATCH',
            headers: this.getHeaders(config),
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        const url = this.buildURL(endpoint, config?.params);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.getHeaders(config),
            ...config,
        });

        return this.handleResponse<T>(response);
    }
}

const api = new ApiClient();

export default api;
