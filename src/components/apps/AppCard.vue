<template>
    <Card padding="sm" class="hover:shadow-lg transition-shadow cursor-pointer" @click="navigateToApp">
        <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3">
                    <div class="flex-shrink-0">
                        <div
                            class="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                        >
                            <span class="text-white font-bold text-lg">{{ appInitials }}</span>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-semibold text-gray-900 truncate">{{ app.name }}</h3>
                        <p v-if="app.description" class="text-sm text-gray-500 truncate">{{ app.description }}</p>
                    </div>
                </div>

                <div class="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                        <span>{{ app.total_tokens || 0 }} tokens</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span>{{ app.sales_count || 0 }} vendas</span>
                    </div>
                </div>
            </div>

            <div class="flex-shrink-0 ml-4">
                <StatusBadge :status="app.status" />
            </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
            <span class="text-gray-500">
                {{ app.last_used_at ? `Último uso: ${formatRelativeTime(app.last_used_at)}` : 'Nunca usado' }}
            </span>
            <button @click.stop="$emit('delete', app.id)" class="text-red-600 hover:text-red-700 font-medium">
                Deletar
            </button>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Card from '@/components/shared/Card.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import { formatRelativeTime } from '@/utils/formatters';
import type { App } from '@/types/app.types';

interface Props {
    app: App;
}

const props = defineProps<Props>();

defineEmits<{
    (e: 'delete', id: string): void;
}>();

const router = useRouter();

const appInitials = computed(() => {
    return props.app.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
});

function navigateToApp() {
    router.push(`/apps/${props.app.id}`);
}
</script>
