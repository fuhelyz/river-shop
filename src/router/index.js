import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomePage.vue')
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: () => import('@/views/CategoryPage.vue')
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetail.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/CartPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/UserPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginPage.vue'),
        meta: { overlay: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/RegisterPage.vue'),
        meta: { overlay: true }
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('@/views/FavoritesPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
})

export default router 