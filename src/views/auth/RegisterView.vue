<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900">MKPay</h1>
                <p class="mt-2 text-sm text-gray-600">Client Portal</p>
            </div>

            <RegisterForm />
        </div>
    </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>
