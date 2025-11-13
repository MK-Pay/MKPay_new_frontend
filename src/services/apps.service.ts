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

    async getApp(appId: string): Promise<App> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        const response = await api.get<ApiResponse<App>>(`/api/v1/apps/${appId}`);
        return response.data.data;
    }

    async createApp(data: Omit<CreateAppDTO, 'account_uuid'>): Promise<App> {
        const accountUuid = this.getAccountUuid();
        const response = await api.post<ApiResponse<App>>('/api/v1/apps', {
            ...data,
            account_uuid: accountUuid,
        });
        return response.data.data;
    }

    async updateApp(appId: string, data: UpdateAppDTO): Promise<App> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        const response = await api.put<ApiResponse<App>>(`/api/v1/apps/${appId}`, data);
        return response.data.data;
    }

    async deleteApp(appId: string): Promise<void> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        await api.delete(`/api/v1/apps/${appId}`);
    }

    async activateApp(appId: string): Promise<App> {
        const response = await api.post<ApiResponse<App>>(`/api/v1/apps/${appId}/activate`);
        return response.data.data;
    }

    async deactivateApp(appId: string): Promise<App> {
        const response = await api.post<ApiResponse<App>>(`/api/v1/apps/${appId}/deactivate`);
        return response.data.data;
    }

    async getAppStats(appId: string): Promise<AppStats> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        const response = await api.get<ApiResponse<AppStats>>(`/api/v1/apps/${appId}/stats`);
        return response.data.data;
    }
}

export default new AppsService();
