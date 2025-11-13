import type { ApiResponse } from '@/types/api.types';
import type { Account } from '@/types/auth.types';
import { getArrayDataFromResponse, ifObjectOr } from '@/utils/data-helpers';

import api from './api';

class AccountsService {
    async getAccounts(): Promise<Account[]> {
        const response = ifObjectOr(await api.get<ApiResponse<Account[]>>('/api/v1/accounts'));

        return getArrayDataFromResponse(response);
    }

    async getAccount(uuid: string): Promise<Account> {
        const response = ifObjectOr(await api.get<ApiResponse<Account>>(`/api/v1/accounts/${uuid}`));

        if ('data' in response) {
            return 'data' in ifObjectOr(response.data)
                ? ifObjectOr(ifObjectOr(response.data)?.data)
                : ifObjectOr(response.data);
        }

        return response;
    }
}

export default new AccountsService();
