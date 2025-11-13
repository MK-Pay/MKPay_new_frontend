export interface App {
    id: string;
    name: string;
    description?: string;
    status: 'active' | 'inactive' | 'suspended';
    webhook_url?: string;
    created_at: string;
    updated_at: string;
    last_used_at?: string;
    total_tokens?: number;
    sales_count?: number;
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
    name: string;
    description?: string;
    webhook_url?: string;
}

export interface UpdateAppDTO {
    name?: string;
    description?: string;
    webhook_url?: string;
    status?: 'active' | 'inactive' | 'suspended';
}
