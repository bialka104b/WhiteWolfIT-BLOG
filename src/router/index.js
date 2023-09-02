import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default-layout',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard-layout',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard/index.vue')
        }
      ]
    }
  ]
})

router.beforeResolve((to, from) => {
  const { userLoggedIn } = useUserStore();

  if(!userLoggedIn && to?.matched[0].name === 'dashboard-layout') {
    return { name: 'home' };
  }
})

export default router
