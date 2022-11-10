import authenticator from '@/lib/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const account = authenticator.getActiveAccount();

  if (!account && to.name != 'login') return { name: 'login' };
  else if (account && to.name == 'login') {
    return { name: 'home' };
  }
});

export default router;
