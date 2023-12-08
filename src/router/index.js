import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import UserForm from '../components/UserForm.vue';
import LoginForm from '../components/LoginForm.vue';

const routes = [
    { path: '/login', component: LoginForm, name: 'login' },
    { path: '/home', component: HomePage, name: 'home' },
    { path: '/users/create', component: UserForm },
    { path: '/users/:id/edit', component: UserForm, props: true },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;
