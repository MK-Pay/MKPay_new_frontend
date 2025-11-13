<template>
    <div v-if="accountsStore.accounts.length > 0" class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div class="flex items-center gap-3">
                <label for="account-select" class="text-sm font-medium text-gray-700">
                    Conta:
                </label>
                <select
                    id="account-select"
                    v-model="selectedUuid"
                    class="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="" disabled>Selecione uma conta</option>
                    <option v-for="account in accountsStore.accounts" :key="account.uuid" :value="account.uuid">
                        {{ account.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';

const accountsStore = useAccountsStore();
const selectedUuid = ref<string>('');

onMounted(async () => {
    // Fetch accounts if not already loaded
    if (accountsStore.accounts.length === 0) {
        await accountsStore.fetchAccounts();
    }

    // Restore selected account
    accountsStore.restoreSelectedAccount();
    if (accountsStore.currentAccount) {
        selectedUuid.value = accountsStore.currentAccount.uuid;
    }
});

watch(selectedUuid, (newUuid) => {
    if (newUuid) {
        const account = accountsStore.accounts.find(acc => acc.uuid === newUuid);
        if (account) {
            accountsStore.selectAccount(account);
        }
    }
});
</script>
