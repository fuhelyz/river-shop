<script setup>
import { onMounted } from 'vue'
import CategoryNav from '../components/layout/CategoryNav.vue'
import Banner from '../components/home/Banner.vue'
import CategoryProducts from '../components/home/CategoryProducts.vue'

// 模拟热门分类数据
const hotCategories = [
  { id: 1, name: '服装配饰' },
  { id: 2, name: '美妆护肤' },
  { id: 5, name: '数码家电' },
  { id: 4, name: '家居日用' }
]

onMounted(() => {
  // 这里可以添加页面加载时的其他逻辑
})
</script>

<template>
  <div class="home-page">
    <CategoryNav />
    
    <main class="main-content">
      <div class="container">
        <Banner />
        
        <div class="category-sections">
          <CategoryProducts
            v-for="category in hotCategories"
            :key="category.id"
            :category-id="category.id"
            :title="category.name"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: var(--background-color);
}

.main-content {
  padding: 20px 0;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

.category-sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style> 