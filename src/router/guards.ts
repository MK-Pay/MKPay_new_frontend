import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const token = localStorage.getItem('access_token')

    if (!token) {
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
}

export function guestGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const token = localStorage.getItem('access_token')

    if (token) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
}
