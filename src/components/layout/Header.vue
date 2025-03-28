<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const store = useStore()
const router = useRouter()
const searchQuery = ref('')

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const user = computed(() => store.getters.user)
const cartCount = computed(() => store.getters.cartCount)

const handleSearch = () => {
  // TODO: 实现搜索功能
  console.log('搜索功能待实现')
}

const handleLogin = () => {
  router.push('/login')
}

const handleUserCenter = () => {
  router.push('/user')
}

const handleCart = () => {
  if (!isAuthenticated.value) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  router.push('/cart')
}

const handleFavorites = () => {
  if (!isAuthenticated.value) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  router.push('/favorites')
}

const handleRegister = () => {
  router.push('/register')
}

const handleLogout = async () => {
  await store.dispatch('logout')
  ElMessage.success('已退出登录')
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="container">
        <div class="logo">
          <router-link to="/">River商城</router-link>
        </div>
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索商品"
            class="search-input"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="user-actions">
          <template v-if="isAuthenticated">
            <el-dropdown trigger="click">
              <button class="custom-btn user-btn">
                <i class="nav-icon"><User /></i>
                <span>{{ user?.username }}</span>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleUserCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <button class="custom-btn" @click="handleLogin">
              <i class="nav-icon"><User /></i>
              <span>登录</span>
            </button>
          </template>
          <button class="custom-btn" @click="handleCart">
            <i class="nav-icon"><ShoppingCart /></i>
            <span>购物车</span>
            <el-badge v-if="cartCount > 0" :value="cartCount" class="cart-badge" />
          </button>
          <button class="custom-btn" @click="handleFavorites">
            <i class="nav-icon"><Star /></i>
            <span>收藏夹</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(29, 29, 31, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  padding: 0.8rem 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.logo a:hover {
  color: rgba(255, 255, 255, 0.8);
}

.search-box {
  flex: 1;
  max-width: 600px;
  margin: 0 var(--spacing-xl);
}

.search-input :deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  box-shadow: none !important;
  padding: 0.5rem 1rem;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: none !important;
}

.search-input :deep(.el-input__inner) {
  color: white;
}

.search-input :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

.search-input :deep(.el-input__prefix) {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 0.5rem;
}

.user-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.custom-btn {
  background: transparent;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  height: 36px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  font-size: 18px;
}

.custom-btn span {
  display: inline-block;
  vertical-align: middle;
}

.cart-badge {
  margin-left: 4px;
}

.user-btn {
  background: rgba(255, 255, 255, 0.1);
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

:deep(.el-badge__content) {
  background-color: #ff3b30;
  border: none;
}
</style> 