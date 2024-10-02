import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import CarsInStock from '@/views/CarsInStock.vue';
import AboutUs from "@/views/AboutUs.vue";
import Profile from '@/views/Profile.vue';
import Register from "@/views/Register.vue";
import SelectCar from '@/views/SelectCar.vue';
import Details from "@/views/Details.vue";
import warranty from "@/views/warranty.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/stock', name: 'CarsInStock', component: CarsInStock },
    { path: '/AboutUs', name: 'AboutUs', component: AboutUs },
    { path: '/warranty', name: 'warranty', component: warranty },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/car-select', name: 'CarSelect', component: SelectCar },
    { path: '/details', name: 'Details', component: Details },
    {
        path: '/buy-car/:id',
        name: 'BuyCarForm',
        component: () => import('@/views/BuyCarForm.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/car/:id',
        name: 'CarDetails',
        component: () => import('@/views/CarDetails.vue'),
    },
    {
        path: '/admin/cars',
        name: 'AdminCars',
        component: () => import('@/views/AdminCars.vue'),
        meta: { requiresAdmin: true },
    },
    {
        path: '/admin/parts',
        name: 'AdminParts',
        component: () => import('@/views/AdminParts.vue'),
        meta: { requiresAdmin: true },
    },
    {
        path: '/admin/requests',
        name: 'AdminRequests',
        component: () => import('@/views/AdminRequests.vue'),
        meta: { requiresAdmin: true },
    },
    {
        path: '/admin/news',
        name: 'AdminNews',
        component: () => import('@/views/AdminNews.vue'),
        meta: { requiresAdmin: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const roleId = localStorage.getItem('role_id');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({ path: '/registration' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (roleId !== '1') {
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next(); // Разрешаем доступ ко всем остальным страницам
    }
});

export default router;
