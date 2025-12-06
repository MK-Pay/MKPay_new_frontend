<template>
    <div>
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Meu Perfil</h1>
            <p class="mt-1 text-sm text-gray-600">Gerencie suas informações pessoais e configurações</p>
        </div>

        <div class="space-y-6">
            <!-- Informações do Perfil -->
            <Card title="Informações do Perfil">
                <p class="text-gray-600">Gestão de perfil será implementada na Fase 7.</p>
            </Card>

            <!-- Permissões e Roles -->
            <Card title="Permissões e Roles">
                <div class="space-y-4">
                    <!-- Success Message -->
                    <div
                        v-if="showSuccessMessage"
                        class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
                    >
                        <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p class="text-sm text-green-800">Permissões sincronizadas com sucesso!</p>
                    </div>

                    <!-- Sync Button -->
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-600">
                            Sincronize suas permissões e roles com o servidor para obter as informações mais
                            atualizadas.
                        </p>
                        <button
                            @click="syncPermissions"
                            :disabled="syncLoading"
                            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                v-if="syncLoading"
                                class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            {{ syncLoading ? 'Sincronizando...' : 'Sincronizar Permissões' }}
                        </button>
                    </div>

                    <!-- Roles List -->
                    <div v-if="roles.length > 0" class="border-t border-gray-200 pt-4">
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Roles Ativas</h3>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="role in roles"
                                :key="role"
                                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                            >
                                {{ role }}
                            </span>
                        </div>
                    </div>

                    <!-- Permissions List -->
                    <div v-if="permissions.length > 0" class="border-t border-gray-200 pt-4">
                        <h3 class="text-sm font-medium text-gray-900 mb-2">
                            Permissões Ativas ({{ permissions.length }})
                        </h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            <span
                                v-for="permission in permissions"
                                :key="permission"
                                class="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                            >
                                <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                {{ permission }}
                            </span>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-if="permissions.length === 0 && roles.length === 0"
                        class="text-center py-8 text-gray-500 text-sm"
                    >
                        Nenhuma permissão ou role encontrada. Clique em "Sincronizar Permissões" para carregar.
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/shared/Card.vue';
import { usePermissions } from '@/composables/usePermissions';

const { permissions, roles, fetchPermissions } = usePermissions();

const syncLoading = ref(false);
const showSuccessMessage = ref(false);

async function syncPermissions() {
    try {
        syncLoading.value = true;
        showSuccessMessage.value = false;

        await fetchPermissions();

        showSuccessMessage.value = true;

        // Ocultar mensagem de sucesso após 3 segundos
        setTimeout(() => {
            showSuccessMessage.value = false;
        }, 3000);
    } catch (error) {
        console.error('Error syncing permissions:', error);
    } finally {
        syncLoading.value = false;
    }
}
</script>
