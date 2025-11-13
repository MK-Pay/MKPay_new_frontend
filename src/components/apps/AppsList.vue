<template>
    <div class="space-y-4">
        <!-- Header with Search and Create Button -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div class="w-full sm:w-96">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar por nome..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <button
                @click="showCreateModal = true"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nova Aplicação
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
            <LoadingSpinner />
        </div>

        <!-- Empty State -->
        <EmptyState
            v-else-if="filteredApps.length === 0 && !searchQuery"
            title="Nenhuma aplicação cadastrada"
            description="Comece criando sua primeira aplicação para gerenciar tokens e vendas"
        >
            <template #action>
                <button
                    @click="showCreateModal = true"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Criar Primeira Aplicação
                </button>
            </template>
        </EmptyState>

        <!-- No Search Results -->
        <EmptyState
            v-else-if="filteredApps.length === 0 && searchQuery"
            title="Nenhuma aplicação encontrada"
            :description="`Nenhuma aplicação encontrada para '${searchQuery}'`"
        />

        <!-- Apps Grid -->
        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AppCard v-for="app in filteredApps" :key="app.id" :app="app" @delete="handleDeleteRequest" />
        </div>

        <!-- Create Modal -->
        <AppCreateModal v-model="showCreateModal" @created="handleAppCreated" />

        <!-- Delete Confirmation Dialog -->
        <ConfirmDialog
            v-model="showDeleteDialog"
            title="Deletar Aplicação"
            message="Tem certeza que deseja deletar esta aplicação? Esta ação não pode ser desfeita e todos os tokens associados serão removidos."
            confirm-text="Deletar"
            cancel-text="Cancelar"
            variant="danger"
            :loading="deleteLoading"
            @confirm="handleDeleteConfirm"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppCard from './AppCard.vue';
import AppCreateModal from './AppCreateModal.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import { useApps } from '@/composables/useApps';
import type { App } from '@/types/app.types';

const { apps, loading, deleteApp } = useApps();

const searchQuery = ref('');
const showCreateModal = ref(false);
const showDeleteDialog = ref(false);
const deleteLoading = ref(false);
const appToDelete = ref<string | null>(null);

const filteredApps = computed(() => {
    if (!searchQuery.value) {
        return apps.value;
    }
    return apps.value.filter((app: App) => app.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

function handleDeleteRequest(appId: string) {
    appToDelete.value = appId;
    showDeleteDialog.value = true;
}

async function handleDeleteConfirm() {
    if (!appToDelete.value) return;

    try {
        deleteLoading.value = true;
        await deleteApp(appToDelete.value);
        showDeleteDialog.value = false;
        appToDelete.value = null;
    } catch (error) {
        console.error('Failed to delete app:', error);
    } finally {
        deleteLoading.value = false;
    }
}

function handleAppCreated() {
    // App list will be automatically updated by the store
}
</script>
