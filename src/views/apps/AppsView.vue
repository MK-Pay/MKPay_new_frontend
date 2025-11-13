<template>
    <div>
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Minhas Aplicações</h1>
            <p class="mt-1 text-sm text-gray-600">Gerencie suas aplicações, tokens e vendas</p>
        </div>

        <!-- Apps List -->
        <AppsList />
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';
import AppsList from '@/components/apps/AppsList.vue';
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
