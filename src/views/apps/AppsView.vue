<template>
    <div class="min-h-screen bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">Minhas Aplicações</h1>
                    <p class="mt-1 text-sm text-gray-600">Gerencie suas aplicações, tokens e vendas</p>
                </div>

                <!-- Apps List -->
                <AppsList />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppsList from '@/components/apps/AppsList.vue';
import { useApps } from '@/composables/useApps';

const { fetchApps } = useApps();

onMounted(() => {
    fetchApps();
});
</script>
