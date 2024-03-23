import { createRouter, createWebHashHistory } from "vue-router";
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/hello'
        },
        {
            path: '/hello',
            component: () => import('../components/Hello.vue')
        },
        {
            path: '/add',
            component: () => import('../components/Add.vue')
        },
        {
            path: '/update',
            component: () => import('../components/Update.vue')
        }
    ]
})