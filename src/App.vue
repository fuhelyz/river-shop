<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background-color: var(--background-color);
}

.main-content {
  padding-top: 72px; /* 导航栏高度，确保内容不被覆盖 */
  min-height: calc(100vh - 72px);
}
</style>
