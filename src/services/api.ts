import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiError, ApiResponse } from '@/types/api.types'

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const token = localStorage.getItem('access_token')

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        return response
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Try to refresh token
                const refreshToken = localStorage.getItem('refresh_token')

                if (refreshToken) {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh`,
                        { refresh_token: refreshToken }
                    )

                    const { access_token, refresh_token } = response.data.data

                    // Update tokens
                    localStorage.setItem('access_token', access_token)
                    localStorage.setItem('refresh_token', refresh_token)

                    // Retry original request
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${access_token}`
                    }

                    return api(originalRequest)
                }
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        // Handle other errors
        const apiError: ApiError = {
            message: error.response?.data?.message || 'An unexpected error occurred',
            errors: error.response?.data?.errors,
            statusCode: error.response?.status || 500,
        }

        return Promise.reject(apiError)
    }
)

export default api
