import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import permissionsService from '@/services/permissions.service';

export const usePermissionsStore = defineStore('permissions', () => {
    // State
    const permissions = ref<string[]>([]);
    const roles = ref<string[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const hasPermission = computed(() => {
        return (permission: string): boolean => {
            return permissions.value.includes(permission);
        };
    });

    const hasAnyPermission = computed(() => {
        return (permissionsList: string[]): boolean => {
            return permissionsList.some((permission) => permissions.value.includes(permission));
        };
    });

    const hasAllPermissions = computed(() => {
        return (permissionsList: string[]): boolean => {
            return permissionsList.every((permission) => permissions.value.includes(permission));
        };
    });

    const hasRole = computed(() => {
        return (role: string): boolean => {
            return roles.value.includes(role);
        };
    });

    // Actions
    async function fetchPermissions() {
        try {
            loading.value = true;
            error.value = null;

            const response = await permissionsService.getPermissions();
            permissions.value = response.permissions || [];
            roles.value = response.roles || [];
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch permissions';
            // Fallback para permissões mockadas em caso de erro
            loadMockedPermissions();
            console.error('Error fetching permissions, using mocked data:', err);
        } finally {
            loading.value = false;
        }
    }

    function loadMockedPermissions() {
        // Permissões mockadas para desenvolvimento
        permissions.value = [
            'apps.view',
            'apps.create',
            'apps.update',
            'apps.delete',
            'dashboard.view',
            'profile.view',
            'profile.update',
        ];

        roles.value = ['admin', 'user'];
    }

    function setPermissions(newPermissions: string[]) {
        permissions.value = newPermissions;
    }

    function setRoles(newRoles: string[]) {
        roles.value = newRoles;
    }

    function clearPermissions() {
        permissions.value = [];
        roles.value = [];
    }

    return {
        // State
        permissions,
        roles,
        loading,
        error,
        // Getters
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        hasRole,
        // Actions
        fetchPermissions,
        loadMockedPermissions,
        setPermissions,
        setRoles,
        clearPermissions,
    };
});
