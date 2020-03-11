import store from '../store'
import Router from "vue-router";
import LoginPage from '../views/Login'
import Home from '../views/Home'
import Cadastro from'../views/Cadastro'

export default [


    /* Geral */
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        meta: {
            public: true,
        },
        props: true,
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/usuarios/cadastro',
        meta: {
            public: true,
        },
        props: true,
        name: 'Cadastro',
        component: Cadastro
    },
    {
        path: '/logout',
        meta: { breadcrumb: true },
        name: 'Logout',
        beforeEnter (to, from, next) {
            store.dispatch('auth/logout', false)
        },
    },

];
