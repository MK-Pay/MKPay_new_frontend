<template>
    <Card title="Ações Rápidas" subtitle="Acesse rapidamente as principais funcionalidades">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <router-link
                to="/apps"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors"
            >
                <div class="shrink-0">
                    <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <!--
                        <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        -->
                        <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="m20.45 17.39l-8.09 4.58V18.4l5.04-2.77zm.55-.5V7.31L18.04 9v6.18zm-17.45.5l8.09 4.57V18.4L6.6 15.63zm-.55-.5V7.31L5.96 9v6.18zm.35-10.2L11.64 2v3.45L6.33 8.37l-.05.02zm17.3 0L12.36 2v3.45l5.31 2.93l.04.02zm-9.01 10.9l-4.97-2.74V9.44l4.97 2.87zm.72 0l4.97-2.73V9.44l-4.97 2.87zM7 8.81l5-2.75l5 2.75l-5 2.88z"/></svg>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Aplicações</p>
                    <p class="text-sm text-gray-500">Gerenciar Aplicações</p>
                </div>
            </router-link>

            <router-link
                to="/apps"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors"
            >
                <div class="shrink-0">
                    <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Gerenciar Tokens</p>
                    <p class="text-sm text-gray-500">Ver e criar tokens</p>
                </div>
            </router-link>

            <router-link
                to="/apps"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors"
            >
                <div class="shrink-0">
                    <div class="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Ver Vendas</p>
                    <p class="text-sm text-gray-500">Consultar transações</p>
                </div>
            </router-link>

            <router-link
                to="/documentos"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors"
            >
                <div class="shrink-0">
                    <div class="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                        <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">Upload de Documentos</p>
                    <p class="text-sm text-gray-500">Enviar documentação</p>
                </div>
            </router-link>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/shared/Card.vue';
</script>
