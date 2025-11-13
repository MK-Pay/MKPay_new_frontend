<template>
    <Modal
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        title="Criar Nova Aplicação"
        subtitle="Preencha os dados da nova aplicação"
        size="lg"
    >
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {{ error }}
            </div>

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Aplicação
                    <span class="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Minha Aplicação"
                />
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                    id="description"
                    v-model="formData.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descrição da aplicação (opcional)"
                ></textarea>
            </div>

            <div>
                <label for="webhook_url" class="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                <input
                    id="webhook_url"
                    v-model="formData.webhook_url"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://exemplo.com/webhook"
                />
                <p class="mt-1 text-sm text-gray-500">URL para receber notificações sobre eventos da aplicação</p>
            </div>
        </form>

        <template #footer>
            <button
                @click="handleSubmit"
                :disabled="loading"
                class="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3"
            >
                <LoadingSpinner v-if="loading" size="sm" color="white" />
                <span v-else>Criar Aplicação</span>
            </button>
            <button
                @click="handleCancel"
                :disabled="loading"
                class="mt-3 inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Cancelar
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Modal from '@/components/shared/Modal.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useApps } from '@/composables/useApps';
import type { CreateAppDTO } from '@/types/app.types';

interface Props {
    modelValue: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'created'): void;
}>();

const { createApp, loading } = useApps();

const formData = ref<CreateAppDTO>({
    name: '',
    description: '',
    webhook_url: '',
});

const error = ref<string | null>(null);

watch(
    () => formData.value,
    () => {
        error.value = null;
    },
    { deep: true }
);

async function handleSubmit() {
    try {
        error.value = null;
        await createApp(formData.value);
        emit('created');
        emit('update:modelValue', false);
        resetForm();
    } catch (err: any) {
        error.value = err.message || 'Falha ao criar aplicação';
    }
}

function handleCancel() {
    emit('update:modelValue', false);
    resetForm();
}

function resetForm() {
    formData.value = {
        name: '',
        description: '',
        webhook_url: '',
    };
    error.value = null;
}
</script>
