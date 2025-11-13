import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import authService from '@/services/auth.service';
import type { LoginCredentials, RegisterData, User } from '@/types/auth.types';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<User | null>(null);
    const accessToken = ref<string | null>(localStorage.getItem('access_token'));
    const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'));
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const isAuthenticated = computed(() => !!accessToken.value);
    const currentUser = computed(() => user.value);

    // Actions
    async function login(credentials: LoginCredentials) {
        try {
            loading.value = true;
            error.value = null;

            const response = await authService.login(credentials);
            accessToken.value = response?.token;
            refreshToken.value = response?.refresh_token;

            localStorage.setItem('access_token', response?.token || null);
            localStorage.setItem('refresh_token', response?.refresh_token || null);

            const userData = await authService.me();
            user.value = userData;

            return response;
        } catch (err: any) {
            error.value = err.message || 'Login failed';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function register(data: RegisterData) {
        try {
            loading.value = true;
            error.value = null;

            const response = await authService.register(data);

            accessToken.value = response?.token;
            refreshToken.value = response?.refresh_token;

            localStorage.setItem('access_token', response?.token);
            localStorage.setItem('refresh_token', response?.refresh_token);

            const userData = await authService.me();
            user.value = userData;

            return response;
        } catch (err: any) {
            error.value = err.message || 'Registration failed';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        try {
            loading.value = true;
            await authService.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            user.value = null;
            accessToken.value = null;
            refreshToken.value = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            loading.value = false;
        }
    }

    async function loadUser() {
        if (!accessToken.value) return;

        try {
            loading.value = true;
            error.value = null;

            const userData = await authService.me();
            user.value = userData;
        } catch (err: any) {
            error.value = err.message || 'Failed to load user';
            // If loading user fails, clear tokens
            await logout();
        } finally {
            loading.value = false;
        }
    }

    async function refresh() {
        if (!refreshToken.value) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await authService.refreshToken(refreshToken.value);

            accessToken.value = response?.token;
            refreshToken.value = response?.refresh_token;

            localStorage.setItem('access_token', response?.token);
            localStorage.setItem('refresh_token', response?.refresh_token);

            const userData = await authService.me();
            user.value = userData;

            return response;
        } catch (err) {
            await logout();
            throw err;
        }
    }

    return {
        // State
        user,
        accessToken,
        refreshToken,
        loading,
        error,
        // Getters
        isAuthenticated,
        currentUser,
        // Actions
        login,
        register,
        logout,
        loadUser,
        refresh,
    };
});
