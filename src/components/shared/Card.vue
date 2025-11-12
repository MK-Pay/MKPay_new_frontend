<template>
    <div class="bg-white rounded-lg shadow-md" :class="paddingClass">
        <div v-if="title || $slots.header" class="border-b border-gray-200 pb-4 mb-4">
            <slot name="header">
                <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
                <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
            </slot>
        </div>

        <div>
            <slot></slot>
        </div>

        <div v-if="$slots.footer" class="border-t border-gray-200 pt-4 mt-4">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    title?: string;
    subtitle?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    padding: 'md',
});

const paddingClass = computed(() => {
    switch (props.padding) {
        case 'none':
            return 'p-0';
        case 'sm':
            return 'p-3';
        case 'md':
            return 'p-6';
        case 'lg':
            return 'p-8';
        default:
            return 'p-6';
    }
});
</script>
