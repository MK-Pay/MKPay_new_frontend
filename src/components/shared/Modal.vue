<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
                <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <!-- Backdrop -->
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

                    <!-- Modal panel -->
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                        :class="sizeClass"
                    >
                        <!-- Header -->
                        <div v-if="title || $slots.header" class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <slot name="header">
                                        <h3 class="text-lg font-semibold leading-6 text-gray-900">{{ title }}</h3>
                                        <p v-if="subtitle" class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
                                    </slot>
                                </div>
                                <button
                                    v-if="closeable"
                                    @click="closeModal"
                                    class="ml-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="bg-white px-4 py-5 sm:p-6">
                            <slot></slot>
                        </div>

                        <!-- Footer -->
                        <div v-if="$slots.footer" class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    modelValue: boolean;
    title?: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    closeable: true,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
}>();

const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'sm:max-w-md';
        case 'md':
            return 'sm:max-w-lg';
        case 'lg':
            return 'sm:max-w-2xl';
        case 'xl':
            return 'sm:max-w-4xl';
        default:
            return 'sm:max-w-lg';
    }
});

function closeModal() {
    if (props.closeable) {
        emit('update:modelValue', false);
        emit('close');
    }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
