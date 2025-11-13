import { useAppsStore } from '@/stores/apps.store';
import { storeToRefs } from 'pinia';

export function useApps() {
    const appsStore = useAppsStore();
    const { apps, currentApp, currentAppStats, loading, error } = storeToRefs(appsStore);

    const fetchApps = appsStore.fetchApps;
    const fetchApp = appsStore.fetchApp;
    const createApp = appsStore.createApp;
    const updateApp = appsStore.updateApp;
    const deleteApp = appsStore.deleteApp;
    const fetchAppStats = appsStore.fetchAppStats;
    const clearCurrentApp = appsStore.clearCurrentApp;

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
}
