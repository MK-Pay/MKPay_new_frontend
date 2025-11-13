import { defineStore } from 'pinia';
import { ref } from 'vue';
import appsService from '@/services/apps.service';
import type { App, AppStats, CreateAppDTO, UpdateAppDTO } from '@/types/app.types';

export const useAppsStore = defineStore('apps', () => {
    // State
    const apps = ref<App[]>([]);
    const currentApp = ref<App | null>(null);
    const currentAppStats = ref<AppStats | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Actions
    async function fetchApps() {
        try {
            loading.value = true;
            error.value = null;

            apps.value = await appsService.getApps();
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch apps';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function fetchApp(id: string) {
        try {
            loading.value = true;
            error.value = null;

            currentApp.value = await appsService.getApp(id);
            return currentApp.value;
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch app';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function createApp(data: CreateAppDTO) {
        try {
            loading.value = true;
            error.value = null;

            const newApp = await appsService.createApp(data);
            apps.value.unshift(newApp);
            return newApp;
        } catch (err: any) {
            error.value = err.message || 'Failed to create app';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function updateApp(id: string, data: UpdateAppDTO) {
        try {
            loading.value = true;
            error.value = null;

            const updatedApp = await appsService.updateApp(id, data);
            const index = apps.value.findIndex((app) => app.id === id);
            if (index !== -1) {
                apps.value[index] = updatedApp;
            }
            if (currentApp.value?.id === id) {
                currentApp.value = updatedApp;
            }
            return updatedApp;
        } catch (err: any) {
            error.value = err.message || 'Failed to update app';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function deleteApp(id: string) {
        try {
            loading.value = true;
            error.value = null;

            await appsService.deleteApp(id);
            apps.value = apps.value.filter((app) => app.id !== id);
            if (currentApp.value?.id === id) {
                currentApp.value = null;
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to delete app';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function fetchAppStats(id: string) {
        try {
            loading.value = true;
            error.value = null;

            currentAppStats.value = await appsService.getAppStats(id);
            return currentAppStats.value;
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch app stats';
            throw err;
        } finally {
            loading.value = false;
        }
    }

    function clearCurrentApp() {
        currentApp.value = null;
        currentAppStats.value = null;
    }

    return {
        // State
        apps,
        currentApp,
        currentAppStats,
        loading,
        error,
        // Actions
        fetchApps,
        fetchApp,
        createApp,
        updateApp,
        deleteApp,
        fetchAppStats,
        clearCurrentApp,
    };
});
