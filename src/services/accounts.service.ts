import api from './api';
import type { Account } from '@/types/auth.types';
import type { ApiResponse } from '@/types/api.types';

class AccountsService {
    async getAccounts(): Promise<Account[]> {
        const response = await api.get<ApiResponse<Account[]>>('/api/v1/accounts');
        return response.data.data;
    }

    async getAccount(uuid: string): Promise<Account> {
        const response = await api.get<ApiResponse<Account>>(`/api/v1/accounts/${uuid}`);
        return response.data.data;
    }
}

export default new AccountsService();
