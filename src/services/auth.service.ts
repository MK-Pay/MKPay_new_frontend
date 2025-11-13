import type { ApiResponse } from '@/types/api.types';
import type {
    AuthResponse,
    AuthTokens,
    ForgotPasswordData,
    LoginCredentials,
    PlainToken,
    RegisterData,
    ResetPasswordData,
    User,
} from '@/types/auth.types';

import api from './api';

class AuthService {
    async login(credentials: LoginCredentials): Promise<PlainToken|AuthTokens> {
        const response = await api.post<ApiResponse<PlainToken|AuthTokens>>('/api/v1/auth/login', credentials);

        if ('data' in response) {
            return 'data' in response?.data ? response?.data?.data : response?.data;
        }

        return response;
    }

    async register(data: RegisterData): Promise<PlainToken|AuthTokens> {
        const response = await api.post<ApiResponse<PlainToken|AuthTokens>>('/api/v1/auth/register', data);

        if ('data' in response) {
            return 'data' in response?.data ? response?.data?.data : response?.data;
        }

        return response;
    }

    async logout(): Promise<void> {
        await api.post('/api/v1/auth/logout');
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse|AuthTokens|PlainToken> {
        const response = await api.post<ApiResponse<AuthResponse|AuthTokens|PlainToken>>('/api/v1/auth/refresh', {
            refresh_token: refreshToken,
        });

        if ('data' in response) {
            return 'data' in response?.data ? response?.data?.data : response?.data;
        }

        return response;
    }

    async me(): Promise<User|null> {
        const token = localStorage.getItem('access_token');

        if (typeof token !== 'string' || !token.trim()) {
            return null;
        }

        const response = await api.get<ApiResponse<User>>('/api/v1/auth/me');

        if ('data' in response) {
            return 'data' in response?.data ? response?.data?.data : response?.data;
        }

        return response;
    }

    async forgotPassword(data: ForgotPasswordData): Promise<void> {
        await api.post('/api/v1/auth/forgot-password', data);
    }

    async resetPassword(data: ResetPasswordData): Promise<void> {
        await api.post('/api/v1/auth/reset-password', data);
    }
}

export default new AuthService();
