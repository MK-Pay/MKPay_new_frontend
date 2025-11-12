import { createRouter, createWebHistory } from 'vue-router';
import { authGuard, guestGuard } from './guards';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
            beforeEnter: guestGuard,
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/auth/RegisterView.vue'),
            beforeEnter: guestGuard,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard/DashboardView.vue'),
            beforeEnter: authGuard,
        },
        {
            path: '/apps',
            name: 'apps',
            component: () => import('@/views/apps/AppsView.vue'),
            beforeEnter: authGuard,
        },
        {
            path: '/apps/:id',
            name: 'app-detail',
            component: () => import('@/views/apps/AppDetailView.vue'),
            beforeEnter: authGuard,
            redirect: (to) => ({ name: 'app-overview', params: to.params }),
            children: [
                {
                    path: 'overview',
                    name: 'app-overview',
                    component: () => import('@/views/apps/AppOverviewView.vue'),
                },
                {
                    path: 'tokens',
                    name: 'app-tokens',
                    component: () => import('@/views/apps/AppTokensView.vue'),
                },
                {
                    path: 'vendas',
                    name: 'app-vendas',
                    component: () => import('@/views/apps/AppVendasView.vue'),
                },
                {
                    path: 'configuracoes',
                    name: 'app-configuracoes',
                    component: () => import('@/views/apps/AppConfiguracoesView.vue'),
                },
            ],
        },
        {
            path: '/perfil',
            name: 'perfil',
            component: () => import('@/views/perfil/PerfilView.vue'),
            beforeEnter: authGuard,
        },
        {
            path: '/documentos',
            name: 'documentos',
            component: () => import('@/views/documentos/DocumentosView.vue'),
            beforeEnter: authGuard,
        },
    ],
});

export default router;
