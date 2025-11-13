<template>
    <div>
        <!-- Account Selector Header -->
        <div class="bg-white border-b border-gray-200 shadow-sm">
            <!-- <div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div class="flex items-center gap-3">
                    <label for="account-select" class="text-sm font-medium text-gray-700">Conta:</label>
                    <select
                        id="account-select"
                        v-model="selectedUuid"
                        class="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Selecione uma conta</option>
                        <template v-if="accountsStore.accounts.length > 0">
                            <option v-for="account in accountsStore.accounts" :key="account.uuid" :value="account.uuid">
                                {{ account.name }}
                            </option>
                        </template>
                    </select>
                </div>
            </div>
            -->
            <AccountSelector />
        </div>

        <!-- Content or Empty State -->
        <div v-if="!selectedUuid" class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 class="mt-2 text-lg font-medium text-gray-900">Nenhuma conta selecionada</h3>
                <p class="mt-1 text-sm text-gray-500">Selecione uma conta no menu acima para começar</p>
            </div>
        </div>

        <!-- Slot for Page Content -->
        <template v-else>
            <slot />
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import AccountSelector from '@/components/shared/AccountSelector.vue';
import { useAccountsStore } from '@/stores/accounts.store';

const router = useRouter();
const accountsStore = useAccountsStore();
const selectedUuid = ref<string | null>(accountsStore.currentAccountUuid || '');
let isInitialMount = true;

onMounted(async () => {
    // Carregar contas se não estiverem carregadas
    if (accountsStore.accounts?.length === 0) {
        await accountsStore.fetchAccounts();
    }

    // Restaurar conta selecionada
    accountsStore.restoreSelectedAccount();
    if (accountsStore.currentAccount) {
        selectedUuid.value = accountsStore.currentAccount.uuid;
    }

    selectedUuid.value = selectedUuid.value || '';
    isInitialMount = false;
});

// Redirecionar para / ao mudar de conta
watch(
    () => accountsStore.currentAccount,
    (newAccount) => {
        // Pula o redirect na primeira carga
        if (!isInitialMount && newAccount) {
            router.push('/');
        }
    }
);
</script>
