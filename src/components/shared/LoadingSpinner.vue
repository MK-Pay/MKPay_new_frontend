<template>
    <div class="flex items-center justify-center" :class="containerClass">
        <div class="animate-spin rounded-full border-b-2" :class="[sizeClass, colorClass]"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'white' | 'gray';
    fullScreen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'primary',
    fullScreen: false,
});

const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'h-4 w-4';
        case 'md':
            return 'h-8 w-8';
        case 'lg':
            return 'h-12 w-12';
        default:
            return 'h-8 w-8';
    }
});

const colorClass = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'border-blue-600';
        case 'white':
            return 'border-white';
        case 'gray':
            return 'border-gray-600';
        default:
            return 'border-blue-600';
    }
});

const containerClass = computed(() => {
    if (props.fullScreen) {
        return 'fixed inset-0 bg-white bg-opacity-75 z-50';
    }
    return '';
});
</script>
