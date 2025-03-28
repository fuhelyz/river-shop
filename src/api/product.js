import request from './request'

// 获取所有分类
export const getAllCategories = () => {
    return request.get('/categories')
}

// 获取分类热门商品
export const getCategoryHotProducts = (categoryId) => {
    return request.get(`/categories/${categoryId}/hot-products`)
}

// 获取商品详情
export const getProductDetail = (productId) => {
    return request.get(`/products/${productId}`)
}

// 获取商品列表
export const getProductList = (params) => {
    return request.get('/products', { params })
}

// 搜索商品
export const searchProducts = (keyword) => {
    return request.get('/products/search', { params: { keyword } })
}

// 获取商品评论
export const getProductReviews = (productId, params) => {
    return request.get(`/products/${productId}/reviews`, { params })
}

// 添加商品评论
export const addProductReview = (productId, data) => {
    return request.post(`/products/${productId}/reviews`, data)
}

// 收藏商品
export const favoriteProduct = (productId) => {
    return request.post(`/products/${productId}/favorite`)
}

// 取消收藏商品
export const unfavoriteProduct = (productId) => {
    return request.delete(`/products/${productId}/favorite`)
}

// 获取收藏商品列表
export const getFavoriteProducts = () => {
    return request.get('/favorites')
} 