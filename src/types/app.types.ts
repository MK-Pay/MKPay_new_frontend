export interface App {
    id: number;
    app_id: string; // UUID usado nas rotas da API
    account_id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    settings: object | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    account?: Account;
    secretTokens?: AppSecretToken[];
}

export interface AppSecretToken {
    id: number;
    app_id: number;
    name: string;
    token_hash: string; // Hash do token (nunca expor)
    permissions: string[];
    expires_at: string | null;
    is_active: boolean;
    last_used_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Account {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    country: string | null;
    account_type_id: number;
    account_category_id: number;
    account_status_id: number;
    created_at: string;
    updated_at: string;
}

export interface AppStats {
    total_tokens: number;
    active_tokens: number;
    sales_this_month: number;
    total_transactions: number;
    total_revenue: number;
    success_rate: number;
}

export interface CreateAppDTO {
    account_uuid: string; // UUID da conta (obrigatório)
    name: string;
    description?: string;
    settings?: object;
}

export interface UpdateAppDTO {
    name?: string;
    description?: string;
    settings?: object;
}
