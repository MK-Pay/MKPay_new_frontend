export interface Account {
    id: string;
    uuid: string;
    name: string;
    document?: string;
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    company_name?: string;
    document?: string;
    status: 'active' | 'pending' | 'suspended';
    accounts?: Account[];
    created_at: string;
    updated_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    company_name?: string;
    document?: string;
}

export interface PlainToken {
    token: string;
    refresh_token?: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}
