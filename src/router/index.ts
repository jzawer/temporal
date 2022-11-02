import msalInstance from '@/lib/auth';
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
  await msalInstance.handleRedirectPromise();
  const accounts = msalInstance.getAllAccounts();

  if (accounts.length <= 0 && to.name != 'login') return { name: 'login' };
  else if (accounts.length > 0 && to.name == 'login') {
    return { name: 'home' };
  }
});

export default router;
