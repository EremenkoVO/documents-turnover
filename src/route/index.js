import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from './authGuard';
import App from '@/App';
import Login from '@/components/Auth/Login';
import Registration from '@/components/Auth/Registration';
import MainTable from '@/components/Table/MainTable';
import Request from '@/components/Table/Request';
import Profile from '@/components/Profile/Profile';

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
            path: '/requests',
            name: 'MainTable',
            component: MainTable,
            beforeEnter: AuthGuard
        },
        {
            path: '/request/:id',
            props: true,
            name: 'Request',
            component: Request,
            beforeEnter: AuthGuard
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: AuthGuard
        }
        
    ],
    mode: 'history'
});