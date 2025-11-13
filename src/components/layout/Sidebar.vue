<template>
    <div>
        <!-- Sidebar Toggle Button (Mobile) -->
        <button
            v-if="!sidebarOpen"
            @click="sidebarOpen = true"
            class="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition"
            aria-label="Abrir menu"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Sidebar Overlay (Mobile) -->
        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-show="sidebarOpen"
                class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                @click="sidebarOpen = false"
            />
        </transition>

        <!-- Sidebar -->
        <aside
            :class="[
                'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40',
                'w-64 lg:w-64 lg:relative lg:top-0 lg:h-auto lg:shadow-none',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
            ]"
        >
            <!-- Close Button (Mobile) -->
            <button
                @click="sidebarOpen = false"
                class="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Fechar menu"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Logo (Mobile Only) -->
            <div class="lg:hidden px-6 py-4 border-b border-gray-200">
                <h2 class="font-bold text-lg text-blue-600">MKPay</h2>
            </div>

            <!-- Navigation Items -->
            <nav class="px-4 py-6 space-y-2 overflow-y-auto h-full">
                <!-- Dashboard -->
                <template v-if="hasAccountSelected">
                    <router-link
                        to="/"
                        :class="[
                            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                            isRouteActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100',
                        ]"
                        @click="sidebarOpen = false"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4 2m0-6l4-2"
                            />
                        </svg>
                        <span>Dashboard</span>
                    </router-link>

                    <!-- Apps -->
                    <router-link
                        to="/apps"
                        :class="[
                            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                            isRouteActive('/apps') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100',
                        ]"
                        @click="sidebarOpen = false"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <span>Aplicações</span>
                    </router-link>

                    <!-- Separator -->
                    <div class="my-2 border-t border-gray-200" />
                </template>

                <!-- Profile -->
                <router-link
                    to="/perfil"
                    :class="[
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        isRouteActive('/perfil') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100',
                    ]"
                    @click="sidebarOpen = false"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <span>Perfil</span>
                </router-link>

                <!-- Documents -->
                <router-link
                    to="/documentos"
                    :class="[
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        isRouteActive('/documentos') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100',
                    ]"
                    @click="sidebarOpen = false"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span>Documentos</span>
                </router-link>

                <!-- Help -->
                <div class="my-2 border-t border-gray-200" />
                <a
                    href="#"
                    :class="[
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        'text-gray-700 hover:bg-gray-100',
                    ]"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Ajuda</span>
                </a>
            </nav>

            <!-- Empty State -->
            <div v-if="!hasAccountSelected" class="px-6 py-8 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p class="mt-4 text-sm text-gray-500">Selecione uma conta para acessar o menu</p>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts.store';

const router = useRouter();
const accountsStore = useAccountsStore();
const sidebarOpen = ref(false);

const hasAccountSelected = computed(() => Boolean(accountsStore.currentAccountUuid));

function isRouteActive(path: string): boolean {
    return router.currentRoute.value.path === path || router.currentRoute.value.path.startsWith(path + '/');
}

// Fechar sidebar ao navegar
router.afterEach(() => {
    sidebarOpen.value = false;
});
</script>
