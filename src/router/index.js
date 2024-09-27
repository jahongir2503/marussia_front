import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import CarsInStock from '@/views/CarsInStock.vue';
import AboutUs from "@/views/AboutUs.vue";
import Profile from '@/views/Profile.vue';
import Register from "@/views/Register.vue";
import SelectCar from '@/views/SelectCar.vue';
import ServiceForm from '@/views/ServiceForm.vue';

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/stock', name: 'CarsInStock', component: CarsInStock},
    {path: '/AboutUs', name: 'AboutUs', component: AboutUs},
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/car-select', name: 'CarSelect', component: SelectCar },
    { path: '/service-form', name: 'ServiceForm', component: ServiceForm },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
