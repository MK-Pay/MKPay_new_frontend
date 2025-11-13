import type { ApiResponse } from '@/types/api.types';
import type { DashboardStats, RecentSale } from '@/types/dashboard.types';
import { ifObjectOr } from '@/utils/data-helpers';

import api from './api';

class DashboardService {
    public getAccountUuid(): string | null {
        // Usar localStorage para evitar circular dependency com Pinia store
        const uuid = localStorage.getItem('selected_account_uuid');

        if (!uuid) {
            console.error('No account selected');
            return null;
        }

        return uuid;
    }

    public hasAccountSelected(): boolean {
        try {
            return Boolean(this.getAccountUuid());
        } catch (error) {
            return false;
        }
    }

    async getStats(): Promise<DashboardStats | null> {
        const accountUuid = this.getAccountUuid();

        if (!accountUuid) {
            return null;
        }

        const response = await api.get<ApiResponse<DashboardStats>>('/api/v1/dashboard/stats', {
            params: { account_uuid: accountUuid },
        });

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async getRecentSales(limit: number = 10): Promise<RecentSale[] | null> {
        const accountUuid = this.getAccountUuid();

        if (!accountUuid) {
            return null;
        }

        const response = await api.get<ApiResponse<RecentSale[]>>('/api/v1/dashboard/recent-sales', {
            params: { account_uuid: accountUuid, limit },
        });

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }
}

export default new DashboardService();
