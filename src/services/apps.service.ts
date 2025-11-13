import api from './api';
import { useAccountsStore } from '@/stores/accounts.store';
import type { App, AppStats, CreateAppDTO, UpdateAppDTO } from '@/types/app.types';
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';

class AppsService {
    private getAccountUuid(): string {
        const accountsStore = useAccountsStore();
        const uuid = accountsStore.currentAccountUuid;
        if (!uuid) {
            throw new Error('No account selected');
        }
        return uuid;
    }

    async getApps(): Promise<App[]> {
        const accountUuid = this.getAccountUuid();
        const response = await api.get<ApiResponse<PaginatedResponse<App>>>('/api/v1/apps', {
            params: { account_uuid: accountUuid },
        });
        return response.data.data.data;
    }

    async getApp(id: string): Promise<App> {
        const response = await api.get<ApiResponse<App>>(`/api/v1/apps/${id}`);
        return response.data.data;
    }

    async createApp(data: CreateAppDTO): Promise<App> {
        const accountUuid = this.getAccountUuid();
        const response = await api.post<ApiResponse<App>>('/api/v1/apps', {
            ...data,
            account_uuid: accountUuid,
        });
        return response.data.data;
    }

    async updateApp(id: string, data: UpdateAppDTO): Promise<App> {
        const response = await api.put<ApiResponse<App>>(`/api/v1/apps/${id}`, data);
        return response.data.data;
    }

    async deleteApp(id: string): Promise<void> {
        await api.delete(`/api/v1/apps/${id}`);
    }

    async getAppStats(id: string): Promise<AppStats> {
        const response = await api.get<ApiResponse<AppStats>>(`/api/v1/apps/${id}/stats`);
        return response.data.data;
    }
}

export default new AppsService();
