<template>
    <div class="min-h-screen bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

                <Card title="Welcome to MKPay">
                    <p class="text-gray-600">
                        You are successfully logged in!
                    </p>
                    <div class="mt-4">
                        <button
                            @click="handleLogout"
                            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Card from '@/components/shared/Card.vue'

const router = useRouter()
const { logout } = useAuth()

async function handleLogout() {
    await logout()
    router.push('/login')
}
</script>
