<template>
    <div class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div class="flex items-center gap-3 group">
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
                <div class="min-w-14 h-9">
                    <div class="hidden group-hover:block">
                        <SecondaryButton
                            title="Refresh"
                            class="cursor-pointer"
                            @click.stop.prevent="accountsStore.fetchAccounts"
                        >
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE -->
                                <g fill="none">
                                    <path
                                        d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M20 9.5a1.5 1.5 0 0 1 1.5 1.5a8.5 8.5 0 0 1-8.5 8.5h-2.382a1.5 1.5 0 0 1-2.179 2.06l-2.494-2.494a1.5 1.5 0 0 1-.445-1.052v-.028c.003-.371.142-.71.368-.97l.071-.077l2.5-2.5a1.5 1.5 0 0 1 2.18 2.061H13a5.5 5.5 0 0 0 5.5-5.5A1.5 1.5 0 0 1 20 9.5m-4.44-7.06l2.5 2.5a1.5 1.5 0 0 1 0 2.12l-2.5 2.5a1.5 1.5 0 0 1-2.178-2.06H11A5.5 5.5 0 0 0 5.5 13a1.5 1.5 0 1 1-3 0A8.5 8.5 0 0 1 11 4.5h2.382a1.5 1.5 0 0 1 2.179-2.06Z"
                                    />
                                </g>
                            </svg>
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Empty State - No Account Selected -->
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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import SecondaryButton from '@/components/InertiaComponents/SecondaryButton.vue';
import { useAccountsStore } from '@/stores/accounts.store';

const accountsStore = useAccountsStore();
const selectedUuid = ref<string | null>(accountsStore.currentAccountUuid || '');

onMounted(async () => {
    console.log('accountsStore', accountsStore);
    // Fetch accounts if not already loaded
    if (accountsStore.accounts?.length === 0) {
        await accountsStore.fetchAccounts();
    }

    // Restore selected account
    accountsStore.restoreSelectedAccount();
    if (accountsStore.currentAccount) {
        selectedUuid.value = accountsStore.currentAccount.uuid;
    }

    selectedUuid.value = selectedUuid.value || '';
});

watch(selectedUuid, (newUuid) => {
    if (newUuid) {
        const account = accountsStore?.accounts?.find((acc) => acc.uuid === newUuid);
        if (account) {
            accountsStore.selectAccount(account);
        }
    }
});
</script>
