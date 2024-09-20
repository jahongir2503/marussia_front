import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'; // Подключаем нашу главную страницу

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Можешь добавить другие страницы, когда они будут готовы
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
