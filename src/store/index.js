import { createStore } from 'vuex'
import { login, getUserInfo } from '../api/user'
import { getCartList } from '../api/cart'

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem('token') || '',
        cartCount: 0,
        categories: [],
        loading: false
    },

    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_TOKEN(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        CLEAR_USER(state) {
            state.user = null
            state.token = ''
            localStorage.removeItem('token')
        },
        SET_CART_COUNT(state, count) {
            state.cartCount = count
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        }
    },

    actions: {
        // 登录
        async login({ commit }, credentials) {
            try {
                const { data } = await login(credentials)
                commit('SET_TOKEN', data.token)
                return data
            } catch (error) {
                throw new Error(error.response?.data?.message || '登录失败')
            }
        },

        // 登出
        logout({ commit }) {
            commit('CLEAR_USER')
        },

        // 获取用户信息
        async getUserInfo({ commit }) {
            try {
                const { data } = await getUserInfo()
                commit('SET_USER', data)
                return data
            } catch (error) {
                commit('CLEAR_USER')
                throw new Error(error.response?.data?.message || '获取用户信息失败')
            }
        },

        // 更新购物车数量
        async getCartCount({ commit }) {
            try {
                const { data } = await getCartList()
                commit('SET_CART_COUNT', data.length)
                return data.length
            } catch (error) {
                console.error('获取购物车数量失败:', error)
                return 0
            }
        }
    },

    getters: {
        isAuthenticated: state => !!state.token,
        user: state => state.user,
        cartCount: state => state.cartCount,
        categories: state => state.categories,
        loading: state => state.loading
    }
}) 