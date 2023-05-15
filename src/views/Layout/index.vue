<script setup>
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
