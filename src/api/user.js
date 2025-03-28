import axios from 'axios'

const API_URL = '/api'

// 用户登录
export const login = (data) => {
    return axios.post(`${API_URL}/user/login`, data)
}

// 用户注册
export const register = (data) => {
    return axios.post(`${API_URL}/user/register`, data)
}

// 获取用户信息
export const getUserInfo = () => {
    return axios.get(`${API_URL}/user/info`)
}

// 更新用户信息
export const updateUserInfo = (data) => {
    return axios.put(`${API_URL}/user/info`, data)
}

// 修改密码
export const changePassword = (data) => {
    return axios.put(`${API_URL}/user/password`, data)
}

// 获取用户订单列表
export const getUserOrders = (params) => {
    return axios.get(`${API_URL}/user/orders`, { params })
}

// 获取订单详情
export const getOrderDetail = (orderId) => {
    return axios.get(`${API_URL}/user/orders/${orderId}`)
}

// 取消订单
export const cancelOrder = (orderId) => {
    return axios.put(`${API_URL}/user/orders/${orderId}/cancel`)
}

// 确认收货
export const confirmOrder = (orderId) => {
    return axios.put(`${API_URL}/user/orders/${orderId}/confirm`)
} 