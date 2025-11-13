<template>
    <AccountRequiredWrapper>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">Minhas Aplicações</h1>
                    <p class="mt-1 text-sm text-gray-600">Gerencie suas aplicações, tokens e vendas</p>
                </div>

                <!-- Apps List -->
                <AppsList />
            </div>
        </div>
    </AccountRequiredWrapper>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';
import AppsList from '@/components/apps/AppsList.vue';
import AccountRequiredWrapper from '@/components/layout/AccountRequiredWrapper.vue';
import { useApps } from '@/composables/useApps';

const accountsStore = useAccountsStore();
const { fetchApps } = useApps();

// Recarregar apps quando a conta muda
watch(
    () => accountsStore.currentAccount,
    () => {
        fetchApps();
    }
);

onMounted(() => {
    fetchApps();
});
</script>
