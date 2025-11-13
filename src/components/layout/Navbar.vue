<template>
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center gap-2">
                    <router-link
                        to="/"
                        class="flex items-center gap-2 font-bold text-lg text-blue-600 hover:text-blue-700"
                    >
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fill-rule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 001-1V6a2 2 0 00-2-2H4zm12 12H4c-1.1 0-2 .9-2 2v2h16v-2c0-1.1-.9-2-2-2z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span class="hidden sm:inline">MKPay</span>
                    </router-link>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8">
                    <template v-if="hasAccountSelected">
                        <router-link
                            to="/"
                            :class="[
                                'text-sm font-medium transition-colors',
                                isRouteActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600',
                            ]"
                        >
                            Dashboard
                        </router-link>

                        <router-link
                            to="/apps"
                            :class="[
                                'text-sm font-medium transition-colors',
                                isRouteActive('/apps') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600',
                            ]"
                        >
                            Aplicações
                        </router-link>

                        <router-link
                            to="/perfil"
                            :class="[
                                'text-sm font-medium transition-colors',
                                isRouteActive('/perfil') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600',
                            ]"
                        >
                            Perfil
                        </router-link>
                    </template>
                </div>

                <!-- Right side: Account Selector + User Menu -->
                <div class="flex items-center gap-4">
                    <!-- Account Selector (Mobile) -->
                    <div v-if="hasAccountSelected" class="md:hidden">
                        <select
                            v-model="selectedAccountUuid"
                            class="text-xs px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                        >
                            <template v-if="accountsStore.accounts.length > 0">
                                <option
                                    v-for="account in accountsStore.accounts"
                                    :key="account.uuid"
                                    :value="account.uuid"
                                >
                                    {{ account.name }}
                                </option>
                            </template>
                        </select>
                    </div>

                    <!-- Account Selector (Desktop) -->
                    <div v-if="hasAccountSelected" class="hidden md:block">
                        <select
                            v-model="selectedAccountUuid"
                            class="text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <template v-if="accountsStore.accounts.length > 0">
                                <option
                                    v-for="account in accountsStore.accounts"
                                    :key="account.uuid"
                                    :value="account.uuid"
                                >
                                    {{ account.name }}
                                </option>
                            </template>
                        </select>
                    </div>

                    <!-- User Menu -->
                    <div class="relative">
                        <button
                            @click="userMenuOpen = !userMenuOpen"
                            class="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg class="w-4 h-4 hidden sm:inline" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>

                        <!-- Dropdown Menu -->
                        <transition
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <div
                                v-show="userMenuOpen"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200"
                            >
                                <router-link
                                    to="/perfil"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg transition"
                                    @click="userMenuOpen = false"
                                >
                                    Meu Perfil
                                </router-link>
                                <router-link
                                    to="/documentos"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                                    @click="userMenuOpen = false"
                                >
                                    Documentos
                                </router-link>
                                <hr class="my-1" />
                                <button
                                    @click="handleLogout"
                                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg transition"
                                >
                                    Sair
                                </button>
                            </div>
                        </transition>
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <button
                        v-if="!mobileMenuOpen"
                        @click="mobileMenuOpen = true"
                        class="md:hidden text-gray-700 hover:text-gray-900"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <button v-else @click="mobileMenuOpen = false" class="md:hidden text-gray-700 hover:text-gray-900">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 -translate-y-2"
                enter-to-class="transform opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 translate-y-0"
                leave-to-class="transform opacity-0 -translate-y-2"
            >
                <div v-show="mobileMenuOpen" class="md:hidden border-t border-gray-200 bg-gray-50 py-3">
                    <template v-if="hasAccountSelected">
                        <router-link
                            to="/"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            @click="mobileMenuOpen = false"
                        >
                            Dashboard
                        </router-link>
                        <router-link
                            to="/apps"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            @click="mobileMenuOpen = false"
                        >
                            Aplicações
                        </router-link>
                        <router-link
                            to="/perfil"
                            class="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            @click="mobileMenuOpen = false"
                        >
                            Perfil
                        </router-link>
                    </template>
                </div>
            </transition>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts.store';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const accountsStore = useAccountsStore();
const authStore = useAuthStore();

const userMenuOpen = ref(false);
const mobileMenuOpen = ref(false);
const selectedAccountUuid = ref<string | null>(accountsStore.currentAccountUuid || '');

const hasAccountSelected = computed(() => Boolean(selectedAccountUuid.value));

function isRouteActive(path: string): boolean {
    return router.currentRoute.value.path === path || router.currentRoute.value.path.startsWith(path + '/');
}

async function handleLogout() {
    try {
        await authStore.logout();
        router.push('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

// Sincronizar seleção com store
watch(selectedAccountUuid, (newUuid) => {
    if (newUuid) {
        const account = accountsStore.accounts.find((acc) => acc.uuid === newUuid);
        if (account) {
            accountsStore.selectAccount(account);
        }
    }
});

// Sincronizar store com componente
watch(
    () => accountsStore.currentAccountUuid,
    (newUuid) => {
        selectedAccountUuid.value = newUuid;
    }
);

// Fechar menus ao clicar fora
document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('[class*="user-menu"]') && !target.closest('button')) {
        userMenuOpen.value = false;
    }
});
</script>
