import type { RouteRecordRaw } from 'vue-router'

export const BASE_PATH = '/'

export const Routes = {
  Home: {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  Comp: {
    path: '/comp',
    name: 'comp',
    component: () => import('@/views/CompView.vue'),
    meta: { requiresAuth: true },
  },
  Login: {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
} as const satisfies Record<string, RouteRecordRaw>

export const RedirectMappings: RouteRecordRaw[] = [
  {
    path: BASE_PATH,
    redirect: Routes.Login.path,
  },
] as const
