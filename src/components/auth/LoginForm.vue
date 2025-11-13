<template>
    <Card title="Login" subtitle="Enter your credentials to access your account">
        <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {{ error }}
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                />
            </div>

            <div class="flex items-center justify-between">
                <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>

                <a href="#" class="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <LoadingSpinner v-if="loading" size="sm" color="white" />
                <span v-else>Sign in</span>
            </button>

            <div class="text-center text-sm text-gray-600">
                Don't have an account?
                <router-link to="/register" class="text-blue-600 hover:text-blue-700 font-medium">Sign up</router-link>
            </div>
        </form>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';

import Card from '@/components/shared/Card.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import { useAuth } from '@/composables/useAuth';
import type { LoginCredentials } from '@/types/auth.types';

const router = useRouter();
const { login, loading } = useAuth();

const formData = ref<LoginCredentials>({
    email: 'admin@mail.com',
    password: 'power@123',
});

const error = ref<string | null>(null);

async function handleSubmit() {
    try {
        error.value = null;
        await login(formData.value);
        router.push('/dashboard');
    } catch (err: any) {
        error.value = err.message || 'Invalid email or password';
    }
}
</script>
