<template>
    <AccountRequiredWrapper>
        <div class="min-h-screen bg-gray-100">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <div class="mb-8">
                        <h1 class="text-3xl font-bold text-gray-900">Meu Perfil</h1>
                        <p class="mt-1 text-sm text-gray-600">Gerencie suas informações pessoais e configurações</p>
                    </div>

                    <Card title="Informações do Perfil">
                        <p class="text-gray-600">Gestão de perfil será implementada na Fase 7.</p>
                    </Card>
                </div>
            </div>
        </div>
    </AccountRequiredWrapper>
</template>

<script setup lang="ts">
import Card from '@/components/shared/Card.vue';
import AccountRequiredWrapper from '@/components/layout/AccountRequiredWrapper.vue';
</script>
