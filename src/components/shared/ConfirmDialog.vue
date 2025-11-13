<template>
    <Modal :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :closeable="!loading">
        <div class="sm:flex sm:items-start">
            <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                :class="iconBgClass"
            >
                <svg class="h-6 w-6" :class="iconColorClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-lg font-semibold leading-6 text-gray-900">{{ title }}</h3>
                <div class="mt-2">
                    <p class="text-sm text-gray-500">{{ message }}</p>
                </div>
            </div>
        </div>

        <template #footer>
            <button
                @click="handleConfirm"
                :disabled="loading"
                class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                :class="confirmButtonClass"
            >
                <LoadingSpinner v-if="loading" size="sm" color="white" />
                <span v-else>{{ confirmText }}</span>
            </button>
            <button
                @click="handleCancel"
                :disabled="loading"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {{ cancelText }}
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Modal from './Modal.vue';
import LoadingSpinner from './LoadingSpinner.vue';

interface Props {
    modelValue: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    variant: 'warning',
    loading: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
}>();

const iconBgClass = computed(() => {
    switch (props.variant) {
        case 'danger':
            return 'bg-red-100';
        case 'warning':
            return 'bg-yellow-100';
        case 'info':
            return 'bg-blue-100';
        default:
            return 'bg-yellow-100';
    }
});

const iconColorClass = computed(() => {
    switch (props.variant) {
        case 'danger':
            return 'text-red-600';
        case 'warning':
            return 'text-yellow-600';
        case 'info':
            return 'text-blue-600';
        default:
            return 'text-yellow-600';
    }
});

const confirmButtonClass = computed(() => {
    switch (props.variant) {
        case 'danger':
            return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
        case 'warning':
            return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
        case 'info':
            return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
        default:
            return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
    }
});

function handleConfirm() {
    emit('confirm');
}

function handleCancel() {
    emit('update:modelValue', false);
    emit('cancel');
}
</script>
