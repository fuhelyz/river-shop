<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在</p>
      <div class="actions">
        <el-button @click="goBack">返回上一页</el-button>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  width: 100%;
}

.content {
  text-align: center;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

h1 {
  font-size: 120px;
  color: #24292e;
  margin: 0;
  line-height: 1;
  font-weight: 700;
  opacity: 0.9;
}

h2 {
  font-size: 28px;
  color: #24292e;
  margin: 20px 0;
  font-weight: 600;
}

p {
  color: #586069;
  margin-bottom: 40px;
  font-size: 16px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.actions :deep(.el-button) {
  padding: 12px 24px;
  font-size: 16px;
}

.actions :deep(.el-button--default) {
  color: #586069;
  border-color: #e0e0e0;
}

.actions :deep(.el-button--primary) {
  background-color: #24292e;
  border-color: #24292e;
}

.actions :deep(.el-button--primary:hover) {
  background-color: #333333;
  border-color: #333333;
}
</style> 