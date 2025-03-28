import axios from 'axios'

const API_URL = '/api'

// 获取购物车列表
export const getCartList = () => {
    return axios.get(`${API_URL}/cart`)
}

// 添加商品到购物车
export const addToCart = (data) => {
    return axios.post(`${API_URL}/cart`, data)
}

// 更新购物车商品数量
export const updateCartItem = (id, data) => {
    return axios.put(`${API_URL}/cart/${id}`, data)
}

// 删除购物车商品
export const removeFromCart = (id) => {
    return axios.delete(`${API_URL}/cart/${id}`)
}

// 清空购物车
export const clearCart = () => {
    return axios.delete(`${API_URL}/cart`)
}

// 选择购物车商品
export const selectCartItems = (itemIds) => {
    return request.put('/cart/select', { itemIds })
}

// 取消选择购物车商品
export const unselectCartItems = (itemIds) => {
    return request.put('/cart/unselect', { itemIds })
}

// 获取购物车商品总数
export const getCartCount = () => {
    return request.get('/cart/count')
} 