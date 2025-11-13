import type {
    AuthResponse,
    ForgotPasswordData,
    LoginCredentials,
    RegisterData,
    ResetPasswordData,
    User,
} from '@/types/auth.types';
// import * as DH from "@/utils/data-helpers";
import { getTokenFromResponse, ifObjectOr } from '@/utils/data-helpers';

import api from './api';

interface AuthTokensResponse {
    token: string | null;
    refresh_token?: string | null;
    response?: any;
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthTokensResponse | null> {
        console.log(`AuthService -> login`);
        // API retorna { token: string }
        const response = ifObjectOr(await api.post<AuthResponse>('/api/v1/auth/login', credentials), {});
        console.log(`AuthService -> login -> response`, response);

        let accessToken = getTokenFromResponse(response, 'token');
        let refreshToken = getTokenFromResponse(response, 'refresh_token');

        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
        }

        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }

        return {
            token: accessToken,
            refresh_token: refreshToken,
            response,
        };
    }

    async register(data: RegisterData): Promise<string | null> {
        // API retorna { token: string }
        const response = ifObjectOr(await api.post<AuthResponse>('/api/v1/auth/register', data), {});

        return getTokenFromResponse(response);
    }

    async logout(): Promise<void> {
        await api.post('/api/v1/auth/logout');
    }

    async me(): Promise<User> {
        // Endpoint correto é /api/v1/auth/user, não /auth/me
        const response = ifObjectOr(await api.post<User>('/api/v1/auth/me'));

        console.log('auth.service -> me ->response', response);

        return 'data' in response ? response.data : response;
    }

    async forgotPassword(data: ForgotPasswordData): Promise<void> {
        await api.post('/api/v1/auth/forgot-password', data);
    }

    async resetPassword(data: ResetPasswordData): Promise<void> {
        await api.post('/api/v1/auth/reset-password', data);
    }

    async refreshToken(refreshToken: string | null): Promise<AuthTokensResponse | null> {
        const response = ifObjectOr(
            await api.post<AuthResponse>('/api/v1/auth/renew-tokens', {
                refreshToken,
            }),
            {}
        );

        return {
            token: getTokenFromResponse(response, 'token'),
            refresh_token: getTokenFromResponse(response, 'refresh_token'),
        };
    }
}

export default new AuthService();
