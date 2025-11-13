<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navbar -->
        <Navbar />

        <!-- Container with Sidebar and Content -->
        <div class="flex">
            <!-- Sidebar -->
            <Sidebar />

            <!-- Main Content -->
            <main class="flex-1 w-full lg:ml-0">
                <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
</script>
