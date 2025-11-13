import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { App, AppStats, CreateAppDTO, UpdateAppDTO } from '@/types/app.types';
import { ifObjectOr } from '@/utils/data-helpers';

import api from './api';

class AppsService {
    private getAccountUuid(): string | null {
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

    async getApps(): Promise<App[] | any[] | null> {
        const accountUuid = this.getAccountUuid();

        if (!accountUuid) {
            return null;
        }

        const response = await api.get<ApiResponse<PaginatedResponse<App>>>('/api/v1/apps', {
            params: { account_uuid: accountUuid },
        });

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async getApp(appId: string): Promise<App> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        const response = await api.get<ApiResponse<App>>(`/api/v1/apps/${appId}`);

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async createApp(data: Omit<CreateAppDTO, 'account_uuid'>): Promise<App> {
        const accountUuid = this.getAccountUuid();
        const response = await api.post<ApiResponse<App>>('/api/v1/apps', {
            ...data,
            account_uuid: accountUuid,
        });

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async updateApp(appId: string, data: UpdateAppDTO): Promise<App> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        const response = await api.put<ApiResponse<App>>(`/api/v1/apps/${appId}`, data);

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async deleteApp(appId: string): Promise<void> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        await api.delete(`/api/v1/apps/${appId}`);
    }

    async activateApp(appId: string): Promise<App> {
        const response = await api.post<ApiResponse<App>>(`/api/v1/apps/${appId}/activate`);

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async deactivateApp(appId: string): Promise<App> {
        const response = await api.post<ApiResponse<App>>(`/api/v1/apps/${appId}/deactivate`);

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }

    async getAppStats(appId: string): Promise<AppStats> {
        // appId deve ser o campo app_id (UUID) do App, não o id numérico
        const response = await api.get<ApiResponse<AppStats>>(`/api/v1/apps/${appId}/stats`);

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return ifObjectOr(response);
    }
}

export default new AppsService();
