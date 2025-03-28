<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, ArrowLeft, Phone } from '@element-plus/icons-vue'
import { login } from '@/api/user'

const store = useStore()
const router = useRouter()
const route = useRoute()

const loginForm = ref({
  account: '',
  password: ''
})

const loading = ref(false)
const showAnimation = ref(false)

// 验证手机号码的正则表达式
const phoneRegex = /^1[3-9]\d{9}$/

// 检查是否为手机号
const isPhoneNumber = (value) => {
  return phoneRegex.test(value)
}

// 自定义验证规则
const validateAccount = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入用户名或手机号'))
  } else if (isPhoneNumber(value)) {
    // 是手机号格式
    callback()
  } else if (value.length >= 3 && value.length <= 20) {
    // 是用户名格式
    callback()
  } else {
    callback(new Error('用户名长度在3-20个字符之间，或输入正确的手机号'))
  }
}

// 表单验证规则
const rules = {
  account: [
    { required: true, validator: validateAccount, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ]
}

// 表单引用
const loginFormRef = ref(null)

onMounted(() => {
  // 添加动画效果
  setTimeout(() => {
    showAnimation.value = true
  }, 50)
})

// 处理返回
const handleBack = () => {
  // 返回前一个页面
  router.back()
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    // 构建登录请求参数
    const loginParams = {
      password: loginForm.value.password
    }
    
    // 判断输入的是手机号还是用户名
    if (isPhoneNumber(loginForm.value.account)) {
      loginParams.phone = loginForm.value.account
    } else {
      loginParams.username = loginForm.value.account
    }
    
    try {
      await store.dispatch('login', loginParams)
      ElMessage.success('登录成功')
      
      // 跳转到之前的页面或首页
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } catch (error) {
      ElMessage.error(error.message || '登录失败，请检查账号和密码')
    }
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    loading.value = false
  }
}

// 处理注册
const handleRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-overlay" :class="{ 'show': showAnimation }">
    <div class="login-modal-backdrop" @click="handleBack"></div>
    
    <div class="login-modal">
      <div class="login-modal-content">
        <div class="login-header">
          <button class="back-button" @click="handleBack">
            <el-icon><ArrowLeft /></el-icon>
          </button>
          <h2>欢迎登录</h2>
          <div class="spacer"></div> <!-- 为了让标题居中 -->
        </div>
        
        <p class="login-desc">请登录您的帐户以继续</p>
        
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          label-position="top"
          class="login-form"
        >
          <el-form-item label="账号" prop="account">
            <el-input 
              v-model="loginForm.account" 
              placeholder="请输入用户名或手机号"
              :prefix-icon="User"
              class="login-input"
            />
          </el-form-item>
          
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              class="login-input"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          
          <el-form-item class="login-btn-item">
            <el-button
              type="primary"
              :loading="loading"
              class="login-button"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
          
          <div class="login-options">
            <el-button link class="register-link" @click="handleRegister">
              还没有账号？立即注册
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.login-overlay.show {
  opacity: 1;
}

.login-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.login-modal {
  position: relative;
  width: 95%;
  max-width: 450px;
  transform: translateY(30px);
  transition: transform 0.3s ease;
}

.login-overlay.show .login-modal {
  transform: translateY(0);
}

.login-modal-content {
  background: rgba(29, 29, 31, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.login-header h2 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.5px;
}

.spacer {
  width: 36px;
}

.login-desc {
  text-align: center;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.login-form :deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 6px;
}

.login-input :deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  box-shadow: none !important;
  padding: 8px 12px;
}

.login-input :deep(.el-input__wrapper.is-focus) {
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: none !important;
}

.login-input :deep(.el-input__inner) {
  color: white;
}

.login-input :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.login-input :deep(.el-input__prefix) {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 8px;
}

.login-button {
  width: 100%;
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 1;
  height: auto;
}

.login-button :deep(.el-button__content) {
  display: block;
  width: 100%;
  text-align: center;
}

.login-button:hover {
  background-color: var(--accent-color-dark);
  border-color: var(--accent-color-dark);
}

/* 移除点击涟漪效果 */
.login-button:active {
  transform: none;
}

.login-button:focus {
  outline: none;
}

.login-button :deep(.el-icon) {
  display: none;
}

.login-btn-item {
  margin-bottom: 5px;
}

.login-options {
  text-align: center;
  margin-top: 15px;
}

.register-link {
  color: var(--accent-color);
  font-size: 14px;
}

.register-link:hover {
  color: var(--accent-color-dark);
  text-decoration: underline;
}
</style> 