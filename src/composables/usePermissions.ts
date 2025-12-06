import { usePermissionsStore } from '@/stores/permissions.store';
import { storeToRefs } from 'pinia';

export function usePermissions() {
    const permissionsStore = usePermissionsStore();
    const { permissions, roles, loading, error } = storeToRefs(permissionsStore);

    const hasPermission = (permission: string): boolean => {
        return permissionsStore.hasPermission(permission);
    };

    const hasAnyPermission = (permissionsList: string[]): boolean => {
        return permissionsStore.hasAnyPermission(permissionsList);
    };

    const hasAllPermissions = (permissionsList: string[]): boolean => {
        return permissionsStore.hasAllPermissions(permissionsList);
    };

    const hasRole = (role: string): boolean => {
        return permissionsStore.hasRole(role);
    };

    const fetchPermissions = permissionsStore.fetchPermissions;
    const setPermissions = permissionsStore.setPermissions;
    const setRoles = permissionsStore.setRoles;
    const clearPermissions = permissionsStore.clearPermissions;

    return {
        // State
        permissions,
        roles,
        loading,
        error,
        // Methods
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        hasRole,
        fetchPermissions,
        setPermissions,
        setRoles,
        clearPermissions,
    };
}
