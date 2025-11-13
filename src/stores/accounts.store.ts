import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import accountsService from '@/services/accounts.service';
import type { Account } from '@/types/auth.types';

export const useAccountsStore = defineStore('accounts', () => {
    // State
    const accounts = ref<Account[]>([]);
    const selectedAccount = ref<Account | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const currentAccount = computed(() => selectedAccount.value);
    const currentAccountUuid = computed(() => selectedAccount.value?.uuid || null);

    // Actions
    async function fetchAccounts() {
        try {
            loading.value = true;
            error.value = null;

            accounts.value = (await accountsService.getAccounts()) || [];

            // Auto-select first account if none selected
            if (!selectedAccount.value && accounts.value?.length > 0) {
                selectAccount(accounts.value[0]!);
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch accounts';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function selectAccount(account: Account) {
        selectedAccount.value = account;
        localStorage.setItem('selected_account_uuid', account.uuid);
        localStorage.setItem('selected_account_id', account.id);
    }

    function clearSelectedAccount() {
        selectedAccount.value = null;
        localStorage.removeItem('selected_account_uuid');
    }

    function restoreSelectedAccount() {
        const savedUuid = localStorage.getItem('selected_account_uuid');
        if (savedUuid && accounts.value.length > 0) {
            const account = accounts.value.find((acc) => acc.uuid === savedUuid);
            if (account) {
                selectedAccount.value = account;
            } else {
                // If saved account not found, select first available
                selectedAccount.value = accounts.value[0] || null;
            }
        }
    }

    return {
        // State
        accounts,
        selectedAccount,
        loading,
        error,
        // Getters
        currentAccount,
        currentAccountUuid,
        // Actions
        fetchAccounts,
        selectAccount,
        clearSelectedAccount,
        restoreSelectedAccount,
    };
});
