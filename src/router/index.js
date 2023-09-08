import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout-default',
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
      path: '/admin',
      name: 'layout-admin',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('@/views/admin/index.vue')
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/users.vue')
        },
        {
          path: 'notes',
          name: 'admin-notes',
          component: () => import('@/views/admin/notes.vue')
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: () => import('@/views/admin/articles.vue')
        }
      ]
    }
  ]
})

router.beforeResolve((to, from) => {
  const { userLoggedIn } = useUserStore();

  if(!userLoggedIn && to?.matched[0].name === 'layout-admin') {
    return { name: 'home' };
  }
})

export default router
