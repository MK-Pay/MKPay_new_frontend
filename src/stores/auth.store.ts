import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import authService from '@/services/auth.service';
import type { LoginCredentials, RegisterData, User } from '@/types/auth.types';
import { getTokenFromResponse, ifObjectOr } from '@/utils/data-helpers';
import { usePermissionsStore } from './permissions.store';
import { useAccountsStore } from './accounts.store';

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

            const response = ifObjectOr(await authService.login(credentials), {});
            console.log('login response', response);
            accessToken.value = getTokenFromResponse(response, 'token');
            refreshToken.value = getTokenFromResponse(response, 'refresh_token');

            if (accessToken.value) {
                localStorage.setItem('access_token', accessToken.value);
            }

            if (refreshToken.value) {
                localStorage.setItem('refresh_token', refreshToken.value);
            }

            const userData = await authService.me();
            user.value = userData;

            // Carregar permissões e contas após login bem-sucedido
            const permissionsStore = usePermissionsStore();
            const accountsStore = useAccountsStore();

            await Promise.all([permissionsStore.fetchPermissions(), accountsStore.fetchAccounts()]);

            return response;
        } catch (err: any) {
            console.log('err', err);
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

            const response = ifObjectOr(await authService.register(data), {});

            accessToken.value = getTokenFromResponse(response, 'token');
            refreshToken.value = getTokenFromResponse(response, 'refresh_token');

            if (accessToken.value) {
                localStorage.setItem('access_token', accessToken.value);
            }

            if (refreshToken.value) {
                localStorage.setItem('refresh_token', refreshToken.value);
            }

            const userData = await authService.me();
            user.value = userData;

            // Carregar permissões e contas após registro bem-sucedido
            const permissionsStore = usePermissionsStore();
            const accountsStore = useAccountsStore();

            await Promise.all([permissionsStore.fetchPermissions(), accountsStore.fetchAccounts()]);

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

            // Limpar permissões e contas ao deslogar
            const permissionsStore = usePermissionsStore();
            const accountsStore = useAccountsStore();
            permissionsStore.clearPermissions();
            accountsStore.clearSelectedAccount();

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
            const response = ifObjectOr(await authService.refreshToken(refreshToken.value));

            accessToken.value = getTokenFromResponse(response, 'token');
            refreshToken.value = getTokenFromResponse(response, 'refresh_token');

            if (accessToken.value) {
                localStorage.setItem('access_token', accessToken.value);
            }

            if (refreshToken.value) {
                localStorage.setItem('refresh_token', refreshToken.value);
            }

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
