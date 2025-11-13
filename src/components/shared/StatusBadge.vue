<template>
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="badgeClasses">
        <span v-if="showDot" class="mr-1.5 h-1.5 w-1.5 rounded-full" :class="dotClasses"></span>
        {{ label }}
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    status: string;
    variant?: 'default' | 'outline';
    showDot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    showDot: false,
});

const colorMap: Record<string, { bg: string; text: string; dot: string; outline: string }> = {
    pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        dot: 'bg-yellow-600',
        outline: 'border border-yellow-300 text-yellow-700',
    },
    approved: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        dot: 'bg-green-600',
        outline: 'border border-green-300 text-green-700',
    },
    cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        dot: 'bg-red-600',
        outline: 'border border-red-300 text-red-700',
    },
    refunded: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        dot: 'bg-blue-600',
        outline: 'border border-blue-300 text-blue-700',
    },
    failed: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        dot: 'bg-red-600',
        outline: 'border border-red-300 text-red-700',
    },
    active: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        dot: 'bg-green-600',
        outline: 'border border-green-300 text-green-700',
    },
    inactive: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        dot: 'bg-gray-600',
        outline: 'border border-gray-300 text-gray-700',
    },
    suspended: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        dot: 'bg-orange-600',
        outline: 'border border-orange-300 text-orange-700',
    },
};

const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    cancelled: 'Cancelado',
    refunded: 'Reembolsado',
    failed: 'Falhou',
    active: 'Ativo',
    inactive: 'Inativo',
    suspended: 'Suspenso',
};

const badgeClasses = computed(() => {
    const colors = colorMap[props.status] || colorMap.pending;

    if (props.variant === 'outline') {
        return colors.outline;
    }

    return `${colors.bg} ${colors.text}`;
});

const dotClasses = computed(() => {
    const colors = colorMap[props.status] || colorMap.pending;
    return colors.dot;
});

const label = computed(() => {
    return statusLabels[props.status] || props.status;
});
</script>
