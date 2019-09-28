import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from './authGuard';
import App from '@/App';
import Login from '@/components/Auth/Login';
import Registration from '@/components/Auth/Registration';
import MainTable from '@/components/Table/MainTable';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'app',
            component: App
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/main',
            name: 'MainTable',
            component: MainTable,
            beforeEnter: AuthGuard
        }
        
    ],
    mode: 'history'
});