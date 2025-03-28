/**
 * 环境配置工具
 */

// 获取环境变量
export const getEnvValue = (key) => {
    return import.meta.env[key]
}

// 是否为开发环境
export const isDev = () => {
    return import.meta.env.DEV
}

// 是否为生产环境
export const isProd = () => {
    return import.meta.env.PROD
}

// 是否为测试环境
export const isTest = () => {
    return getEnvValue('VITE_APP_ENV') === 'test'
}

// 是否开启调试
export const isDebug = () => {
    return getEnvValue('VITE_APP_DEBUG') === 'true'
}

// 是否开启Mock
export const isMock = () => {
    return getEnvValue('VITE_APP_MOCK') === 'true'
}

// 获取API基础URL
export const getApiBaseUrl = () => {
    return getEnvValue('VITE_API_BASE_URL')
}

// 获取上传URL
export const getUploadUrl = () => {
    return getEnvValue('VITE_UPLOAD_URL')
}

// 获取CDN URL
export const getCdnUrl = () => {
    return getEnvValue('VITE_CDN_URL')
}

// 获取应用标题
export const getAppTitle = () => {
    return getEnvValue('VITE_APP_TITLE')
}

// 获取完整CDN URL
export const getFullCdnUrl = (path) => {
    const cdnUrl = getCdnUrl()
    return path ? `${cdnUrl}/${path}` : cdnUrl
}

// 获取完整上传URL
export const getFullUploadUrl = (path) => {
    const uploadUrl = getUploadUrl()
    return path ? `${uploadUrl}/${path}` : uploadUrl
}

// 获取完整API URL
export const getFullApiUrl = (path) => {
    const apiUrl = getApiBaseUrl()
    return path ? `${apiUrl}/${path}` : apiUrl
} 