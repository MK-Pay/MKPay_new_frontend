import api from './api';
import type {
    AuthResponse,
    ForgotPasswordData,
    LoginCredentials,
    RegisterData,
    ResetPasswordData,
    User,
} from '@/types/auth.types';

class AuthService {
    async login(credentials: LoginCredentials): Promise<string> {
        // API retorna { token: string }
        const response = await api.post<AuthResponse>('/api/v1/auth/login', credentials);
        return response.data.token;
    }

    async register(data: RegisterData): Promise<string> {
        // API retorna { token: string }
        const response = await api.post<AuthResponse>('/api/v1/auth/register', data);
        return response.data.token;
    }

    async logout(): Promise<void> {
        await api.post('/api/v1/auth/logout');
    }

    async me(): Promise<User> {
        // Endpoint correto é /api/v1/auth/user, não /auth/me
        const response = await api.get<User>('/api/v1/auth/user');
        return response.data;
    }

    async forgotPassword(data: ForgotPasswordData): Promise<void> {
        await api.post('/api/v1/auth/forgot-password', data);
    }

    async resetPassword(data: ResetPasswordData): Promise<void> {
        await api.post('/api/v1/auth/reset-password', data);
    }
}

export default new AuthService();
