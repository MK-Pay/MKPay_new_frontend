<template>
    <div>
        <!-- Account Selector (only for authenticated pages) -->
        <AccountSelector />

        <!-- Main Content -->
        <div v-if="accountsStore.currentAccountUuid">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

import AccountSelector from '@/components/shared/AccountSelector.vue';
import { useAccountsStore } from '@/stores/accounts.store';

const router = useRouter();
const accountsStore = useAccountsStore();
const selectedUuid = ref<string>(accountsStore.currentAccountUuid || '');
const isAuthenticatedPage = ref(Boolean(selectedUuid.value));

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
