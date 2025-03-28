<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 从商城分类设计.md中获取的分类数据
const categories = ref([
  {
    id: 1,
    name: '服装配饰',
    subCategories: [
      { id: 11, name: '男装' },
      { id: 12, name: '女装' },
      { id: 13, name: '童装' }
    ]
  },
  {
    id: 2,
    name: '美妆护肤',
    subCategories: [
      { id: 21, name: '化妆品' },
      { id: 22, name: '护肤品' }
    ]
  },
  {
    id: 3,
    name: '食品饮料',
    subCategories: [
      { id: 31, name: '休闲食品' },
      { id: 32, name: '饮品' }
    ]
  },
  {
    id: 4,
    name: '家居日用',
    subCategories: [
      { id: 41, name: '家具' },
      { id: 42, name: '厨具' },
      { id: 43, name: '清洁用品' }
    ]
  },
  {
    id: 5,
    name: '数码家电',
    subCategories: [
      { id: 51, name: '电子产品' },
      { id: 52, name: '大家电' },
      { id: 53, name: '小家电' }
    ]
  },
  {
    id: 6,
    name: '运动户外',
    subCategories: [
      { id: 61, name: '运动装备' },
      { id: 62, name: '户外用品' }
    ]
  }
])

const activeCategory = ref(null)

const handleCategoryClick = (category) => {
  router.push(`/category/${category.id}`)
}

const handleSubCategoryClick = (category, subCategory) => {
  router.push(`/category/${category.id}/${subCategory.id}`)
}
</script>

<template>
  <nav class="category-nav">
    <div class="container">
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          @mouseenter="activeCategory = category"
          @mouseleave="activeCategory = null"
        >
          <div class="category-link" @click="handleCategoryClick(category)">
            {{ category.name }}
          </div>
          <div
            v-show="activeCategory?.id === category.id"
            class="sub-categories"
          >
            <div
              v-for="subCategory in category.subCategories"
              :key="subCategory.id"
              class="sub-category-item"
              @click="handleSubCategoryClick(category, subCategory)"
            >
              {{ subCategory.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.category-nav {
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.category-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.category-item {
  position: relative;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.category-item:hover {
  background-color: var(--hover-color);
}

.category-link {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
}

.sub-categories {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 100;
}

.sub-category-item {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  color: var(--text-color);
  transition: all var(--transition-speed) ease;
}

.sub-category-item:hover {
  background-color: var(--hover-color);
  color: var(--accent-color);
}
</style> 