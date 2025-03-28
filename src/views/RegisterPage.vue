<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register } from '@/api/user'
import { User, Lock, Message, Phone, ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const loading = ref(false)
const showAnimation = ref(false)

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: ''
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

// 表单引用
const registerFormRef = ref(null)

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

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  try {
    await registerFormRef.value.validate()
    loading.value = true
    
    await register(registerForm.value)
    ElMessage.success('注册成功，请登录')
    
    router.push('/login')
  } catch (error) {
    console.error('注册失败:', error)
  } finally {
    loading.value = false
  }
}

// 返回登录页
const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-overlay" :class="{ 'show': showAnimation }">
    <div class="register-modal-backdrop" @click="handleBack"></div>
    
    <div class="register-modal">
      <div class="register-modal-content">
        <div class="register-header">
          <button class="back-button" @click="handleBack">
            <el-icon><ArrowLeft /></el-icon>
          </button>
          <h2>用户注册</h2>
          <div class="spacer"></div> <!-- 为了让标题居中 -->
        </div>
        
        <p class="register-desc">创建您的账户以开始使用</p>
        
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="rules"
          label-position="top"
          class="register-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="registerForm.username" 
              placeholder="请输入用户名"
              :prefix-icon="User"
              class="register-input"
            />
          </el-form-item>
          
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              class="register-input"
            />
          </el-form-item>
          
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :prefix-icon="Lock"
              show-password
              class="register-input"
            />
          </el-form-item>
          
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱地址"
              :prefix-icon="Message"
              class="register-input"
            />
          </el-form-item>
          
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入手机号码"
              :prefix-icon="Phone"
              class="register-input"
            />
          </el-form-item>
          
          <el-form-item class="register-btn-item">
            <el-button
              type="primary"
              :loading="loading"
              class="register-button"
              @click="handleRegister"
            >
              注册
            </el-button>
          </el-form-item>
          
          <div class="register-options">
            <el-button link class="login-link" @click="goToLogin">
              已有账号？立即登录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-overlay {
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

.register-overlay.show {
  opacity: 1;
}

.register-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.register-modal {
  position: relative;
  width: 95%;
  max-width: 450px;
  transform: translateY(30px);
  transition: transform 0.3s ease;
}

.register-overlay.show .register-modal {
  transform: translateY(0);
}

.register-modal-content {
  background: rgba(29, 29, 31, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 85vh;
  overflow-y: auto;
}

.register-header {
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

.register-header h2 {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.5px;
}

.spacer {
  width: 36px;
}

.register-desc {
  text-align: center;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.register-form :deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 6px;
}

.register-input :deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  box-shadow: none !important;
  padding: 8px 12px;
}

.register-input :deep(.el-input__wrapper.is-focus) {
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: none !important;
}

.register-input :deep(.el-input__inner) {
  color: white;
}

.register-input :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.register-input :deep(.el-input__prefix) {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 8px;
}

.register-button {
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

.register-button :deep(.el-button__content) {
  display: block;
  width: 100%;
  text-align: center;
}

.register-button:hover {
  background-color: var(--accent-color-dark);
  border-color: var(--accent-color-dark);
}

/* 移除点击涟漪效果 */
.register-button:active {
  transform: none;
}

.register-button:focus {
  outline: none;
}

.register-button :deep(.el-icon) {
  display: none;
}

.register-btn-item {
  margin-bottom: 5px;
}

.register-options {
  text-align: center;
  margin-top: 15px;
}

.login-link {
  color: var(--accent-color);
  font-size: 14px;
}

.login-link:hover {
  color: var(--accent-color-dark);
  text-decoration: underline;
}
</style> 