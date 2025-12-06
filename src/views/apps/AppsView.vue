<template>
    <div>
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Minhas Aplicações</h1>
            <p class="mt-1 text-sm text-gray-600">Gerencie suas aplicações, tokens e vendas</p>
        </div>

        <!-- No Permission State -->
        <div v-if="!hasPermission('apps.view')" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div class="flex items-center gap-3">
                <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <div>
                    <h3 class="text-sm font-medium text-yellow-800">Sem permissão para visualizar aplicações</h3>
                    <p class="mt-1 text-sm text-yellow-700">
                        Você não possui permissão para visualizar as aplicações. Entre em contato com o administrador.
                    </p>
                </div>
            </div>
        </div>

        <!-- Apps List - Só mostrar se tiver permissão -->
        <AppsList v-else />
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';
import { usePermissions } from '@/composables/usePermissions';
import AppsList from '@/components/apps/AppsList.vue';
import { useApps } from '@/composables/useApps';

const accountsStore = useAccountsStore();
const { hasPermission } = usePermissions();
const { fetchApps } = useApps();

// Recarregar apps quando a conta muda (somente se tiver permissão)
watch(
    () => accountsStore.currentAccount,
    () => {
        if (hasPermission('apps.view')) {
            fetchApps();
        }
    }
);

onMounted(() => {
    if (hasPermission('apps.view')) {
        fetchApps();
    }
});
</script>
