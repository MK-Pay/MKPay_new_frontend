import api from './api';
import type {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
    ForgotPasswordData,
    ResetPasswordData,
} from '@/types/auth.types';
import type { ApiResponse } from '@/types/api.types';

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponse>>('/api/v1/auth/login', credentials);
        return response.data.data;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponse>>('/api/v1/auth/register', data);
        return response.data.data;
    }

    async logout(): Promise<void> {
        await api.post('/api/v1/auth/logout');
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponse>>('/api/v1/auth/refresh', {
            refresh_token: refreshToken,
        });
        return response.data.data;
    }

    async me(): Promise<User> {
        const response = await api.get<ApiResponse<User>>('/api/v1/auth/me');
        return response.data.data;
    }

    async forgotPassword(data: ForgotPasswordData): Promise<void> {
        await api.post('/api/v1/auth/forgot-password', data);
    }

    async resetPassword(data: ResetPasswordData): Promise<void> {
        await api.post('/api/v1/auth/reset-password', data);
    }
}

export default new AuthService();
