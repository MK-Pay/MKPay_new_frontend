<template>
    <Card title="Create Account" subtitle="Sign up to get started with MKPay">
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {{ error }}
            </div>

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                />
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
                <label for="company_name" class="block text-sm font-medium text-gray-700 mb-1">
                    Company Name (Optional)
                </label>
                <input
                    id="company_name"
                    v-model="formData.company_name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
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

            <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    id="password_confirmation"
                    v-model="formData.password_confirmation"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <LoadingSpinner v-if="loading" size="sm" color="white" />
                <span v-else>Create Account</span>
            </button>

            <div class="text-center text-sm text-gray-600">
                Already have an account?
                <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium">Sign in</router-link>
            </div>
        </form>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Card from '@/components/shared/Card.vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import type { RegisterData } from '@/types/auth.types';

const router = useRouter();
const { register, loading } = useAuth();

const formData = ref<RegisterData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company_name: '',
});

const error = ref<string | null>(null);

async function handleSubmit() {
    try {
        error.value = null;

        if (formData.value.password !== formData.value.password_confirmation) {
            error.value = 'Passwords do not match';
            return;
        }

        await register(formData.value);
        router.push('/dashboard');
    } catch (err: any) {
        error.value = err.message || 'Registration failed';
    }
}
</script>
