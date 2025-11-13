export type TokenPermission =
    | 'payments.read'
    | 'payments.write'
    | 'transactions.read'
    | 'wallets.read'
    | 'wallets.write'
    | 'webhooks.read'
    | 'webhooks.write'
    | 'account.read'
    | 'account.write';

export interface AppSecretToken {
    id: number;
    app_id: number;
    name: string;
    token_hash: string; // Hash do token (nunca expor o original)
    permissions: TokenPermission[];
    expires_at: string | null;
    is_active: boolean;
    last_used_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateTokenDTO {
    name: string;
    permissions: TokenPermission[];
    expires_at?: string;
}

export interface UpdateTokenDTO {
    name?: string;
    permissions?: TokenPermission[];
    expires_at?: string | null;
    is_active?: boolean;
}

export interface CreateTokenResponse {
    token_id: number;
    name: string;
    token: string; // ⚠️ Token é exibido apenas UMA VEZ na criação
    permissions: TokenPermission[];
    expires_at: string | null;
    created_at: string;
}

export const TOKEN_PERMISSIONS: { value: TokenPermission; label: string; description: string }[] = [
    {
        value: 'payments.read',
        label: 'Pagamentos - Leitura',
        description: 'Visualizar pagamentos',
    },
    {
        value: 'payments.write',
        label: 'Pagamentos - Escrita',
        description: 'Criar e modificar pagamentos',
    },
    {
        value: 'transactions.read',
        label: 'Transações - Leitura',
        description: 'Visualizar transações',
    },
    {
        value: 'wallets.read',
        label: 'Carteiras - Leitura',
        description: 'Visualizar carteiras e saldos',
    },
    {
        value: 'wallets.write',
        label: 'Carteiras - Escrita',
        description: 'Modificar carteiras',
    },
    {
        value: 'webhooks.read',
        label: 'Webhooks - Leitura',
        description: 'Visualizar webhooks',
    },
    {
        value: 'webhooks.write',
        label: 'Webhooks - Escrita',
        description: 'Criar e modificar webhooks',
    },
    {
        value: 'account.read',
        label: 'Conta - Leitura',
        description: 'Visualizar dados da conta',
    },
    {
        value: 'account.write',
        label: 'Conta - Escrita',
        description: 'Modificar dados da conta',
    },
];
