export const SALE_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    FAILED: 'failed',
} as const;

export const SALE_STATUS_LABELS = {
    pending: 'Pendente',
    approved: 'Aprovado',
    cancelled: 'Cancelado',
    refunded: 'Reembolsado',
    failed: 'Falhou',
} as const;

export const SALE_STATUS_COLORS = {
    pending: 'yellow',
    approved: 'green',
    cancelled: 'red',
    refunded: 'blue',
    failed: 'red',
} as const;

export const USER_STATUS = {
    ACTIVE: 'active',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
} as const;

export const USER_STATUS_LABELS = {
    active: 'Ativo',
    pending: 'Pendente',
    suspended: 'Suspenso',
} as const;

export const PAYMENT_METHODS = {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    PIX: 'pix',
    BANK_SLIP: 'bank_slip',
} as const;

export const PAYMENT_METHOD_LABELS = {
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    pix: 'PIX',
    bank_slip: 'Boleto',
} as const;

export const CURRENCIES = ['BRL', 'USD', 'EUR'] as const;

export const DATE_FILTERS = {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    CUSTOM: 'custom',
} as const;

export const DATE_FILTER_LABELS = {
    today: 'Hoje',
    yesterday: 'Ontem',
    last_7_days: 'Últimos 7 dias',
    last_30_days: 'Últimos 30 dias',
    this_month: 'Este mês',
    last_month: 'Mês passado',
    custom: 'Período customizado',
} as const;
