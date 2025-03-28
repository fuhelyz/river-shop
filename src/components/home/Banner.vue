<script setup>
import { ref, onMounted } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'

// 模拟热门商品数据
const hotProducts = ref([
  {
    id: 1,
    name: '时尚休闲运动鞋',
    image: 'https://via.placeholder.com/1200x400',
    price: 299,
    description: '舒适透气，时尚百搭'
  },
  {
    id: 2,
    name: '智能手表',
    image: 'https://via.placeholder.com/1200x400',
    price: 1999,
    description: '多功能运动监测'
  },
  {
    id: 3,
    name: '无线蓝牙耳机',
    image: 'https://via.placeholder.com/1200x400',
    price: 799,
    description: '高音质，长续航'
  },
  {
    id: 4,
    name: '轻薄笔记本电脑',
    image: 'https://via.placeholder.com/1200x400',
    price: 5499,
    description: '高性能，长续航，轻薄便携'
  },
  {
    id: 5,
    name: '智能家居套装',
    image: 'https://via.placeholder.com/1200x400',
    price: 1299,
    description: '智能连接，打造舒适家居环境'
  }
])

// TODO: 从后端获取热门商品数据
onMounted(async () => {
  // const { data } = await getHotProducts()
  // hotProducts.value = data
})
</script>

<template>
  <div class="banner">
    <el-carousel height="400px" :interval="5000" type="card">
      <el-carousel-item v-for="product in hotProducts" :key="product.id">
        <div class="banner-item">
          <img :src="product.image" :alt="product.name" class="banner-image">
          <div class="banner-content">
            <h2 class="banner-title">{{ product.name }}</h2>
            <p class="banner-description">{{ product.description }}</p>
            <div class="banner-price">
              <span class="price-symbol">¥</span>
              <span class="price-value">{{ product.price }}</span>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.banner {
  margin-bottom: var(--spacing-xl);
}

.banner-item {
  position: relative;
  height: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-xl);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.banner-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.banner-description {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.9;
}

.banner-price {
  display: flex;
  align-items: baseline;
}

.price-symbol {
  font-size: 1.5rem;
  margin-right: 4px;
  color: white;
}

.price-value {
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
}

:deep(.el-carousel__item) {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

:deep(.el-carousel__item--card) {
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

:deep(.el-carousel__item--card.is-active) {
  transform: scale(1);
}
</style> 