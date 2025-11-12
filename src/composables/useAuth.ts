import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

export function useAuth() {
    const authStore = useAuthStore();
    const { user, isAuthenticated, loading, error } = storeToRefs(authStore);

    const login = authStore.login;
    const register = authStore.register;
    const logout = authStore.logout;
    const loadUser = authStore.loadUser;
    const refresh = authStore.refresh;

    return {
        // State
        user,
        isAuthenticated,
        loading,
        error,
        // Actions
        login,
        register,
        logout,
        loadUser,
        refresh,
    };
}
