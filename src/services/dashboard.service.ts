import api from './api';
import type { DashboardStats, RecentSale } from '@/types/dashboard.types';
import type { ApiResponse } from '@/types/api.types';

class DashboardService {
    async getStats(): Promise<DashboardStats> {
        const response = await api.get<ApiResponse<DashboardStats>>('/api/v1/dashboard/stats');
        return response.data.data;
    }

    async getRecentSales(limit: number = 10): Promise<RecentSale[]> {
        const response = await api.get<ApiResponse<RecentSale[]>>('/api/v1/dashboard/recent-sales', {
            params: { limit },
        });
        return response.data.data;
    }
}

export default new DashboardService();
