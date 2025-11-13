<template>
    <div>
        <template v-if="isAuthenticatedPage">
            <MainLayout>
                <router-view />
            </MainLayout>
        </template>
        <template v-else>
            <router-view />
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';

import { useRouter } from 'vue-router';

import MainLayout from '@/components/layout/MainLayout.vue';
import { useAccountsStore } from '@/stores/accounts.store';

const router = useRouter();
const accountsStore = useAccountsStore();

const AUTHENTICATED_ROUTES = [
    'dashboard',
    'apps',
    'app-detail',
    'app-overview',
    'app-tokens',
    'app-vendas',
    'app-configuracoes',
    'perfil',
    'documentos',
];

// Computed para detectar rota autenticada em tempo real
const isAuthenticatedPage = computed(() => {
    const currentRouteName = router.currentRoute.value.name as string;
    return AUTHENTICATED_ROUTES.includes(currentRouteName);
});

// Função para carregar contas
async function loadAccounts() {
    if (isAuthenticatedPage.value) {
        if (accountsStore.accounts.length === 0) {
            try {
                await accountsStore.fetchAccounts();
            } catch (error) {
                console.error('Failed to load accounts:', error);
            }
        } else {
            accountsStore.restoreSelectedAccount();
        }
    }
}

// Carregar contas ao montar
onMounted(() => {
    loadAccounts();
});

// Carregar contas ao mudar de rota
watch(
    () => router.currentRoute.value.name,
    () => {
        loadAccounts();
    }
);
</script>
