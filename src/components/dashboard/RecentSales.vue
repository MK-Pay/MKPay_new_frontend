<template>
    <Card title="Vendas Recentes" subtitle="Últimas transações realizadas">
        <div v-if="sales && sales.length > 0" class="flow-root">
            <ul class="-my-5 divide-y divide-gray-200">
                <li v-for="sale in sales" :key="sale.id" class="py-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg
                                    class="h-5 w-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                                {{ sale.customer_name || sale.customer_email }}
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                                {{ sale.app_name }} • {{ formatRelativeTime(sale.created_at) }}
                            </p>
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="text-sm font-semibold text-gray-900">
                                {{ formatCurrency(sale.amount, sale.currency) }}
                            </p>
                            <StatusBadge :status="sale.status" class="mt-1" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <EmptyState
            v-else
            title="Nenhuma venda recente"
            description="As vendas aparecerão aqui assim que forem realizadas"
        />

        <template #footer>
            <router-link to="/apps" class="text-sm font-medium text-blue-600 hover:text-blue-700">
                Ver todas as vendas
                <span aria-hidden="true">→</span>
            </router-link>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/shared/Card.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import EmptyState from '@/components/shared/EmptyState.vue';
import { formatCurrency, formatRelativeTime } from '@/utils/formatters';
import type { RecentSale } from '@/types/dashboard.types';

interface Props {
    sales?: RecentSale[];
}

defineProps<Props>();
</script>
