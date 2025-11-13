<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p class="mt-1 text-sm text-gray-600">Bem-vindo de volta! Aqui está um resumo da sua conta.</p>
            </div>

            <!-- Loading State -->
            <LoadingSpinner v-if="loading" fullScreen />

            <!-- Content -->
            <div v-else class="space-y-6">
                <!-- Stats Cards -->
                <DashboardStats :stats="stats" />

                <!-- Grid Layout -->
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <!-- Recent Sales -->
                    <RecentSales :sales="recentSales" />

                    <!-- Quick Actions -->
                    <QuickActions />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';
import DashboardStats from '@/components/dashboard/DashboardStats.vue';
import RecentSales from '@/components/dashboard/RecentSales.vue';
import QuickActions from '@/components/dashboard/QuickActions.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import dashboardService from '@/services/dashboard.service';
import type { DashboardStats as DashboardStatsType, RecentSale } from '@/types/dashboard.types';

const accountsStore = useAccountsStore();
const loading = ref(true);
const stats = ref<DashboardStatsType>();
const recentSales = ref<RecentSale[]>([]);

async function loadDashboardData() {
    try {
        loading.value = true;

        const [statsData, salesData] = await Promise.all([
            dashboardService.getStats(),
            dashboardService.getRecentSales(10),
        ]);

        stats.value = statsData;
        recentSales.value = salesData;
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    } finally {
        loading.value = false;
    }
}

// Reload data when account changes
watch(
    () => accountsStore.currentAccount,
    () => {
        loadDashboardData();
    }
);

onMounted(() => {
    loadDashboardData();
});
</script>
