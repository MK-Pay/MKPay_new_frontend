export interface DashboardStats {
    total_apps: number;
    sales_this_month: number;
    total_revenue: number;
    success_rate: number;
    sales_this_month_change?: number;
    revenue_change?: number;
}

export interface RecentSale {
    id: string;
    app_id: string;
    app_name: string;
    amount: number;
    currency: string;
    status: 'pending' | 'approved' | 'cancelled' | 'refunded' | 'failed';
    customer_name?: string;
    customer_email: string;
    payment_method: string;
    created_at: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recent_sales: RecentSale[];
}
