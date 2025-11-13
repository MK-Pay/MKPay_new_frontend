<template>
    <div>
        <!-- Account Selector (only for authenticated pages) -->
        <AccountSelector v-if="isAuthenticatedPage" />

        <!-- Main Content -->
        <div v-if="!isAuthenticatedPage || accountsStore.currentAccount">
            <slot />
        </div>

        <!-- Empty State - No Account Selected -->
        <div v-else class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="mt-2 text-lg font-medium text-gray-900">Nenhuma conta selecionada</h3>
                <p class="mt-1 text-sm text-gray-500">
                    Selecione uma conta no menu acima para começar
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountsStore } from '@/stores/accounts.store';
import AccountSelector from '@/components/shared/AccountSelector.vue';

const router = useRouter();
const accountsStore = useAccountsStore();
const isAuthenticatedPage = ref(false);

const AUTHENTICATED_ROUTES = ['dashboard', 'apps', 'app-detail', 'app-overview', 'app-tokens', 'app-vendas', 'app-configuracoes', 'perfil', 'documentos'];

onMounted(async () => {
    // Check if current route is authenticated
    const currentRouteName = router.currentRoute.value.name as string;
    isAuthenticatedPage.value = AUTHENTICATED_ROUTES.includes(currentRouteName);

    if (isAuthenticatedPage.value) {
        // Load accounts if not already loaded
        if (accountsStore.accounts.length === 0) {
            try {
                await accountsStore.fetchAccounts();
            } catch (error) {
                console.error('Failed to load accounts:', error);
            }
        } else {
            // Restore selected account from localStorage
            accountsStore.restoreSelectedAccount();
        }
    }
});
</script>
