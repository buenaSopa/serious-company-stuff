<template>
  <main class="w-full h-full p-4">
    <Sidebar />
    <main class="ml-[200px] p-10">
      <RouterView />
    </main>
  </main>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<style scoped>
</style>
