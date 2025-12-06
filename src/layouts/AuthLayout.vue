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
import { usePermissionsStore } from '@/stores/permissions.store';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const accountsStore = useAccountsStore();
const permissionsStore = usePermissionsStore();
const authStore = useAuthStore();

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

// Função para carregar dados do usuário (contas e permissões)
async function loadUserData() {
    // Só carregar se estiver em página autenticada e tiver token
    if (!isAuthenticatedPage.value || !authStore.isAuthenticated) {
        return;
    }

    try {
        // Carregar accounts e permissions em paralelo
        await Promise.all([
            // Carregar accounts
            accountsStore.accounts.length === 0
                ? accountsStore.fetchAccounts()
                : Promise.resolve(accountsStore.restoreSelectedAccount()),

            // Sempre sincronizar permissions ao dar refresh
            permissionsStore.fetchPermissions(),
        ]);
    } catch (error) {
        console.error('Failed to load user data:', error);
    }
}

// Carregar dados do usuário ao montar
onMounted(() => {
    loadUserData();
});

// Carregar dados ao mudar de rota
watch(
    () => router.currentRoute.value.name,
    () => {
        loadUserData();
    }
);
</script>
