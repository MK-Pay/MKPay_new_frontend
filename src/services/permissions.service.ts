import type { ApiResponse } from '@/types/api.types';
import { ifObjectOr } from '@/utils/data-helpers';

import api from './api';

interface PermissionsResponse {
    permissions: string[];
    roles: string[];
    accounts?: any[];
}

class PermissionsService {
    async getPermissions(): Promise<PermissionsResponse> {
        const response = ifObjectOr(
            await api.post<ApiResponse<PermissionsResponse>>('/api/v1/auth/user', null, {
                params: { info: 'permissions,roles,accounts' },
            }),
            {}
        );

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return {
            permissions: response.permissions || [],
            roles: response.roles || [],
            accounts: response.accounts || [],
        };
    }
}

export default new PermissionsService();
