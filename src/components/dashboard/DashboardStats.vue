<template>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Total Apps -->
        <Card padding="sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Total de Apps</p>
                    <p class="mt-1 text-3xl font-semibold text-gray-900">
                        {{ stats?.total_apps || 0 }}
                    </p>
                </div>
                <div class="p-3 bg-blue-100 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                </div>
            </div>
        </Card>

        <!-- Sales This Month -->
        <Card padding="sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Vendas no Mês</p>
                    <p class="mt-1 text-3xl font-semibold text-gray-900">
                        {{ formatNumber(stats?.sales_this_month || 0) }}
                    </p>
                    <p
                        v-if="stats?.sales_this_month_change"
                        class="mt-1 text-sm"
                        :class="changeClass(stats.sales_this_month_change)"
                    >
                        {{ stats.sales_this_month_change > 0 ? '+' : ''
                        }}{{ formatPercentage(stats.sales_this_month_change) }}
                    </p>
                </div>
                <div class="p-3 bg-green-100 rounded-lg">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
            </div>
        </Card>

        <!-- Total Revenue -->
        <Card padding="sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Receita Total</p>
                    <p class="mt-1 text-3xl font-semibold text-gray-900">
                        {{ formatCurrency(stats?.total_revenue || 0) }}
                    </p>
                    <p v-if="stats?.revenue_change" class="mt-1 text-sm" :class="changeClass(stats.revenue_change)">
                        {{ stats.revenue_change > 0 ? '+' : '' }}{{ formatPercentage(stats.revenue_change) }}
                    </p>
                </div>
                <div class="p-3 bg-purple-100 rounded-lg">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
        </Card>

        <!-- Success Rate -->
        <Card padding="sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                    <p class="mt-1 text-3xl font-semibold text-gray-900">
                        {{ formatPercentage(stats?.success_rate || 0) }}
                    </p>
                </div>
                <div class="p-3 bg-yellow-100 rounded-lg">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/shared/Card.vue';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';
import type { DashboardStats } from '@/types/dashboard.types';

interface Props {
    stats?: DashboardStats;
}

defineProps<Props>();

function changeClass(value: number): string {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
}
</script>
