import api from './api';
import { useAccountsStore } from '@/stores/accounts.store';
import type { DashboardStats, RecentSale } from '@/types/dashboard.types';
import type { ApiResponse } from '@/types/api.types';

class DashboardService {
    private getAccountUuid(): string {
        const accountsStore = useAccountsStore();
        const uuid = accountsStore.currentAccountUuid;
        if (!uuid) {
            throw new Error('No account selected');
        }
        return uuid;
    }

    async getStats(): Promise<DashboardStats> {
        const accountUuid = this.getAccountUuid();
        const response = await api.get<ApiResponse<DashboardStats>>('/api/v1/dashboard/stats', {
            params: { account_uuid: accountUuid },
        });
        return response.data.data;
    }

    async getRecentSales(limit: number = 10): Promise<RecentSale[]> {
        const accountUuid = this.getAccountUuid();
        const response = await api.get<ApiResponse<RecentSale[]>>('/api/v1/dashboard/recent-sales', {
            params: { account_uuid: accountUuid, limit },
        });
        return response.data.data;
    }
}

export default new DashboardService();
