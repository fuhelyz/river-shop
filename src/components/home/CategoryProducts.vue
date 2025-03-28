<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  categoryId: {
    type: [Number, String],
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const router = useRouter()

// 模拟分类热门商品数据
const products = ref([
  {
    id: 1,
    name: '商品名称1',
    image: 'https://via.placeholder.com/300x300',
    price: 299,
    description: '商品描述1'
  },
  {
    id: 2,
    name: '商品名称2',
    image: 'https://via.placeholder.com/300x300',
    price: 399,
    description: '商品描述2'
  },
  {
    id: 3,
    name: '商品名称3',
    image: 'https://via.placeholder.com/300x300',
    price: 499,
    description: '商品描述3'
  },
  {
    id: 4,
    name: '商品名称4',
    image: 'https://via.placeholder.com/300x300',
    price: 599,
    description: '商品描述4'
  }
])

// TODO: 从后端获取分类热门商品数据
onMounted(async () => {
  // const { data } = await getCategoryHotProducts(props.categoryId)
  // products.value = data
})

const handleProductClick = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<template>
  <section class="category-products">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <router-link :to="`/category/${categoryId}`" class="view-all">
        查看全部
        <el-icon><ArrowRight /></el-icon>
      </router-link>
    </div>
    
    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="handleProductClick(product.id)"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-price">
            <span class="price-symbol">¥</span>
            <span class="price-value">{{ product.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-products {
  margin-bottom: var(--spacing-xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.view-all {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--accent-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color var(--transition-speed) ease;
}

.view-all:hover {
  color: var(--accent-color-dark);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.product-card {
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-image {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-speed) ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: var(--spacing-md);
}

.product-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
}

.product-description {
  font-size: 0.9rem;
  color: var(--text-color-light);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: baseline;
}

.price-symbol {
  font-size: 1rem;
  color: #333333;
  margin-right: 2px;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
}
</style> 