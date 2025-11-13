<template>
    <AccountRequiredWrapper>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <router-view />
            </div>
        </div>
    </AccountRequiredWrapper>
</template>

<script setup lang="ts">
import AccountRequiredWrapper from '@/components/layout/AccountRequiredWrapper.vue';

// Container for app detail views (overview, tokens, vendas, configuracoes)
</script>
